import { View, Text, SafeAreaView, Alert, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import API_URL from '../config/Api';
import auth from '@react-native-firebase/auth';

const BookTicket = ({ route }) => {
    const { pnr } = route.params;
    const navigation = useNavigation();

    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    // Get user ID from Firebase Auth
    useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            setUserId(user.uid);
        }
    }, []);

    // Fetch booking data from temp bookings
    const fetchBookingData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/booking/temp-booking/${pnr}`);
            if (!response.ok) {
                throw new Error('Failed to fetch booking data');
            }
            const data = await response.json();
            setBookingData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (pnr) {
            fetchBookingData();
        }
    }, [pnr]);

    // Automatically run handleBooking when bookingData is fetched
    useEffect(() => {
        if (bookingData && userId) {
            handleBooking();
        }
    }, [bookingData, userId]);

    const handleBooking = async () => {
        if (!userId) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        const bookingPayload = {
            ...bookingData,
            user: userId,
        };

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingPayload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Booking failed');
            }

            const data = await response.json();
            setSuccess(true);
            navigation.navigate('Ticket', { pnr: data.pnr });
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchBookingData();
        setRefreshing(false);
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../assets/loading.json')}
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
                    source={require('../assets/success.json')}
                    autoPlay
                    loop={false}
                    style={{ width: 100, height: 100 }}
                />
            </View>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1 }} className="px-2 pt-3 bg-white">
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 70 }}
                    className="mx-2 mt-3"
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View className="rounded border border-gray-200 p-2 mb-3">
                        <Text>Error: {error}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }} className="px-2 pt-3 bg-white">
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 70 }}
                className="mx-2 mt-3"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View className="rounded border border-gray-200 p-2 mb-3">
                    <Text>No booking data available.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BookTicket;
