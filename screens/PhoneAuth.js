import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, TextInput, StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { OtpInput } from "react-native-otp-entry";

export default PhoneAuth = ({ setUserInfo, setIsAuthenticated }) => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [phone, setPhone] = useState();

  function onAuthStateChanged(user) {
    if (user) {
      setUserInfo(user);
      setIsAuthenticated(true);
      console.log(user);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function signInWithPhoneNumber(phoneNumber) {
    setSendCodeLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setSendCodeLoading(false);
    }
  }



  async function confirmCode() {
    try {
      setVerifyLoading(true);
      const userCredential = await confirm.confirm(code);
      const userId = userCredential.user.uid; // Get the user ID

      // Check if the user exists
      // await checkUserExists(userId);
    } catch (error) {
      console.log(error.message);
      alert('Invalid Code.');
    } finally {
      setVerifyLoading(false);
    }
  }

  if (!confirm) {
    return (
      <SafeAreaView className="flex-1 justify-center h-100 mx-4 bg-white">
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/icon.png')}
            resizeMode="contain"
            style={{ width: '80%', height: undefined, aspectRatio: 1 }}
          />
        </View>
        <Text className="text-2xl font-bold">Welcome</Text>
        <Text className="text-gray-600 mb-10">Verify Phone Number to continue</Text>
        <TextInput
          placeholder='Enter 10 Digit Phone Number'
          className="p-2 border rounded-lg border-gray-400"
          keyboardType='numeric'
          onChangeText={text => setPhone(text)}
        />
        <TouchableOpacity
          className="mt-4 flex-row justify-center bg-blue-700 p-2 rounded"
          disabled={sendCodeLoading}
          onPress={() => signInWithPhoneNumber(`+91${phone}`)}
        >
          {sendCodeLoading ? <ActivityIndicator size={"small"} color={"#ffffff"} /> : <Text className="text-white">Get OTP</Text>}
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-row justify-center h-full">
      <View style={styles.container} className="my-auto">
        <View className="flex-row justify-center mb-6">
          <Image
            source={require('../assets/SMS.png')}
            resizeMode="contain"
            style={{ width: '80%', height: undefined, aspectRatio: 1 }}
          />
        </View>
        <Text className="text-center text-gray-400 mb-10">A OTP has been sent to +91{phone}</Text>
        <OtpInput
          numberOfDigits={6}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onTextChange={(text) => setCode(text)}
          onFilled={(text) => {  console.log(`OTP is ${text}`); }}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />
        <View className="flex-row justify-center space-x-2 my-5">
          <Text className="text-gray-400">Didn't receive code?</Text>
          <TouchableOpacity onPress={() => signInWithPhoneNumber(`+91${phone}`)}>
            <Text className="text-blue-400">Resend</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="mt-4 flex-row justify-center bg-blue-700 p-2 rounded-lg" disabled={verifyLoading} onPress={confirmCode}>
          {verifyLoading ? <ActivityIndicator size={"small"} color={"#ffffff"} /> : <Text className="text-white">Confirm</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  pinCodeContainer: {
    width: 40,
    height: 40,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1
  },
  pinCodeText: {
    color: "#000000",
    fontSize: 15
  },
  focusStick: {
    height: 14,
    width: 1
  },
  activePinCodeContainer: {
    borderColor: "#ffcc0e",
  },
});
