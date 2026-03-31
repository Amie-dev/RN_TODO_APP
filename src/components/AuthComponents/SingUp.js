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
import { Controller, useForm } from 'react-hook-form';

const SingUp = ({ login, setLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isLoading, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
      role: 'ADMIN',
    },
    mode: 'onChange',
  });

  // ✅ Validation
  // const isDisabled =
  //   !name.trim() || !email.trim() || !username.trim() || !password.trim();

  // ✅ Submit
  const onSubmit = async data => {
    // if (isDisabled) {
    //   Alert.alert('Error', 'Please fill all fields');
    //   return;
    // }

    try {
      // const data = { name, email, username, password, role: 'ADMIN' };
      // setUser(data);

      const res = await Auth.register(data);
      //statusCode: 200, data: {…}, message: 'Users registered successfully and verification email has been sent on your email.', success: true
      console.log('register Data', res.data);
      setLogin(!login);
      Alert.alert('Success', 'Account Created ✅');
    } catch (error) {
      // Alert.alert('Error',error)
      console.log('register Error', error);
      Alert.alert('Error', error?.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join NexTTodo 🚀</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is Required' }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}> {errors.name.message}</Text>}
      {/* <TextInput
        placeholder="Full Name"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={name}
        onChangeText={setName}
      /> */}

      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is Required' }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      {/* <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      /> */}

      <Controller
        name="username"
        control={control}
        rules={{
          required: 'UserName is Required with LowerCase',
          minLength: {
            value: 3,
            message: 'UserName must be more then 3 Char',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Username"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}
      {/* <TextInput
        placeholder="Username"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      /> */}

      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password must be required',
          minLength: {
            value: 4,
            message: 'Password must be more then 4 Char',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            secureTextEntry
            value={value.trim().toLocaleLowerCase()}
            onChangeText={onChange}
          />
        )}
      />
 {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}
      {/* <TextInput
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      /> */}

      {/* ✅ Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: !isValid ? 'gray' : '#1e40af' },
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
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
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
});
