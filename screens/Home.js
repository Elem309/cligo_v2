import { Text, View, Separator } from 'tamagui';
import { Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import Offers from '../components/Offers';
import { onAuthStateChanged } from '@react-native-firebase/auth';
import API_URL from '../config/Api';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth(), async (user) => {
      if (user) {
        setUserId(user.uid);
        await checkUserExists(user);
      } else {
        // User is not signed in
        setUserId(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const checkUserExists = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users/${userData.uid}`);
      if (response.ok) {
        console.log('User exists');
      } else {
        console.log('User does not exist');
        // Navigate to RegisterUser if user does not exist
        navigation.navigate('ProfileStack', {
          screen: 'RegisterUser',
          params: {
            userId: userData, // Pass the userId here
          },
        });
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} className="bg-white">
      <View style={styles.header}>
        <Image source={require('../assets/logoGray.png')} className="w-20 h-20" />
        {/* <Text style={styles.title}>Cligo</Text> */}
      </View>
      <Separator marginVertical={5} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <Search />
        <Offers />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100, // Adjust this value to the height of your tab bar
  },
});

export default Home;
