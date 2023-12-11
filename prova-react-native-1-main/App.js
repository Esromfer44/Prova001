// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ItemLeilaoStack from './src/navigation/ItemLeilaoStack';
import ParticipantesLeilaoStack from './src/navigation/ParticipantesLeilaoStack';
import LancesLeilaoStack from './src/navigation/LancesLeilaoStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {createTabScreen('Itens', 'view-headline', ItemLeilaoStack)}
        {createTabScreen('Participantes', 'account', ParticipantesLeilaoStack)}
        {createTabScreen('Lances', 'currency-usd', LancesLeilaoStack)}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const createTabScreen = (label, iconName, component) => {
  return (
    <Tab.Screen
      name={label}
      component={component}
      options={{
        tabBarLabel: label,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name={iconName} color={color} size={size} />
        ),
      }}
    />
  );
};
