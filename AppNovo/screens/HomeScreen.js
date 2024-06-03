import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Animated, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const products = [
  { id: 1, name: 'Produto 1', image: require('../assets/Cappucino.jpg'), oldPrice: 'R$ 100,00', price: 'R$ 80,00', parcel: '10x R$ 8,00' },
  { id: 2, name: 'Produto 2', image: require('../assets/Coco Ralado.jpg'), oldPrice: 'R$ 150,00', price: 'R$ 120,00', parcel: '10x R$ 12,00' },
  { id: 3, name: 'Produto 3', image: require('../assets/Leite Condensado.jpg'), oldPrice: 'R$ 200,00', price: 'R$ 160,00', parcel: '10x R$ 16,00' },
];

const banners = [
  { id: 1, image: require('../assets/Teste.png') },
  { id: 2, image: require('../assets/Teste.png') },
  { id: 3, image: require('../assets/Teste.png') },
];

const HomeScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const bannerScrollView = useRef();
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setAddress(`${user.address}`);
        setName(user.name);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    let scrollValue = 0;
    let scrolled = 0;
    const interval = setInterval(() => {
      scrolled++;
      if (scrolled < banners.length) {
        scrollValue = scrollValue + width;
      } else {
        scrollValue = 0;
        scrolled = 0;
      }
      bannerScrollView.current.scrollTo({ x: scrollValue, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  let [fontsLoaded] = useFonts({
    'Satoshi-Regular': require('../assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color="#6200EE" style={styles.locationIcon} />
          <View>
            <Text style={styles.locationTitle}>Localização</Text>
            <Text style={styles.locationAddress}>{address}</Text>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="notifications" size={24} color="#6200EE" style={styles.notificationIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../assets/logo.jpg')} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
        />
        <Ionicons name="filter" size={24} color="gray" style={styles.filterIcon} />
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerContainer}
        ref={bannerScrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {banners.map((banner) => (
          <Image key={banner.id} source={banner.image} style={styles.bannerImage} />
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Ofertas do Dia</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productBox}>
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productOldPrice}>{product.oldPrice}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
            <Text style={styles.productParcel}>{product.parcel}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="cart" size={24} color="#fff" />
              <Text style={styles.addButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="notifications-off" size={100} color="#6200EE" style={styles.modalIcon} />
            <Text style={styles.modalText}>{name}, você ainda não possui notificações</Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginTop: 40, // Added margin to the top of the screen
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 5,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Satoshi-Regular',
  },
  locationAddress: {
    fontSize: 20,
    color: '#6200EE',
    fontFamily: 'Satoshi-Bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    marginRight: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom: 30,
    borderWidth: 1,
    fontFamily: 'Satoshi-Medium',
    borderColor: '#ccc',
    borderRadius: 30,
    height: 60,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 20,
    fontFamily: 'Satoshi-Medium',
  },
  searchIcon: {
    marginRight: 15,
    marginLeft: 10,
  },
  filterIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  bannerContainer: {
    height: 150,
  },
  bannerImage: {
    width: width,
    height: 150,
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20,
    fontFamily: 'Satoshi-Bold',
  },
  productContainer: {
    paddingHorizontal: 10,
  },
  productBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 180,
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
    fontFamily: 'Satoshi-Bold',
  },
  priceContainer: {
    alignItems: 'center',
  },
  productOldPrice: {
    textDecorationLine: 'line-through',
    color: 'red',
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
  },
  productPrice: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Satoshi-Bold',
  },
  productParcel: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Satoshi-Regular',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 15,
    fontFamily: 'Satoshi-Bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalIcon: {
    opacity: 0.3,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: '#6200EE',
    width: 240,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Satoshi-Bold',
  },
});

export default HomeScreen;
