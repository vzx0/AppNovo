import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ShoppingListScreen = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const addProduct = () => {
    if (!productName || !price) return;

    const newProduct = {
      id: Math.random().toString(),
      name: productName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };
    setProducts([...products, newProduct]);
    setTotal(total + newProduct.quantity * newProduct.price);
    setProductName('');
    setQuantity(1);
    setPrice('');
  };

  const increaseQuantity = (id) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        product.quantity += 1;
        setTotal(total + product.price);
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const decreaseQuantity = (id) => {
    const updatedProducts = products.map(product => {
      if (product.id === id && product.quantity > 1) {
        product.quantity -= 1;
        setTotal(total - product.price);
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const removeProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    const removedProduct = products.find(product => product.id === id);
    setTotal(total - removedProduct.quantity * removedProduct.price);
    setProducts(updatedProducts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantity.toString()}
          onChangeText={(value) => setQuantity(value)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addProduct}>
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <View style={styles.productInfo}>
              <Text style={styles.productText}>{item.name}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                  <Ionicons name="remove-circle" size={24} color="red" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                  <Ionicons name="add-circle" size={24} color="green" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.priceText}>R$ {item.price.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removeProduct(item.id)}>
              <Ionicons name="trash" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    paddingTop: 50, // Added padding to the top
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Satoshi-Bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'Satoshi-Regular',
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontFamily: 'Satoshi-Bold',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  productText: {
    fontFamily: 'Satoshi-Regular',
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontFamily: 'Satoshi-Regular',
  },
  priceText: {
    fontFamily: 'Satoshi-Regular',
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontFamily: 'Satoshi-Bold',
  },
});

export default ShoppingListScreen;
