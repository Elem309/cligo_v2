import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Search from './Search'
import Trips from '../screens/Trips'
import Home from '../screens/Home'
import TripView from '../screens/TripView'
import ConfirmBooking from '../screens/ConfirmBooking'
import TicketView from '../screens/TicketView'
import TicketView2 from '../screens/TicketView2'

const SerachStack = ({userId}) => {

    const stack = createNativeStackNavigator()

  return (

        <stack.Navigator>
            <stack.Screen component={(props) => <Home {...props} userId={userId} />} options={{headerShown:false}} name='Home'/>
            <stack.Screen component={Trips}  name='Trips'/>
            <stack.Screen component={TripView} name='TripView'/>
            <stack.Screen component={ConfirmBooking} name='Confirm'/>
            <stack.Screen component={TicketView} name='Ticket'/>
            
        </stack.Navigator>

  )
}

export default SerachStack