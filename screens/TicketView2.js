import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, Linking, BackHandler } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle, ArrowRight, PhoneCall, Ban } from '@tamagui/lucide-icons';
import { Button, Separator } from 'tamagui';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import API_URL from '../config/Api'; // Adjust this to your API config
import LottieView from 'lottie-react-native'; 




const TicketView2 = ({ route }) => {
    const {pnr} = route.params
    const navigation = useNavigation();
    const [source , setSource] = React.useState('')
    const [destination , setDestination] = React.useState('')
    const [tripData, setTripData] = React.useState(null);
    const [bookingData, setBookingData] = React.useState(null);
    const [loadingLocations, setLoadingLocations] = React.useState(true);
    const [loadingBooking, setLoadingBooking] = React.useState(true);
    const [loadingTrip, setLoadingTrip] = React.useState(true);
    // React.useEffect(() => {
    //     const backHandler = BackHandler.addEventListener(
    //       'hardwareBackPress',
    //       () =>{
    //         navigation.navigate('Bookings')
    //       }
    //     );
    
    //     return () => backHandler.remove(); // Clean up the event listener
    //   }, []);
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, [navigation]);

    // Fetch locations
    React.useEffect(() => {
        const fetchLocations = async () => {
            if(tripData){
                try {
                    const response = await axios.get(`${API_URL}/table/location`);
                    response.data.forEach(item=>{
                        if(item.short === tripData.tripData.source.toUpperCase()){
                            setSource(item.title)
                        }
                        if(item.short === tripData.tripData.destination.toUpperCase()){
                            setDestination(item.title)
                        }
                    })
                } catch (error) {
                    console.error('Error fetching locations:', error);
                } finally {
                    setLoadingLocations(false);
                }
            }
           
        };

        fetchLocations();
    }, [tripData]);

    // Fetch booking
    React.useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`${API_URL}/booking/booking/${pnr}`);
                setBookingData(response.data);
            } catch (error) {
                console.error('Error fetching booking:', error);
            } finally {
                setLoadingBooking(false);
            }
        };

        fetchBooking();
    }, []);

    // Fetch trip data after booking data is available
    React.useEffect(() => {
        const fetchTripData = async () => {
            if (bookingData) {
                try {
                    const response = await axios.get(`${API_URL}/trip/${bookingData.tripId}`);
                    console.log('Trip Data:', response.data); // Log the response
                    setTripData(response.data);
                } catch (error) {
                    console.error('Error fetching trip:', error);
                } finally {
                    setLoadingTrip(false);
                }
            }
        };

        fetchTripData();
    }, [bookingData]);

    // Check if all data is loaded
    if (loadingLocations || loadingBooking || loadingTrip) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Lottie animation */}
        <LottieView
          source={require('../assets/loading2.json')} // Adjust the path to your loading animation
          autoPlay
          loop
          style={{ width: 100, height: 100 }} // Adjust size as needed
        />
      </SafeAreaView>
        );
    }

    if (!bookingData) {
        return (
            <SafeAreaView style={{ flex: 1 }} className="justify-center items-center">
                <Text>No booking found</Text>
            </SafeAreaView>
        );
    }

    if (!tripData) {
        return (
            <SafeAreaView style={{ flex: 1 }} className="justify-center items-center">
                <Text>No trip data found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }} className="px-2 pt-3 ">
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 70 }} className="mx-2 mt-3 " showsVerticalScrollIndicator={false}>
                <View className="bg-white p-2 rounded">
                    <View className="flex-row justify-start">
                        <CheckCircle size={30} color={"green"} />
                        <View>
                            <Text className="font-bold text-green-700 ml-3">Booking Confirmed</Text>
                            <Text className="text-gray-500 ml-3">{bookingData.pnr}</Text>
                        </View>
                    </View>
                </View>
                <View className="bg-white p-2 rounded flex-row justify-between mt-2">
                    <View>
                        <Text className="text-lg font-bold">{source}</Text>
                        <Text>{tripData.tripData.source.toUpperCase()}</Text>
                        <Text className="mt-2 text-gray-500">{tripData.tripData.date}</Text>
                        <Text className="text-gray-500">{tripData.tripData.time}</Text>
                        <Text className="text-gray-500">Vehicle: {tripData.tripData.type.toUpperCase()}</Text>
                    </View>
                    <View className="my-auto">
                        <ArrowRight size={30} color={"gray"} />
                    </View>
                    <View>
                        <Text className="text-lg font-bold text-right">{destination}</Text>
                        <Text className="text-right">{tripData.tripData.destination.toUpperCase()}</Text>
                        <Text className="mt-2 text-gray-500 text-right font-bold">Reg No:</Text>
                        <Text className="text-gray-500 text-right">{tripData.tripData.reg}</Text>
                    </View>
                </View>
                <View className="bg-white p-2 rounded mt-2">
                    <View className="flex-row justify-between">
                        <Text className="font-bold">Passengers</Text>
                        <Text className="font-bold text-right">Seat No</Text>
                    </View>
                    <Separator marginVertical={15} />
                    {bookingData.passengers.map((passenger, index) => (
                        <View key={index} className="mb-1 flex-row justify-between">
                            <Text>{passenger.name}</Text>
                            <Text className="text-right">{passenger.seat}</Text>
                        </View>
                    ))}
                    <Separator marginVertical={15} />
                    <View className="flex-row justify-between mb-3">
                        <QRCode
                            value={bookingData.pnr}
                            size={150}
                            color='black'
                            backgroundColor='white'
                        />
                        <View className="my-auto">
                            <Text className="font-bold text-gray-500">Total Amount Paid</Text>
                            <Text className="text-xl font-bold">₹ {bookingData.price} /-</Text>
                            <Text>Incl of GST</Text>
                        </View>
                    </View>
                    <Button iconAfter={PhoneCall} className='mb-1' onPress={()=>Linking.openURL(`tel:91${tripData.tripData.driverPhone}`)}>
                        Call Driver
                    </Button>
                    <View className="my-3">
                        <Text className="text-gray-500 mt-4">Refund Policies</Text>
                        <Text className="text-gray-500">1. Refund requests must be submitted within 30 days of purchase.</Text>
                        <Text className="text-gray-500">2. Products must be in their original condition and packaging to qualify for a refund.</Text>
                        <Text className="text-gray-500">3. Shipping fees are non-refundable.</Text>
                        <Text className="text-gray-500">4. Digital products are not eligible for refunds after purchase.</Text>
                        <Text className="text-gray-500">5. Please allow 7-10 business days for processing refunds.</Text>
                    </View>

                    <Button iconAfter={Ban} className='mb-1'>
                        Cancel
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TicketView2;
