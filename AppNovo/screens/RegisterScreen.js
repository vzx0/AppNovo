import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = () => {
    return name && email && zip && address && number && password;
  };

  const handleZipChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setZip(numericText);
  };

  const handleRegister = async () => {
    if (isFormValid()) {
      const userData = { name, email, zip, address, number, password };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('RegisterQuestions', { userData }) },
      ]);
    } else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <View style={styles.inputContainer}>
        <Icon name="person" size={24} color="#6200EE" />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#6200EE" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="location-on" size={24} color="#6200EE" />
        <TextInput
          style={styles.input}
          placeholder="CEP"
          value={zip}
          onChangeText={handleZipChange}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="home" size={24} color="#6200EE" />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={24} color="#6200EE" />
        <TextInputMask
          type={'custom'}
          options={{
            mask: '(99) 99999-9999'
          }}
          style={styles.input}
          placeholder="Número"
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#6200EE" />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={[styles.button, !isFormValid() && styles.disabledButton]}
        onPress={handleRegister}
        disabled={!isFormValid()}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Satoshi-Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
  input: {
    flex: 1,
    padding: 15,
    fontFamily: 'Satoshi-Regular',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    opacity: 1,
    transition: 'opacity 0.3s',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Satoshi-Bold',
  },
});

export default RegisterScreen;
