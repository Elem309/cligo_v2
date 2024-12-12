import { ChevronRight, Car } from '@tamagui/lucide-icons';
import { ListItem, Separator, YGroup, View, Text } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Alert, RefreshControl } from 'react-native';
import LottieView from 'lottie-react-native'; // Import LottieView
import API_URL from '../config/Api';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Bookings = () => {
    const navigation = useNavigation();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false); // State for refreshing

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const user = auth().currentUser; // Get the current user
        if (!user) {
            Alert.alert('Error', 'No user is logged in.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/booking/bookings/${user.uid}`); // Use the user's UID
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            // Sort bookings by bookingDate, latest first
            const sortedBookings = data.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
            setBookings(sortedBookings); // Update state with sorted bookings
        } catch (err) {
            setError(err.message);
            Alert.alert('Error', err.message);
        } finally {
            setLoading(false);
            setRefreshing(false); // Stop refreshing
        }
    };
    console.log(bookings)
    const onRefresh = () => {
        setRefreshing(true);
        fetchBookings(); // Fetch bookings on refresh
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

    return (
        <SafeAreaView style={{ flex: 1 }} className='mx-4 mb-3'>
            <View className='pt-10'>
                <Text style={{ fontSize: 24 }} className="font-bold">My Bookings</Text>
            </View>
            <Separator marginVertical={5} />
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} // Call onRefresh when swiped down
                    />
                }
            >
                {bookings.length === 0 ? ( // Check if there are no bookings
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No bookings found.</Text>
                    </View>
                ) : (
                    <YGroup separator={<Separator />}>
                        {bookings.map((booking, index) => (
                            <YGroup.Item key={index}>
                                <ListItem
                                    hoverTheme
                                    pressTheme
                                    title={`${booking.source.toUpperCase()} to ${booking.destination.toUpperCase()}`} // Adjust these fields based on your API response
                                    subTitle={new Date(booking.bookingDate).toLocaleDateString()} // Adjust this as necessary
                                    icon={Car}
                                    iconAfter={ChevronRight}
                                    onPress={() => {
                                        navigation.navigate('BookingStack', {
                                            screen: 'Ticket',
                                            params: { pnr: booking.pnr } // Wrap bookingData.pnr in an object
                                        });
                                    }}
                                />
                            </YGroup.Item>
                        ))}
                    </YGroup>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Bookings;
