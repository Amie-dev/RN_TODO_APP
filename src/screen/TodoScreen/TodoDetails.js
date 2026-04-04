import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const TodoDetails = ({ route }) => {
  const { todo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>

      <Text style={styles.label}>Details:</Text>
      <Text style={styles.text}>{todo.details}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.text}>{todo.status}</Text>

      <Text style={styles.label}>Date:</Text>
      <Text style={styles.text}>{todo.date}</Text>
    </View>
  );
};

export default TodoDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  text: {
    color: '#444',
    marginTop: 4,
  },
});