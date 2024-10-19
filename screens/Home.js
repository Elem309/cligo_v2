import { Text , View, Separator} from 'tamagui'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Search from '../components/Search'
import Offers from '../components/Offers'

const Home = () => {
  return (
    <SafeAreaView style={styles.container} className="bg-white">
    <View style={styles.header}>
      <Text style={styles.title}>Cligo</Text>
    </View>
    <Separator marginVertical={5} />
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      <Search />
      <Offers />
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      paddingVertical: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    scrollView: {
      flex: 1,
      
    },
    scrollViewContent: {
      paddingBottom: 100, // Adjust this value to the height of your tab bar
    },
  });

export default Home