import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Bookings from '../screens/Bookings'
import TicketView2 from '../screens/TicketView2'
import BookTicket from '../screens/BookTicket'

const BookingsStack = () => {
    const stack = createNativeStackNavigator()
  return (
    <stack.Navigator screenOptions={{headerShown:false}}>
            <stack.Screen name='Bookings' component={Bookings}/>
            <stack.Screen name='BookTicket' component={BookTicket}/>
            <stack.Screen name='Ticket' component={TicketView2}/>
        </stack.Navigator>
  )
}

export default BookingsStack