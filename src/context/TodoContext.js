import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used inside Provider');
  }

  return context;
};

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]); // ✅ FIX: should be array
  const [loading, setLoading] = useState(true);

  // ✅ LOAD TODOS
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const saved = await AsyncStorage.getItem('todos');
        if (saved) {
          setTodos(JSON.parse(saved));
        }
      } catch (error) {
        console.log('Load Error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // ✅ SAVE TODOS (AUTO)
  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.log('Save Error:', error);
      }
    };

    saveTodos();
  }, [todos]);

  // ✅ ADD TODO
  const addTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  // ✅ DELETE TODO
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter(item => item.id !== id));
  };

  // ✅ UPDATE STATUS
  const updateTodoStatus = (id, nextStatus) => {
    setTodos((prev) =>
      prev.map(item =>
        item.id === id ? { ...item, status: nextStatus } : item
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        addTodo,
        removeTodo,
        updateTodoStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};