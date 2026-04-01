import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const todos = [
  { id: 1, title: 'Buy milk', description: 'Buy Amul milk from shop' },
  { id: 2, title: 'Study React Native', description: 'Learn navigation deep' },
  { id: 3, title: 'Gym', description: 'Leg workout today' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('TodoDetails', { todo: item })}
          >
            <Text style={{ fontSize: 18, padding: 10 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
