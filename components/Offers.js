
import React from 'react'
import { Text, XStack , H4, View, Card, H2, Paragraph, Button, Image} from 'tamagui'
import { ScrollView } from 'react-native';

function DemoCard(){
 return(
    <View >
    <Card elevate size="$4" bordered  className='mr-3'>
      <Card.Header padded>
        <H2>Sony A7IV</H2>
        <Paragraph theme="alt2">Now available</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10">Purchase</Button>
      </Card.Footer>
      <Card.Background>
        <Image
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            
          }}
        />
      </Card.Background>
    </Card>
    </View>
 )
}


const Offers = () => {
  return (
    <View className='mt-3 '>
   <H4 className='font-bold mb-3 px-4'>Offers</H4>
   <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-3">
        <DemoCard/>
        <DemoCard/>
        <DemoCard/>
    </ScrollView>
    </View>
   
  )
}

export default Offers