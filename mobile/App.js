import * as React from 'react';
import { AppLoading, Notifications } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { StyleProvider } from 'native-base';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import MainScreen from './src/MainScreen'
import JournalScreen from './src/JournalScreen'
import InfoScreen from './src/InfoScreen'
import LoginScreen from './src/LoginScreen'
import AuthContext from './src/AuthContext'

import patientService from './src/services/patients'

const Tab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [expoPushToken, setExpoPushToken] = React.useState('');

  React.useEffect(() => {
    boot();
  }, []);

  async function boot() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    try {
      const jsonValue = await AsyncStorage.getItem('usuarioLogado');
      setUser(JSON.parse(jsonValue));

      // Notificação
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = await Notifications.getExpoPushTokenAsync();
        console.log('Token notificaçao');
        console.log(token);
        const expoPushTokenASAD = await patientService.update(JSON.parse(jsonValue).id, { expoPushToken: token });
        console.log(expoPushTokenASAD);
        setExpoPushToken(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
          name: 'default',
          sound: true,
          priority: 'max',
          vibrate: [0, 250, 250, 250],
        });
      }
    } catch (e) {
      console.log('erro ao ler o async storage')
    }

    setIsReady(true);
  }

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <StyleProvider style={getTheme(material)}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={'Main'}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Main') {
                  iconName = 'ios-walk'
                } else if (route.name === 'Journal') {
                  iconName = 'ios-medkit'
                } else if (route.name === 'Info') {
                  iconName = 'ios-football'
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'green',
              inactiveTintColor: 'gray',
            }}
          >
            {user === null ?
              <>
                <Tab.Screen name="Login" component={LoginScreen} options={{ title: 'Login', tabBarVisible: false }} />
              </>
              :
              <>
                <Tab.Screen name="Main" component={MainScreen} options={{ title: 'Atividade' }} />
                <Tab.Screen name="Journal" component={JournalScreen} options={{ title: 'Sintomas' }} />
                <Tab.Screen name="Info" component={InfoScreen} options={{ title: 'Informações' }} />
              </>
            }
          </Tab.Navigator>
        </NavigationContainer>
      </StyleProvider>
    </AuthContext.Provider>
  );
}
