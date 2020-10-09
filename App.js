import React from 'react';
import { StatusBar } from 'react-native';
import { LanguageContextProvider } from './src/contexts/LanguageContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/views/Login';
import Search from './src/views/Search';
import Artist from './src/views/Artist';
import Album from './src/views/Album';

const Stack = createStackNavigator();
const App = () => {
  return (
    <LanguageContextProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer initialRouteName="Login">
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Artist" component={Artist} />
          <Stack.Screen name="Album" component={Album} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageContextProvider>
  );
};

export default App;
