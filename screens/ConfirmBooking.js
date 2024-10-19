import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { ScrollView, Separator, Button } from 'tamagui'
import { ArrowRight } from '@tamagui/lucide-icons'
import { useNavigation } from '@react-navigation/native'

const ConfirmBooking = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={{flex:1}} className="px-2 pt-3 bg-white">
        <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:70}} className="mx-2 mt-3 ">
            <View className="rounded border border-gray-200 p-2 mb-3">
                <Text className="font-bold text-lg">Summary</Text>
                <Separator marginVertical={15} />
                <View className="flex-row justify-between">
                    <Text className="font-bold text-gray-400">Boarding</Text>
                    <Text className="font-bold ">Dimapur</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                    <Text className="font-bold text-gray-400">Destination</Text>
                    <Text className="font-bold ">Kohima</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                    <Text className="font-bold text-gray-400">Date</Text>
                    <Text className="font-bold ">2 Oct 2024</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                    <Text className="font-bold text-gray-400">Time</Text>
                    <Text className="font-bold ">10:30 AM</Text>
                </View>
                
                <Separator marginVertical={15} />
                <View className="flex-row justify-between">
                    <Text className="font-bold text-gray-400">Passengers</Text>
                    <Text className="font-bold text-gray-400">Seat No</Text>
                    <Text className="font-bold text-gray-400">Amount</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                    <Text >John</Text>
                    <Text className="text-center">2</Text>
                    <Text >₹ 120</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                    <Text >Arnold</Text>
                    <Text className="text-center">3</Text>
                    <Text >₹ 120</Text>
                </View>
                <Separator marginVertical={15} />
                <View className="flex-row justify-between">
                    <Text className="font-bold text-gray-400">Other</Text>
                    <Text className="font-bold text-gray-400">Amount</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                    <Text >Service Charge</Text>
                    <Text >₹ 25</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                    <Text >GST</Text>
                    <Text >18%</Text>
                </View>
                <Separator marginVertical={15} />
                <View className="flex-row justify-between">
                    <Text className="font-bold ">Total</Text>
                    <Text className="font-bold ">₹ 250</Text>
                </View>
            </View>
            <Button iconAfter={ArrowRight} size="$3" backgroundColor={"#f2f2f2"} onPress={()=> navigation.navigate('Ticket')}>Pay Now
            </Button>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ConfirmBooking