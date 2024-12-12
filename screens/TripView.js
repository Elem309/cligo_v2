import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Input, XStack } from 'tamagui'
import { MaterialIcons } from '@expo/vector-icons/build/Icons'
import Seat from '../components/Seat'
import { ArrowRight } from '@tamagui/lucide-icons'
import SeatType from '../components/SeatType'



const TripView = ({route}) => {
    const { trip } = route.params;
    const navigation = useNavigation()
    const [selectedSeat, setSelectedSeat] = React.useState([]);
    const [bookedSeats, setBookedSeats] = React.useState([])
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: trip.reg,
        })
    })
   React.useEffect(() => {
        const initiallySelected = trip.seats
            .map((status, index) => (status === 'booked' ? index + 1 : null))
            .filter(Boolean);
        setBookedSeats(initiallySelected);
    }, [trip.seats]);
    

  return (
    <SafeAreaView style={{ flex: 1 }} className="px-2 pt-3 bg-white">
        <ScrollView style={{flex:1}} className="mx-2 mt-3 " contentContainerStyle={{paddingBottom:70}}>
            <View className="border border-gray-200 p-2 rounded-md">
            <XStack className="flex-row justify-between">
                <Text className="text-lg font-bold">{trip.source.toUpperCase()}</Text>
                <View className="my-auto">
                    <MaterialIcons name='arrow-right-alt' size={30} color={"#000000"} />
                </View>
                <Text className="text-lg font-bold">{trip.destination.toUpperCase()}</Text>
            </XStack>
                <Text className="my-2 font-bold">Dept Time: {trip.time}</Text>
                <Text className="font-bold text-gray-500">Vehicle: {trip.type.toUpperCase()}</Text>
                
            </View>
            <SeatSelector selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} type={trip.type} bookedSeats={bookedSeats} trip={trip}/>
            
        </ScrollView>
    </SafeAreaView>
  )
}

function SeatSelector({ selectedSeat, setSelectedSeat,type,bookedSeats,trip }) {
    const navigation = useNavigation()
    const [passengers, setPassengers] = React.useState([]);
    const [errors, setErrors] = React.useState({})
    console.log(selectedSeat)
    const handleSeatSelect = (id) => {
        
        setSelectedSeat(prevSeats => {
            if (prevSeats.includes(id)) {
                // If the seat is already selected, deselect it
                return prevSeats.filter(item => item !== id);
            } else {
                // If the seat is not selected, select it
                return [...prevSeats, id];
            }
           
        });
        
    };

    const handleInputChange = (index, field, value) => {
        // Create a new passenger object for the current seat if it doesn't exist
        const updatedPassengers = [...passengers];
        if (!updatedPassengers[index]) {
          updatedPassengers[index] = { seatNo: selectedSeat[index], name: '', age: '', phone: '' };
        }
        updatedPassengers[index][field] = value; // Update the specific field for the passenger
        setPassengers(updatedPassengers);
        console.log(passengers)
      };


      const validateInputs = () => {
        const newErrors = {};
        passengers.forEach((passenger, index) => {
          if (!passenger.name) {
            newErrors[`name-${index}`] = 'Name is required';
          }
          if (!passenger.age) {
            newErrors[`age-${index}`] = 'Age is required';
          }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
      };
    
      const handleSubmit = () => {
        if (validateInputs()) {
          // Proceed with form submission or next steps
          navigation.navigate('Confirm',{tripData:trip,passengers:passengers})
        } else {
          Alert.alert('Please fill in all required fields.');
        }
      };

    return (
        <>        
        <SeatType selectedSeat={selectedSeat} handleSeatSelect={handleSeatSelect} type={type} bookedSeats={bookedSeats}/>
        {selectedSeat.map((id, index) => (
        <View key={id} className="border border-gray-200 p-2 rounded-md mb-3">
          <Text className="mb-1">Passenger for Seat {id}</Text>
          <Input
            placeholder='Name'
            className='mb-1'
            value={passengers[index]?.name || ''}
            onChangeText={(value) => handleInputChange(index, 'name', value)}
          />
          <Input
            placeholder='Age'
            className='mb-1'
            value={passengers[index]?.age || ''}
            onChangeText={(value) => handleInputChange(index, 'age', value)}
            keyboardType='numeric'
          />
          <Input
            placeholder='Phone'
            className='mb-1'
            value={passengers[index]?.phone || ''}
            onChangeText={(value) => handleInputChange(index, 'phone', value)}
            keyboardType='numeric'
          />
        </View>
      ))}
            {selectedSeat.length > 0 ? <Button iconAfter={ArrowRight} size="$3" backgroundColor={"#ffcc00"} onPress={handleSubmit}>Next
            </Button> : <Text className=" text-gray-400">Please select seats</Text>}
            
          
        </>

    );
}
export default TripView