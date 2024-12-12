import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, View } from 'react-native'
import { ChevronRight, Car } from '@tamagui/lucide-icons'
import { ListItem, Separator, YGroup } from 'tamagui'
import axios from 'axios'
import API_URL from '../config/Api'
import LottieView from 'lottie-react-native';

const Trips = ({route}) => {
  const{source, destination,date} = route.params
  const navigation = useNavigation()
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true) // Initialize loading state
  const [refreshing, setRefreshing] = useState(false) // Initialize refreshing state

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${new Date(date).toLocaleDateString()} | ${source.toUpperCase()} to ${destination.toUpperCase()}`
    })
  }, [navigation])

  // Fetch trips data
  const fetchTrips = async () => {
    setLoading(true) // Start loading
    console.log(date)
    console.log(new Date(date))
    try {
      const response = await axios.post(`${API_URL}/trip/searchTrips`, {
        "destination": destination,
        "source": source,
        "date": new Date(date)
      })

      setTrips(response.data)  // Assuming the response is an array of trips
    } catch (error) {
      console.error('Error fetching trips:', error.message || error)
    } finally {
      setLoading(false) // Set loading to false after fetch
    }
  }

  useEffect(() => {
    fetchTrips() // Fetch trips when component mounts
  }, [])

  const onRefresh = async () => {
    setRefreshing(true) // Set refreshing to true
    await fetchTrips() // Fetch trips data
    setRefreshing(false) // Set refreshing to false after fetch
  }

  if (loading) {
    // Display loading indicator while fetching data
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
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }} className='mx-3 my-3'>
      <ScrollView 
        style={{ flex: 1 }} 
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={['#0000ff']} // Change color of the spinner
          />
        }
      >
        <YGroup separator={<Separator />} gap='$1.5'>
          {trips.map((trip, index) => (
            <YGroup.Item key={index}>
              <TouchableOpacity>
                <ListItem
                  hoverTheme
                  pressTheme
                  title={`${trip.type.toUpperCase()} | ${trip.availableSeats} Available | ₹ ${trip.price} `}
                  subTitle={` at ${trip.time}`}
                  icon={Car}
                  iconAfter={ChevronRight}
                  onPress={() => navigation.navigate('TripView', { trip })}
                />
              </TouchableOpacity>
            </YGroup.Item>
          ))}
        </YGroup>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Trips
