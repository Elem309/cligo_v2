import { ChevronRight, Car } from '@tamagui/lucide-icons'
import { ListItem, Separator, XStack, YGroup, Header, View, Text } from 'tamagui'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, ScrollView } from 'react-native'

const Bookings = () => {

    const navigation = useNavigation()

  return (
    
    <SafeAreaView style={{ flex: 1 }} className='mx-2 mb-3'>
    <View style={{ padding: 16, }}>
          <Text style={{ fontSize: 24 }} className="font-bold">My Bookings</Text>
        </View>
        <Separator marginVertical={5} />
    <ScrollView style={{ flex: 1 }}>
    <YGroup  separator={<Separator />}>
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Dimapur to Kohima"
          subTitle="Sun 29 Sep"
          icon={Car}
          iconAfter={ChevronRight}
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Moon"
          subTitle="Subtitle"
          icon={Car}
          iconAfter={ChevronRight}
        />
      </YGroup.Item>
    </YGroup>
    </ScrollView>
    </SafeAreaView>
   
    
  )
}

export default Bookings