import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const GetStar = ({ setStep }) => {
  return (
    <View style={styles.container}>
      
      {/* 🔥 App Title */}
      <Text style={styles.title}>
        Welcome to Todo Duniya 🚀
      </Text>

      {/* 🔥 Subtitle */}
      <Text style={styles.subtitle}>
        Not just a simple todo app — this is an AI-powered productivity experience.
      </Text>

      {/* 🔥 Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setStep(prev => prev + 1)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
};

export default GetStar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // dark background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 15,
    color: '#cbd5f5',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#1e40af',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5, // shadow (Android)
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});