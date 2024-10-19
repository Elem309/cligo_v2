import { StatusBar } from 'expo-status-bar';
import { config } from '@tamagui/config/v3';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import Home from './screens/Home';
import Bookings from './screens/Bookings';
import Notifications from './screens/Notifications';
import Profile from './screens/Profile';
import Support from './screens/Support';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet , TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import * as Animatable from 'react-native-animatable';
import SerachStack from './components/SerachStack';
const tamaguiConfig = createTamagui(config);


const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
 
  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: .5, rotate: '0deg' }, 1: { scale: 1.5, rotate: '360deg' } });
    } else {
      viewRef.current.animate({ 0: { scale: 1.5, rotate: '360deg' }, 1: { scale: 1, rotate: '0deg' } });
    }
  }, [focused])
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { top: 0 }]}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
      >
        <MaterialIcons 
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? "#fcc00e" : "#000000"} size={20}/>
      </Animatable.View>
    </TouchableOpacity>
  )
}



export default function App() {
  
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }
  
  const TabArr = [
    { route: 'SearchStack', label: 'Home', type: MaterialIcons, activeIcon: 'home', inActiveIcon: 'home', component: SerachStack },
    { route: 'Bookings', label: 'Bookings', type: MaterialIcons, activeIcon: 'list', inActiveIcon: 'list', component: Bookings },
    { route: 'Profile', label: 'Profile', type: MaterialIcons, activeIcon: 'person', inActiveIcon: 'person-outline', component: Profile },
  ];

  const Tab = createBottomTabNavigator()
 

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#f0f0f0",
            height: 60,
            position: 'absolute',
            marginHorizontal: 16,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: "#f0f0f0"
          }
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })}

      </Tab.Navigator>
      </NavigationContainer>      
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  }
})