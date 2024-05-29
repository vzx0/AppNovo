import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrincipalTela from './screens/PrincipalTela';
import { useFonts } from 'expo-font';
import BoasVindasTela from './screens/BoasVindasTela';

const Stack = createStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    'Satoshi': require('./assets/fonts/Satoshi-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null; // Ou algum componente de loading enquanto as fontes estão carregando
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BemVindo">
        <Stack.Screen name="BemVindo" component={BoasVindasTela} options={{ headerShown: false }} />
        <Stack.Screen name="Principal" component={PrincipalTela}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
