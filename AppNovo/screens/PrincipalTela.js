import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const PrincipalTela = () => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Text style={styles.title}>Tela Principal</Text>
      <Text style={styles.description}>
        Esta é a tela principal do aplicativo, onde você pode acessar todas as funcionalidades principais.
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Satoshi',
    color: '#fff',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'Satoshi',
    color: '#fff',
  },
});

export default PrincipalTela;
