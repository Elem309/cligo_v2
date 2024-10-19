import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { CheckCircle , ArrowRight, PhoneCall, Download, Cross, Ban, ArrowLeftSquare } from '@tamagui/lucide-icons'
import { Button, Separator } from 'tamagui'
import QRCode from 'react-native-qrcode-svg'

const TicketView = () => {
    const navigation = useNavigation()

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false
        })
    })
  return (
    <SafeAreaView style={{flex:1}} className="px-2 pt-3 ">
    
        <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:70}} className="mx-2 mt-3 " showsVerticalScrollIndicator={false}>
            <View className=" bg-white p-2 rounded flex-row justify-between" >
                <View className="flex-row justify-start">
                    <CheckCircle size={30} color={"green"}/>
                    <Text className="text-lg font-bold text-green-700 ml-3">Booking Confirmed</Text>
                </View>
                <Text className="text-lg font-bold text-gray-500">NL02AA1234</Text>
            </View>
            <View className="bg-white p-2 rounded flex-row justify-between mt-2" >
                <View>
                    <Text className="text-lg font-bold">DIMAPUR</Text>
                    <Text>DMP</Text>
                    <Text className="mt-2 text-gray-500">2 Oct 2024</Text>
                    <Text className=" text-gray-500">Dept Time : 10:30 AM</Text>
                    <Text className=" text-gray-500">Boarding: Chumukedima</Text>
                </View>
                <View className="my-auto">
                    <ArrowRight size={30} color={"gray"}/>
                </View>
                
                <View>
                    <Text className="text-lg font-bold text-right">KOHIMA</Text>
                    <Text className="text-right">KMA</Text>
                    <Text className="mt-2 text-gray-500 text-right font-bold">PNR:</Text>
                    <Text className=" text-gray-500 text-right">asdhj123jkhasd</Text>
                </View>
            </View>
            <View className="bg-white p-2 rounded  mt-2" >
            <View className="flex-row justify-between">
                    <Text className="font-bold ">Passengers</Text>
                    <Text className="font-bold text-right">Seat No</Text>
                    
                </View>
                <Separator marginVertical={15}/>
                <View className="mb-1 flex-row justify-between">
                    <Text className=" ">John</Text>
                    <Text className=" text-right">1</Text>
                </View>
                <View className="mb-1 flex-row justify-between">
                    <Text className=" ">Arnold</Text>
                    <Text className=" text-right">2</Text>
                </View>
                <Separator marginVertical={15}/>
                <View className="flex-row justify-between mb-3">
                <QRCode 
                    value= {"https://quickserv.in"}
                    size={150}
                    color='black'
                    backgroundColor='white'
                />
                <View className="my-auto">
                    <Text className="font-bold text-gray-500">Total Amount Paid</Text>
                    <Text className="text-xl font-bold">₹ 240 /-</Text>
                    <Text>Incl of GST</Text>
                </View>
                </View>
                <Button iconAfter={PhoneCall} className='mb-1'>
                    Call Driver
                </Button>
                <Button iconAfter={Ban} className='mb-1' >
                    Cancel
                </Button>
                
                

        </View>
        </ScrollView>     
    </SafeAreaView>


  )
}


export default TicketView