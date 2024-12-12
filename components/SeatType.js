import React from 'react';
import {  View, Text, } from 'react-native';
import Seat from './Seat';


export default SeatMap = ({selectedSeat, handleSeatSelect, type, bookedSeats})=>{
    console.log(type)
    if(type == "alto"){
        return(
            <View className="flex-row justify-between">
            <View className="border border-gray-200 p-2 rounded-md mt-3  mb-3">
                <View className="flex-row flex-wrap justify-start ">
                <View >
                    <Seat key={4} id={4} isSelected={selectedSeat.includes(4)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(4)}/>
                </View>
                <View>
                    <Seat key={3} id={3} isSelected={selectedSeat.includes(3)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(3)}/>
                </View>
                <View>
                    <Seat key={2} id={2} isSelected={selectedSeat.includes(2)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(2)}/>
                </View>
                </View>
                <View className="flex-row flex-wrap justify-end space-x-2">
                <View>
                    <Seat key={1} id={1} isSelected={selectedSeat.includes(1)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(1)}/>
                </View>
                </View>
            </View>
            <View>
                <View className="flex-row justify-start space-x-2 my-auto">
                    <View className="w-5 h-5 bg-gray-100"></View>
                    <Text className="my-auto">Available</Text>
                </View>
                <View className="flex-row justify-start space-x-2 my-auto">
                    <View className="w-5 h-5 " style={{backgroundColor:"#ffcc0e"}}></View>
                    <Text className="my-auto">Selected</Text>
                </View>
                <View className="flex-row justify-start space-x-2 my-auto">
                    <View className="w-5 h-5 " style={{backgroundColor:"#808080"}}></View>
                    <Text className="my-auto">Booked</Text>
                </View>
            </View>
            </View>
        )
    }
    else if(type == "eeco"){
        return(
            <View className="flex-row justify-between">
            <View className="border border-gray-200 p-2 rounded-md mt-3  mb-3">
            <View className="flex-row flex-wrap justify-start ">
                <View >
                    <Seat key={7} id={7} isSelected={selectedSeat.includes(7)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(7)}/>
                </View>
                <View>
                    <Seat key={6} id={6} isSelected={selectedSeat.includes(6)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(6)}/>
                </View>
                <View>
                    <Seat key={5} id={5} isSelected={selectedSeat.includes(5)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(5)}/>
                </View>
                </View>
                <View className="flex-row flex-wrap justify-start ">
                <View >
                    <Seat key={4} id={4} isSelected={selectedSeat.includes(4)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(4)}/>
                </View>
                <View>
                    <Seat key={3} id={3} isSelected={selectedSeat.includes(3)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(3)}/>
                </View>
                <View>
                    <Seat key={2} id={2} isSelected={selectedSeat.includes(2)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(2)}/>
                </View>
                </View>
                <View className="flex-row flex-wrap justify-end space-x-2">
                <View>
                    <Seat key={1} id={1} isSelected={selectedSeat.includes(1)} onSelect={handleSeatSelect} isBooked={bookedSeats.includes(1)}/>
                </View>
                </View>
            </View>
            <View>
                <View className="flex-row justify-start space-x-2 my-auto">
                    <View className="w-5 h-5 bg-gray-100"></View>
                    <Text className="my-auto">Available</Text>
                </View>
                <View className="flex-row justify-start space-x-2 my-auto">
                    <View className="w-5 h-5 " style={{backgroundColor:"#ffcc0e"}}></View>
                    <Text className="my-auto">Selected</Text>
                </View>
                <View className="flex-row justify-start space-x-2 my-auto">
                    <View className="w-5 h-5 " style={{backgroundColor:"#808080"}}></View>
                    <Text className="my-auto">Booked</Text>
                </View>
            </View>
            </View>
        )
    }
    // else if(type == "sumo"){
    //     return(
    //         <View className="flex-row justify-between">
    //         <View className="border border-gray-200 p-2 rounded-md mt-3  mb-3">
    //             <View className="flex-row flex-wrap justify-start ">
    //             <View >
    //                 <Seat key={4} id={4} isSelected={selectedSeat.includes(4)} onSelect={handleSeatSelect} />
    //             </View>
    //             <View>
    //                 <Seat key={3} id={3} isSelected={selectedSeat.includes(3)} onSelect={handleSeatSelect} />
    //             </View>
    //             <View>
    //                 <Seat key={2} id={2} isSelected={selectedSeat.includes(2)} onSelect={handleSeatSelect} />
    //             </View>
    //             </View>
    //             <View className="flex-row flex-wrap justify-end space-x-2">
    //             <View>
    //                 <Seat key={1} id={1} isSelected={selectedSeat.includes(1)} onSelect={handleSeatSelect} />
    //             </View>
    //             </View>
    //         </View>
    //         <View>
    //             <View className="flex-row justify-start space-x-2 my-auto">
    //                 <View className="w-5 h-5 bg-gray-100"></View>
    //                 <Text className="my-auto">Available</Text>
    //             </View>
    //             <View className="flex-row justify-start space-x-2 my-auto">
    //                 <View className="w-5 h-5 " style={{backgroundColor:"#ffcc0e"}}></View>
    //                 <Text className="my-auto">Selected</Text>
    //             </View>
    //             <View className="flex-row justify-start space-x-2 my-auto">
    //                 <View className="w-5 h-5 " style={{backgroundColor:"black"}}></View>
    //                 <Text className="my-auto">Booked</Text>
    //             </View>
    //         </View>
    //         </View>
    //     )
    // }
    
    
    }
    