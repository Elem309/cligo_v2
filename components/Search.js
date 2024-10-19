import { View, Text, H4, XStack, YStack, Separator } from 'tamagui';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker/src';
import { TouchableOpacity, Modal } from 'react-native';
import Locations from './Locations';
import { useNavigation } from '@react-navigation/native';

const Search = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState(new Intl.DateTimeFormat('en-US', options).format(new Date()))
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false); // Dismiss the picker after selection
    setDate(currentDate); // Update the date state

    // Format the date to "Sun 29 Sep"
    
    setFormattedDate(new Intl.DateTimeFormat('en-US', options).format(currentDate));
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
        value: date,
      onChange,
      mode: 'date',
    })
}

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ensure we compare only the date part


  const setlocation = ()=>{
    setModalVisible(true)
  }

  function setLocation(){
    setModalVisible(false)
  }

  const navigation = useNavigation()

  function handleSearch(){
        navigation.navigate('Trips')
  }


  return (
    <YStack className='border border-gray-300 p-4 rounded-lg mt-2 bg-slate-100' {...props}>
      <H4 className='font-bold mb-3'>Tickets</H4>
      <View className='border border-gray-200 bg-white rounded-md p-3'>
        <TouchableOpacity onPress={setlocation}>
        <XStack>
          <MaterialIcons name="local-taxi" size={30} color="$gray" />
          <Separator alignSelf="stretch" vertical marginHorizontal={15} />
          <Text className='my-auto ml-2 text-gray-600'>From</Text>
        </XStack>
        </TouchableOpacity>
      </View>
      <View className='border border-gray-200 bg-white rounded-md p-3 mt-3'>
        <TouchableOpacity>
        <XStack>
          <MaterialIcons name="local-taxi" size={30} color="$gray" />
          <Separator alignSelf="stretch" vertical marginHorizontal={15} />
          <Text className='my-auto ml-2 text-gray-600'>To</Text>
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
      <TouchableOpacity className='mt-3 bg-yellow-400 rounded-lg flex-row justify-center p-3' onPress={handleSearch}>
        <View className='my-auto mx-2'>
          <MaterialIcons name='search' size={20} />
        </View>
        <Text className='font-bold text-lg'>Search Taxi</Text>
      </TouchableOpacity>

      <Modal
        transparent={false}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Locations />

      </Modal>
    </YStack>
  );
};

export default Search;
