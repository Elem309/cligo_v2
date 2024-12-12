import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Separator, Button } from 'tamagui';
import { PhoneCall, LogOut } from '@tamagui/lucide-icons';
import axios from 'axios'; // Make sure to install axios
import API_URL from '../config/Api';

const Profile = ({ route }) => {
  const { setUserInfo, setIsAuthenticated } = route.params;
  const [userDetails, setUserDetails] = useState({});
  const [supportPhone, setSupportPhone] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth().currentUser; // Get the current user
      if (user) {
        try {
          const response = await axios.get(`${API_URL}/users/${user.uid}`); // Fetch user details
          setUserDetails(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    const fetchCustomerSupport = async () => {
      try {
        const response = await axios.get(`${API_URL}/support`); // Fetch customer support details
        setSupportPhone(response.data.phone); // Assume the response contains a 'phone' field
      } catch (error) {
        console.error('Error fetching customer support:', error);
      }
    };

    fetchUserDetails();
    fetchCustomerSupport();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      setUserInfo(null); // Clear user info
      setIsAuthenticated(false); // Update authentication state
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SafeAreaView className="pt-5 px-4 bg-white h-full">
      <View className="pt-4 pb-2">
        <Text className="text-lg font-bold">My Details</Text>
      </View>
      <Separator marginVertical={5} />
      <View className="flex-row justify-start space-x-4 py-4">
        <Text>Name</Text>
        <View className="w-full">
          <Text>{userDetails.fullName || 'N/A'}</Text>
          <Separator marginVertical={5} />
        </View>
      </View>
      <View className="flex-row justify-start space-x-4 py-4">
        <Text>Email</Text>
        <View className="w-full">
          <Text>{userDetails.email || 'N/A'}</Text>
          <Separator marginVertical={5} />
        </View>
      </View>
      <View className="flex-row justify-start space-x-4 py-4">
        <Text>Phone</Text>
        <View className="w-full">
          <Text>{userDetails.phone || 'N/A'}</Text>
          <Separator marginVertical={5} />
        </View>
      </View>
      <Button iconAfter={PhoneCall} className='mb-1' onPress={() => Linking.openURL(`tel:91${supportPhone}`)}>
        Customer Support
      </Button>
      <Button title="Logout" onPress={handleLogout} icon={LogOut}>Logout</Button>
    </SafeAreaView>
  );
};

export default Profile;
