import { ChevronRight, MapPin } from '@tamagui/lucide-icons'
import { ListItem, Separator, XStack, YGroup, Header, View, Text, Input } from 'tamagui'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'

const Locations = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className='mx-2 mb-3'>
    <View style={{ padding: 16, }}>
          <Text style={{ fontSize: 24 }} className="font-bold text-black mb-3">Search</Text>
          <Input size="$4" borderWidth={1} placeholder="Type Here"/>
        </View>
        <Separator marginVertical={5} />
    <ScrollView style={{ flex: 1 }}>
    <YGroup  separator={<Separator />}>
      <YGroup.Item>
        <TouchableOpacity>
        <ListItem
          hoverTheme
          pressTheme
          title="Dimapur"
          subTitle="DMP"
          icon={MapPin}
          iconAfter={ChevronRight}
          
        />
        </TouchableOpacity>
      </YGroup.Item>
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Kohima"
          subTitle="KMA"
          icon={MapPin}
          iconAfter={ChevronRight}
        />
      </YGroup.Item>
    </YGroup>
    </ScrollView>
    </SafeAreaView>
   
  )
}

export default Locations