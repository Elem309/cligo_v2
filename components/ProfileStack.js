import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import RegisterUser from '../screens/RegisterUser';

const Stack = createNativeStackNavigator();

const ProfileStack = ({ setUserInfo, setIsAuthenticated }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="MyAccount" 
        component={Profile} 
        initialParams={{ setUserInfo, setIsAuthenticated }} // Pass params here
      />
      <Stack.Screen name="RegisterUser" component={RegisterUser} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
