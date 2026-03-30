import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useUserContext } from '../../context/AuthContext';
import { Auth } from '../../api/AuthAPI';

const SingUp = ({ login, setLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useUserContext();

  // ✅ Validation
  const isDisabled =
    !name.trim() || !email.trim() || !username.trim() || !password.trim();

  // ✅ Submit
  const handleSubmit = async () => {
    if (isDisabled) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const data = { name, email, username, password ,role:"ADMIN"};
      // setUser(data);

      const res = await Auth.register(data);
      //statusCode: 200, data: {…}, message: 'Users registered successfully and verification email has been sent on your email.', success: true
      console.log('register Data', res.data);
      setLogin(!login)
      Alert.alert('Success', 'Account Created ✅');
    } catch (error) {
      Alert.alert('Error',error)
      console.log('register Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join NexTTodo 🚀</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Username"
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

      {/* ✅ Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDisabled ? 'gray' : '#1e40af' },
        ]}
        onPress={handleSubmit}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Switch */}
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => setLogin(!login)}>
          Login
        </Text>
      </Text>
    </View>
  );
};

export default SingUp;

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
