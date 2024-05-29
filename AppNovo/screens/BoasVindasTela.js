import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const BoasVindasTela = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Bem-vindo
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" style={styles.description}>
        Este é um aplicativo de exemplo com React e Expo.
      </Animatable.Text>
      <Animatable.View animation="bounceIn" style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Principal')}
        >
          <Text style={styles.buttonText}>Entrar no APP</Text>
        </TouchableOpacity>
      </Animatable.View>
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
    color: '#fff', // Adicione esta linha para garantir que o texto seja visível
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'Satoshi',
    color: '#fff', // Adicione esta linha para garantir que o texto seja visível
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Satoshi',
  },
});

export default BoasVindasTela;
