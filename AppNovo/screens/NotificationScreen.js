import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="notifications" size={100} color="#6200EE" style={styles.icon} />
      <Text style={styles.text}>Sua conta não tem notificação ainda</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    opacity: 0.3,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Satoshi-Regular',
  },
});

export default NotificationScreen;
