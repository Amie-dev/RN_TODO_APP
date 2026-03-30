import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useUserContext } from '../../context/AuthContext';
import {useForm,Controller} from "react-hook-form"
import { Auth } from '../../api/AuthAPI';

const LogIn = ({ login, setLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser,setToken } = useUserContext();

  // ✅ Validation
  const isDisabled = !username.trim() || !password.trim();

  // ✅ Submit
  const handleSubmit = async () => {
    if (isDisabled) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
try {
  const data={
      username,
      password,
    }

    const res=await Auth.login(data)
    console.log(res)
    console.log("data",res.data)
    setUser(JSON.stringify(res.data.user));
    setToken(JSON.stringify(res.data.accessToken))
    console.log("accessToken",res.data.accessToken)
    
     Alert.alert(res.success?"Success":"Fail", res.message);
} catch (error) {
  console.log("Error on login",error)
}

   
  };

  return (
    <View style={styles.container}>
      {/* 🔥 Title */}
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* 🔥 Inputs */}
      <TextInput
        placeholder="Username / Email"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 🔥 Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDisabled ? 'gray' : '#1e40af' },
        ]}
        onPress={handleSubmit}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* 🔥 Switch to Signup */}
      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => setLogin(!login)}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: '#cbd5f5',
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#1e40af',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  footerText: {
    color: '#cbd5f5',
    textAlign: 'center',
    marginTop: 20,
  },

  link: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
});
