import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainScreen from './src/MainScreen'
import JournalScreen from './src/JournalScreen'
import InfoScreen from './src/InfoScreen'

const Tab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    async function boot() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setIsReady(true);
    }
    boot();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
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
        <Tab.Screen name="Main" component={MainScreen} options={{ title: 'Atividade' }} />
        <Tab.Screen name="Journal" component={JournalScreen} options={{ title: 'Sintomas' }} />
        <Tab.Screen name="Info" component={InfoScreen} options={{ title: 'Informações' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}