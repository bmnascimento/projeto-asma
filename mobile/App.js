import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { StyleProvider } from 'native-base';

import MainScreen from './src/MainScreen'
import JournalScreen from './src/JournalScreen'
import InfoScreen from './src/InfoScreen'
import LoginScreen from './src/LoginScreen'
import AuthContext from './src/AuthContext'

const Tab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function boot() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });

      try {
        const jsonValue = await AsyncStorage.getItem('usuarioLogado');
        setUser(JSON.parse(jsonValue));
      } catch (e) {
        console.log('erro ao ler o async storage')
      }
      setIsReady(true);
    }
    boot();
  }, []);

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

                // You can return any component that you like here!
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
                <Tab.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
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
