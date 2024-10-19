import { MaterialIcons } from '@expo/vector-icons/build/Icons';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Seat = ({ id, isSelected, onSelect }) => {
  return (
    <TouchableOpacity 
      onPress={() => onSelect(id)}
    >
      <MaterialIcons name='event-seat' size={30} color={isSelected?"#ffcc00":"#f0f0f0"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  seat: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,

  },
  selected: {
    backgroundColor: '#4CAF50',
   
  },
  unselected: {
    backgroundColor: '#fff',

  },
  seatText: {
    fontSize: 16,
  },
});

export default Seat;
