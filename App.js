import { StatusBar } from 'expo-status-bar';
import { config } from '@tamagui/config/v3';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState, useRef } from 'react';
import * as Animatable from 'react-native-animatable';
import SerachStack from './components/SerachStack';
import PhoneAuth from './screens/PhoneAuth';
import auth from '@react-native-firebase/auth';
import ProfileStack from './components/ProfileStack';
import LottieView from 'lottie-react-native';
import API_URL from './config/Api';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import BookingsStack from './components/BookingsStack';

const tamaguiConfig = createTamagui(config);

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0.5, rotate: '0deg' }, 1: { scale: 1.5, rotate: '360deg' } });
    } else {
      viewRef.current.animate({ 0: { scale: 1.5, rotate: '360deg' }, 1: { scale: 1, rotate: '0deg' } });
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={[styles.container, { top: 0 }]}>
      <Animatable.View ref={viewRef} duration={1000}>
        <MaterialIcons
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? "#fcc00e" : "#000000"} size={20} />
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = async (user) => {
    if (user) {
      setIsAuthenticated(true);
      setUserInfo(user);
      setLoading(false);
    } else {
      console.log('No user');
      setUserInfo(null);
      setLoading(false);
    }
  };

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded || loading) {
    return (
      <View style={styles.loaderContainer}>
        <LottieView
          source={require('./assets/loading2.json')}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  const linking = {
    prefixes: ['com.cligollp.cligo://'],
    config: {
      screens: {
        SearchStack: {
          screens: {
            Home: 'home',
            Trips: 'trips',
            TripView: 'trip/:id', // Assuming :id is a parameter
            Confirm: 'confirm',
            Ticket: 'ticket',
          },
        },
        BookingStack: {
          screens: {
            Bookings: 'bookings',
            BookTicket: 'bookticket',
            Ticket: 'ticket2',
          },
        },
        ProfileStack: {
          screens: {
            MyAccount: 'profile',
            RegisterUser: 'register',
          },
        },
      },
    },
  };

  const TabArr = [
    { route: 'SearchStack', label: 'Home', component: (props) => <SerachStack {...props} userId={userInfo} />, type: MaterialIcons, activeIcon: 'home', inActiveIcon: 'home'},
    { route: 'BookingStack', label: 'Bookings', component: BookingsStack, type: MaterialIcons, activeIcon: 'list', inActiveIcon: 'list' },
    {
      route: 'ProfileStack',
      label: 'Profile',
      component: (props) => (
        <ProfileStack
          {...props}
          setUserInfo={setUserInfo}
          setIsAuthenticated={setIsAuthenticated}
        />
      ),
      type: MaterialIcons,
      activeIcon: 'person',
      inActiveIcon: 'person-outline',
    },
  ];

  const Tab = createBottomTabNavigator();

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <NavigationContainer linking={linking}>
        {isAuthenticated ? (
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
              }
            }}
          >
            {TabArr.map((item, index) => (
              <Tab.Screen
                key={index}
                name={item.route}
                component={item.component}
                options={{
                  tabBarShowLabel: false,
                  tabBarButton: (props) => <TabButton {...props} item={item} />
                }}
              />
            ))}
          </Tab.Navigator>
        ) : (
          <PhoneAuth setUserInfo={setUserInfo} setIsAuthenticated={setIsAuthenticated} />
        )}
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
