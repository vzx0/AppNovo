import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const markets = [
  { id: 1, name: 'Shibata', image: require('../assets/Shibata logo.png'), distance: 2, discount: 10 },
  { id: 2, name: 'Swift', image: require('../assets/swift logo.png'), distance: 3.5, discount: 15 },
  { id: 3, name: 'Semar', image: require('../assets/semar logo.png'), distance: 4.2, discount: 25 },
];

const MarketScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const loadAddress = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setAddress(`${user.address}`);
      }
    };
    loadAddress();
  }, []);

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
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications" size={24} color="#6200EE" style={styles.notificationIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../assets/logo.jpg')} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
      </View>
      {markets.map((market) => (
        <View key={market.id} style={styles.marketCard}>
          <Image source={market.image} style={styles.marketImage} resizeMode="contain" />
          <View style={styles.marketInfo}>
            <Text style={styles.marketName}>{market.name}</Text>
            <View style={styles.marketDistance}>
              <Ionicons name="location" size={16} color="#6200EE" />
              <Text style={styles.distanceText}>{market.distance} KM</Text>
            </View>
          </View>
          <View style={styles.discountContainer}>
            <Text style={styles.discountText}>{market.discount}% OFF</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginTop: 40,
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
  marketCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  marketImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  marketInfo: {
    flex: 1,
  },
  marketName: {
    fontSize: 18,
    fontFamily: 'Satoshi-Bold',
  },
  marketDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  distanceText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
    fontFamily: 'Satoshi-Regular',
  },
  discountContainer: {
    backgroundColor: '#6200EE',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  discountText: {
    color: '#fff',
    fontFamily: 'Satoshi-Bold',
  },
});

export default MarketScreen;
