import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import MarketScreen from '../screens/MarketScreen';
import OffersScreen from '../screens/OffersScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Market':
              iconName = 'storefront';
              break;
            case 'Offers':
              iconName = 'pricetag';
              break;
            case 'ShoppingList':
              iconName = 'list';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }

          return <Ionicons name={iconName} size={size} color={focused ? '#6200EE' : color} />;
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60 },
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: false // Hide header for all tabs
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Início' }} />
      <Tab.Screen name="Market" component={MarketScreen} options={{ tabBarLabel: 'Mercados' }} />
      <Tab.Screen name="Offers" component={OffersScreen} options={{ tabBarLabel: 'Ofertas' }} />
      <Tab.Screen name="ShoppingList" component={ShoppingListScreen} options={{ tabBarLabel: 'Lista' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Meu Perfil' }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
