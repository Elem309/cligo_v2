import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import API_URL from '../config/Api';
import { useNavigation } from '@react-navigation/native';

const RegisterUser = ({ route }) => {
    const navigation = useNavigation()
  const { userId } = route.params;
  console.log(userId);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false)

  const handleRegister = async () => {
    try {
        setLoading(true)
      const response = await fetch(`${API_URL}/users`, { // Adjust the endpoint as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          email: email,
          phone: userId.phoneNumber,
          userId: userId.uid,
        }),
      });

      if (!response.ok) {
        console.log(response)
        // throw new Error('Failed to register user');
      }

      const data = await response.json();
      console.log('User registered successfully:', data);
      navigation.navigate('SearchStack',{screen:"Home"})
      // Optionally, navigate to another screen or show a success message
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., show an alert to the user)
    }finally{
        setLoading(false)
    }
  };

  return (
    <SafeAreaView className="px-4 mt-4 bg-white flex-row justify-center h-full">
      <View className="my-auto">
        <Text className="text-2xl font-bold py-4">Register to get started</Text>
        <TextInput 
          placeholder='Eg: John' 
          className="p-2 rounded bg-gray-100 mb-4" 
          onChangeText={text => setName(text)} 
        />
        <TextInput 
          placeholder='Eg: John@email.com' 
          className="p-2 bg-gray-100 rounded mb-4" 
          onChangeText={text => setEmail(text)} 
        />
        <TouchableOpacity className="p-3 bg-blue-500 rounded" onPress={handleRegister} disabled={loading}>
            {loading?<ActivityIndicator size={"large"} color={"#ffffff"}/>:<Text className="text-white">Register</Text> }
          
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
