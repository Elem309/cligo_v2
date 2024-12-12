import { MaterialIcons } from '@expo/vector-icons/build/Icons';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Seat = ({ id, isSelected, onSelect ,isBooked}) => {
  return (
    <TouchableOpacity 
      onPress={() => onSelect(id)}
    disabled={isBooked}
    >
      <MaterialIcons name='event-seat' size={50} color={isSelected ? "#ffcc00" : (isBooked ? "#808080" : "#f0f0f0")}  />
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
