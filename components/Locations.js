import { ChevronRight, MapPin } from '@tamagui/lucide-icons';
import { ListItem, Separator, YGroup, View, Text, Input } from 'tamagui';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import API_URL from '../config/Api';
import LottieView from 'lottie-react-native';

const Locations = ({ onLocationSelect }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${API_URL}/table/location`);
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Lottie animation */}
        <LottieView
          source={require('../assets/loading.json')} // Adjust the path to your loading animation
          autoPlay
          loop
          style={{ width: 100, height: 100 }} // Adjust size as needed
        />
      </SafeAreaView>
    );
  }

  const filteredLocations = locations.filter(location =>
    location.title.toLowerCase().startsWith(searchKeyword.toLowerCase())
  );

  const handleSelectLocation = (location) => {
    // Call the onLocationSelect prop with the selected location
    onLocationSelect(location);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className='mx-2 mb-3'>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24 }} className="font-bold text-black mb-3">Search</Text>
        <Input
          size="$4"
          borderWidth={1}
          placeholder="Type Here"
          onChangeText={setSearchKeyword}
          value={searchKeyword}
        />
      </View>
      <Separator marginVertical={5} />
      <ScrollView style={{ flex: 1 }}>
        <YGroup separator={<Separator />}>
          {filteredLocations.map((location) => (
            <ListItem
              key={location.id}
              hoverTheme
              pressTheme
              title={location.title}
              subTitle={location.short}
              icon={MapPin}
              iconAfter={ChevronRight}
              onPress={() => handleSelectLocation(location)} // Pass the selected location
            />
          ))}
        </YGroup>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Locations;
