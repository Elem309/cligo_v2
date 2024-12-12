import { View, Text, H4, XStack, YStack, Separator } from 'tamagui';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker/src';
import { TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import Locations from './Locations';
import { useNavigation } from '@react-navigation/native';

const Search = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    const [sourceLocation, setSourceLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const [selectingSource, setSelectingSource] = useState(true); // New state to track the selection type
    const [loading ,setLoading] = useState.apply(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setFormattedDate(new Intl.DateTimeFormat('en-US', options).format(currentDate));
    };

    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: 'date',
        });
    };

    const handleLocationSelect = (location) => {
        if (selectingSource) {
            setSourceLocation(location);
        } else {
            setDestinationLocation(location);
        }
        setModalVisible(false); // Close the modal
    };

    const navigation = useNavigation();

    const handleSearch = () => {
        setLoading(true)
        // Check if sourceLocation is valid
        if (!sourceLocation || !sourceLocation.short) {
            Alert.alert('Oops!!', 'Please select a location.');
            return;
        }
    
        // Check if destinationLocation is valid
        if (!destinationLocation || !destinationLocation.short) {
            Alert.alert('Oops!!', 'Please select a  location.');
            return;
        }
    
        // Check if the source and destination are the same
        if (sourceLocation.short.toLowerCase() === destinationLocation.short.toLowerCase()) {
            Alert.alert('Oops!!', 'Please select a different destination.');
            return;
        }
    
        // Check if date is valid
        if (!date) {
            Alert.alert('Oops', 'Please select a valid date.');
            return;
        }
    
        // Navigate if all validations pass
        navigation.navigate('Trips', {
            source: sourceLocation.short.toLowerCase(),
            destination: destinationLocation.short.toLowerCase(),
            date: new Date(date)
        });
    };
    

    return (
        <YStack className='border border-gray-300 p-4 rounded-lg mt-2 bg-slate-100' {...props}>
            <H4 className='font-bold mb-3'>Tickets</H4>
            <View className='border border-gray-200 bg-white rounded-md p-3'>
                <TouchableOpacity onPress={() => { setSelectingSource(true); setModalVisible(true); }}>
                    <XStack>
                        <MaterialIcons name="local-taxi" size={30} color="$gray" />
                        <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                        <Text className='my-auto ml-2 text-gray-600'>
                            {sourceLocation ? sourceLocation.title : 'From'}
                        </Text>
                    </XStack>
                </TouchableOpacity>
            </View>
            <View className='border border-gray-200 bg-white rounded-md p-3 mt-3'>
                <TouchableOpacity onPress={() => { setSelectingSource(false); setModalVisible(true); }}>
                    <XStack>
                        <MaterialIcons name="local-taxi" size={30} color="$gray" />
                        <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                        <Text className='my-auto ml-2 text-gray-600'>
                            {destinationLocation ? destinationLocation.title : 'To'}
                        </Text>
                    </XStack>
                </TouchableOpacity>
            </View>
            <View className='border border-gray-200 bg-white rounded-md p-3 mt-3'>
                <TouchableOpacity onPress={showDatePicker}>
                    <XStack>
                        <View className='my-auto'>
                            <MaterialIcons name="date-range" size={30} color="$gray" />
                        </View>
                        <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                        <YStack className='my-auto ml-2'>
                            <Text className='text-gray-600'>Date of journey</Text>
                            <Text className='font-bold text-lg'>{formattedDate}</Text>
                        </YStack>
                    </XStack>
                </TouchableOpacity>
            </View>
            <TouchableOpacity className='mt-3 bg-yellow-400 rounded-lg flex-row justify-center p-3' onPress={handleSearch} disabled={loading}>
                {loading?<ActivityIndicator size={"large"} color={"#000000"}/>:
                <>
                <View className='my-auto mx-2'>
                    <MaterialIcons name='search' size={20} />
                </View>
                <Text className='font-bold text-lg'>Search Taxi</Text>
                </>
                
                }
                
            </TouchableOpacity>

            <Modal
                transparent={false}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Locations onLocationSelect={handleLocationSelect} />
            </Modal>
        </YStack>
    );
};

export default Search;
