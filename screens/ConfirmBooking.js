import { View, Text, SafeAreaView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView, Separator, Button } from 'tamagui';
import { ArrowRight } from '@tamagui/lucide-icons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import API_URL from '../config/Api';
import auth from '@react-native-firebase/auth';
import payment from '../components/payment';

const ConfirmBooking = ({ route }) => {
    const { tripData, passengers } = route.params;
    const navigation = useNavigation();
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [pnr, setPnr] = useState(null);
    const [userId, setUserId] = useState(null);
    const [totalPrice, setTotalPrice] = useState()
    const [phone,setPhone] = useState()

    // Get user ID from Firebase Auth
    useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            setUserId(user.uid);
            setPhone(user.phoneNumber)
        }
    }, []);

    useEffect(()=>{
        if(tripData && passengers){
            setTotalPrice(tripData.price * passengers.length + 25)
        }
    },[tripData])


    


    const handleBooking = async () => {
        if (!userId) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        const bookingPayload = {
            destination: tripData.destination,
            source:tripData.source,
            tripId: tripData.tripId,
            bookingDate: new Date(),
            status: "confirmed",
            passengers: passengers,
            price: totalPrice,
            user: userId, // Include user ID
        };
        console.log(bookingPayload)

        setLoading(true);
        try {

            const response = await fetch(`${API_URL}/booking/temp-booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingPayload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
                throw new Error(errorData.message || 'Booking failed');
                
            }

            const data = await response.json();
            setPnr(data.pnr); // Assume the PNR is returned in the response
            setSuccess(true);
            const paymentStatus = await payment(phone,totalPrice,data.pnr,userId)
            console.log(paymentStatus.status)
        } catch (error) {
            console.log('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../assets/loading.json')} // Path to your loading animation
                    autoPlay
                    loop
                    style={{ width: 100, height: 100 }}
                />
            </View>
        );
    }

    if (success) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../assets/success.json')} // Path to your success animation
                    autoPlay
                    loop={false}
                    onAnimationFinish={() => navigation.navigate('Ticket', { pnr })}
                    style={{ width: 100, height: 100 }}
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }} className="px-2 pt-3 bg-white">
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 70 }} className="mx-2 mt-3 ">
                <View className="rounded border border-gray-200 p-2 mb-3">
                    <Text className="font-bold text-lg">Summary</Text>
                    <Separator marginVertical={15} />
                    <View className="flex-row justify-between">
                        <Text className="font-bold text-gray-400">Boarding</Text>
                        <Text className="font-bold ">{tripData.source.toUpperCase()}</Text>
                    </View>
                    <View className="flex-row justify-between mt-1">
                        <Text className="font-bold text-gray-400">Destination</Text>
                        <Text className="font-bold ">{tripData.destination.toUpperCase()}</Text>
                    </View>
                    <View className="flex-row justify-between mt-1">
                        <Text className="font-bold text-gray-400">Date</Text>
                        <Text className="font-bold ">{tripData.date}</Text>
                    </View>
                    <View className="flex-row justify-between mt-1">
                        <Text className="font-bold text-gray-400">Time</Text>
                        <Text className="font-bold ">{tripData.time}</Text>
                    </View>
                    
                    <Separator marginVertical={15} />
                    <View className="flex-row justify-between">
                        <Text className="font-bold text-gray-400">Passengers</Text>
                        <Text className="font-bold text-gray-400">Seat No</Text>
                        <Text className="font-bold text-gray-400">Amount</Text>
                    </View>
                    {passengers.map((item, index) => (
                        <View key={index} className="flex-row justify-between mt-1">
                            <Text>{item.name}</Text>
                            <Text className="text-center">{item.seatNo}</Text>
                            <Text>₹ {tripData.price}</Text>
                        </View>
                    ))}
                    
                    <Separator marginVertical={15} />
                    <View className="flex-row justify-between">
                        <Text className="font-bold text-gray-400">Other</Text>
                        <Text className="font-bold text-gray-400">Amount</Text>
                    </View>
                    <View className="flex-row justify-between mt-1">
                        <Text>Service Charge</Text>
                        <Text>₹ 25</Text>
                    </View>
                    <Separator marginVertical={15} />
                    <View className="flex-row justify-between">
                        <Text className="font-bold">Total</Text>
                        <Text className="font-bold">₹ {tripData.price * passengers.length + 25}</Text>
                    </View>
                </View>
                <Button iconAfter={ArrowRight} size="$3" backgroundColor={"#f2f2f2"} onPress={handleBooking}>
                    Pay Now
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ConfirmBooking;
