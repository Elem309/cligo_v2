import { View, Text } from 'react-native';
import React from 'react';
import base64 from 'react-native-base64';
import * as WebBrowser from 'expo-web-browser';

const payment = async (phone, amount, bookingId, userId) => {
    const url = 'https://cligo.co.in/payment';
    const payload = {
        "merchantId": "M22EIWO3B0641",
        "name": bookingId,
        "phone": phone,
        "amount": amount,
        "merchantTransactionId": bookingId,
        "merchantUserId": userId,
    };

    const string = JSON.stringify(payload);
    const encodedString = base64.encode(string);
    const paymentUrl = `${url}/?payload=${encodedString}`;

    try {
        // Open the URL in an in-app browser
        await WebBrowser.openBrowserAsync(paymentUrl);
    } catch (error) {
        console.error('Error opening payment link:', error);
    }
};

export default payment;
