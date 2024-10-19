import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Input, XStack } from 'tamagui'
import { MaterialIcons } from '@expo/vector-icons/build/Icons'
import Seat from '../components/Seat'
import { ArrowRight } from '@tamagui/lucide-icons'

const TripView = () => {

    const navigation = useNavigation()

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"NL02AA1234",
        })
    })

  return (
    <SafeAreaView style={{ flex: 1 }} className="px-2 pt-3 bg-white">
        <ScrollView style={{flex:1}} className="mx-2 mt-3 " contentContainerStyle={{paddingBottom:70}}>
            <View className="border border-gray-200 p-2 rounded-md">
            <XStack className="flex-row justify-between">
                <Text className="text-lg font-bold">Dimapur</Text>
                <View className="my-auto">
                    <MaterialIcons name='arrow-right-alt' size={30} color={"#000000"} />
                </View>
                <Text className="text-lg font-bold">Kohima</Text>
            </XStack>
                <Text className="my-2 font-bold">Dept Time: 10:30 AM</Text>
                <Text className="font-bold text-gray-500">Boarding: Chumukedima</Text>
                
            </View>
            <SeatSelector/>
            
        </ScrollView>
    </SafeAreaView>
  )
}

function SeatSelector() {
    const navigation = useNavigation()
    const [selectedSeat, setSelectedSeat] = React.useState([]);
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

    return (
        <>        
        <View className="border border-gray-200 p-2 rounded-md mt-3 flex-row flex-wrap justify-center space-x-2 mb-3">
            <View>
                <Seat key={1} id={1} isSelected={selectedSeat.includes(1)} onSelect={handleSeatSelect} />
            </View>
            <View>
                <Seat key={2} id={2} isSelected={selectedSeat.includes(2)} onSelect={handleSeatSelect} />
            </View>
            <View>
                <Seat key={3} id={3} isSelected={selectedSeat.includes(3)} onSelect={handleSeatSelect} />
            </View>
        </View>
        {selectedSeat.map(id => (
                <View key={id} className="border border-gray-200 p-2 rounded-md mb-3">
                    <Text className="mb-1">Passenger for Seat {id}</Text>
                    <Input placeholder='Name' className='mb-1' />
                    <Input placeholder='Age' className='mb-1' />
                    <Input placeholder='Phone' className='mb-1' />
                </View>
            ))}
            {selectedSeat.length > 0 ? <Button iconAfter={ArrowRight} size="$3" backgroundColor={"#ffcc00"} onPress={()=> navigation.navigate('Confirm')}>Next
            </Button> : <Text className="text-center text-gray-400">Please select seats</Text>}
            
          
        </>

    );
}
export default TripView