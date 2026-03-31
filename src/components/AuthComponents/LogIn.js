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
import { useForm, Controller } from 'react-hook-form';
import { Auth } from '../../api/AuthAPI';

const LogIn = ({ login, setLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser, setToken } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  // ✅ Validation
  // const isDisabled = !username.trim() || !password.trim();

  // ✅ Submit
  const onSubmit = async data => {
    // if (isDisabled) {
    //   Alert.alert('Error', 'Please fill all fields');
    //   return;
    // }
    try {
      // const data = {
      //   username,
      //   password,
      // };
      console.log(data);

      const res = await Auth.login(data);
      console.log(res);
      console.log('data', res.data);
      setUser(JSON.stringify(res.data.user));
      setToken(JSON.stringify(res.data.accessToken));
      console.log('accessToken', res.data.accessToken);

      Alert.alert(res.success ? 'Success' : 'Fail', res.message);
    } catch (error) {
      console.log(
        'Error on login ',
        error?.response?.data?.message || error.message,
      );
      // console.log(error?.response?.data?.message)
      Alert.alert('Error', error?.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔥 Title */}
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* 🔥 Inputs */}

      <Controller
        name="username"
        control={control}
        rules={{ required: 'UserName is Required' }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Username / Email"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={value.trim().toLocaleLowerCase()}
            onChangeText={onChange}
          />
        )}
      />

      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}

      {/* <TextInput
        placeholder="Username / Email"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      /> */}

      {/* 🔥 Password */}

      <Controller
        name="password"
        control={control}
        rules={{
          required: 'password is required',
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
            value={value}
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

      {/* 🔥 Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: !isValid ? 'gray' : '#1e40af' },
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
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
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
});
