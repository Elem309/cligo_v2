import { ChevronRight, Car } from '@tamagui/lucide-icons'
import { ListItem, Separator, XStack, YGroup, Header, View, Text, Input } from 'tamagui'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'

const Trips = () => {
    const navigation = useNavigation()
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"30 Sep | DMP to KMA"
        })
    })
  return (
    <SafeAreaView style={{ flex: 1 }} className='mx-3 my-3'>
    <ScrollView style={{ flex: 1 }} >
    <YGroup  separator={<Separator />} gap='$1.5'>
      <YGroup.Item>
       
        <ListItem
          hoverTheme
          pressTheme
          title="₹ 130 | 5 Available"
          subTitle="NL02AC1234"
          icon={Car}
          iconAfter={ChevronRight}
          onPress={()=>navigation.navigate('TripView')}
        />
      </YGroup.Item>
      <YGroup.Item>
      <TouchableOpacity>
        <ListItem
          hoverTheme
          pressTheme
          title="₹ 130 | 2 Available"
          subTitle="NL02AA1234"
          icon={Car}
          iconAfter={ChevronRight}
          
        />
        </TouchableOpacity>
      </YGroup.Item>
    </YGroup>
    </ScrollView>
    </SafeAreaView>
   
  )
}

export default Trips