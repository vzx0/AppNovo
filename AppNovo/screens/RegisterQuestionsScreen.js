import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';

const questions = [
  { type: 'choice', question: 'Qual mercado você frequenta mais?', options: ['Semar', 'Veran', 'Swift', 'Shibata'] },
  { type: 'text', question: 'Qual tipo de produto você costuma comprar?' },
  { type: 'choice', question: 'Você gostaria de receber ofertas?', options: ['Sim', 'Não'] },
];

const RegisterQuestionsScreen = ({ navigation, route }) => {
  const { userData } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(''));
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (currentQuestion + 1) / questions.length,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentQuestion]);

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save user data to a file
      const dataToSave = { ...userData, answers };
      const fileUri = FileSystem.documentDirectory + 'userData.json';
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(dataToSave));

      // Show success message
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSelectOption = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const isAnswerProvided = () => {
    return answers[currentQuestion].length > 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro - Perguntas</Text>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      {questions[currentQuestion].type === 'text' ? (
        <TextInput
          style={styles.input}
          value={answers[currentQuestion]}
          onChangeText={(text) => {
            const newAnswers = [...answers];
            newAnswers[currentQuestion] = text;
            setAnswers(newAnswers);
          }}
          keyboardType="default"
        />
      ) : (
        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                answers[currentQuestion] === option && styles.selectedOption,
              ]}
              onPress={() => handleSelectOption(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  answers[currentQuestion] === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }) },
          ]}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <Icon name="arrow-back" size={24} color="#6200EE" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, !isAnswerProvided() && styles.disabledButton]}
          onPress={handleNext}
          disabled={!isAnswerProvided()}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion < questions.length - 1 ? 'Próximo' : 'Finalizar'}
          </Text>
        </TouchableOpacity>
      </View>
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
    fontFamily: 'Satoshi-Black',
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'Satoshi-Regular',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontFamily: 'Satoshi-Medium',
  },
  optionsContainer: {
    width: '80%',
  },
  option: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#6200EE',
    backgroundColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 18,
    fontFamily: 'Satoshi-Regular',
  },
  selectedOptionText: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6200EE',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#6200EE',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    opacity: 1,
    transition: 'opacity 0.3s',
  },
  backButtonText: {
    color: '#6200EE',
    fontSize: 18,
    fontFamily: 'Satoshi-Regular',
    marginLeft: 5,
  },
  nextButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    opacity: 1,
    transition: 'opacity 0.3s',
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Satoshi-Regular',
  },
});

export default RegisterQuestionsScreen;
