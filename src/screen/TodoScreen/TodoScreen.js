/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { useTodoContext } from '../../context/TodoContext';

const TodoScreen = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('pending');

  const { todos, addTodo, removeTodo, updateTodoStatus } = useTodoContext();

  // ✅ Status Options
  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'inprogress' },
    { label: 'Completed', value: 'completed' },
  ];

  // ✅ Colors
  const getStatusColor = status => {
    if (status === 'pending') return '#facc15';
    if (status === 'inprogress') return '#38bdf8';
    if (status === 'completed') return '#22c55e';
    return '#ccc';
  };

  const getTextColor = status => (status === 'pending' ? '#000' : '#fff');

  // ✅ NEXT STATUS
  const getNextStatus = status => {
    if (status === 'pending') return 'inprogress';
    if (status === 'inprogress') return 'completed';
    return null;
  };

  // ✅ ADD TODO
  const addNewTodo = () => {
    if (!title || !details) return;

    const newTodo = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      title,
      details,
      status,
    };

    addTodo(newTodo);

    setTitle('');
    setDetails('');
    setStatus('pending');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Todo App 🚀</Text>

      {/* INPUT */}
      <View style={styles.inputView}>
        <TextInput
          placeholder="Todo title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Todo details"
          style={[styles.input, styles.textArea]}
          value={details}
          onChangeText={setDetails}
          multiline
        />

        <Dropdown
          style={styles.dropdown}
          data={statusOptions}
          labelField="label"
          valueField="value"
          placeholder="Select Status"
          value={status}
          onChange={item => setStatus(item.value)}
          containerStyle={{ zIndex: 2000 }}
        />

        <TouchableOpacity style={styles.addBtn} onPress={addNewTodo}>
          <Text style={styles.addText}>Add Todo</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Todos Yet 😢</Text>
        }
        renderItem={({ item }) => {
          const nextStatus = getNextStatus(item.status);

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('TodoDetails', { todo: item })}
              style={[
                styles.card,
                { borderLeftColor: getStatusColor(item.status) },
                item.status === 'completed' && { opacity: 0.6 },
              ]}
            >
              {/* HEADER */}
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                >
                  <Text
                    style={{
                      color: getTextColor(item.status),
                      fontSize: 11,
                      fontWeight: '600',
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

             <View style={styles.row}>

 {/* DETAILS */}
              <Text style={styles.details} numberOfLines={2}>
                {item.details}
              </Text>

              {/* DATE */}
              <Text style={styles.date}>📅 {item.date}</Text>

             </View>

              {/* BUTTONS */}
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => removeTodo(item.id)}
                >
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.updateBtn,
                    !nextStatus && { backgroundColor: '#9ca3af' },
                  ]}
                  onPress={() =>
                    nextStatus && updateTodoStatus(item.id, nextStatus)
                  }
                  disabled={!nextStatus}
                >
                  <Text style={styles.btnText}>
                    {nextStatus ? `Mark ${nextStatus}` : 'Completed'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f1f5f9',
  },
  containerText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 26,
    fontWeight: 'bold',
  },
  inputView: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
  },
  addBtn: {
    backgroundColor: '#0b7840',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    padding: 14,
    borderRadius: 14,
    marginTop: 12,
    borderLeftWidth: 6,
    backgroundColor: '#fff',
    elevation: 4,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },

  details: {
    color: '#555',
    marginTop: 6,
  },

  date: {
    fontSize: 12,
    color: '#777',
    marginTop: 6,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  deleteBtn: {
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 6,
  },

  updateBtn: {
    backgroundColor: '#22c55e',
    padding: 8,
    borderRadius: 6,
  },

  btnText: {
    color: '#fff',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
