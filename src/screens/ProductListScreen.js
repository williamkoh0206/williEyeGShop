import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Image, 
  TouchableOpacity,
  Modal
} from 'react-native';
import products from '../constants/product';
import colors from '../constants/colors';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';

const ProductListScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, getItemCount } = useCart();
  const cartItemCount = getItemCount();

  const handleAddToCart = (product) => {
    addToCart(product, 1); // Add 1 quantity of the product to cart
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      testID={`product-item-${item.id}`}
      style={styles.productCard}
      onPress={() => {
        // Navigate to product detail screen
        navigation.navigate('ProductDetail', { product: item });
      }}
    >
      <Image 
        source={item.productPhoto} 
        style={styles.productImage}
        resizeMode="cover"
        onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.productName}</Text>
        <Text style={styles.productPrice}>${item.productPrice.toFixed(2)}</Text>
        <StarRating rating={item.ratings} />
        <TouchableOpacity 
          testID={`add-to-cart-${item.id}`}
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>WilliEyeGShop</Text>
        <TouchableOpacity 
          testID="cart-icon"
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>🛒</Text>
          {cartItemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />

      {/* Add to Cart Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Added to Cart!
            </Text>
            
            {selectedProduct && (
              <View style={styles.modalProductInfo}>
                <Text style={styles.modalProductName}>{selectedProduct.productName}</Text>
                <Text style={styles.modalProductPrice}>${selectedProduct.productPrice.toFixed(2)}</Text>
                <StarRating rating={selectedProduct.ratings} />
              </View>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                testID="continue-shopping"
                style={[styles.modalButton, styles.continueButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.continueButtonText}>Continue Shopping</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                testID="go-to-cart"
                style={[styles.modalButton, styles.modalCartButton]}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Cart');
                }}
              >
                <Text style={styles.modalCartButtonText}>Go to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutralBase,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerText: {
    color: colors.neutralBase,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartButton: {
    padding: 5,
    position: 'relative',
  },
  cartButtonText: {
    fontSize: 24,
    color: colors.neutralBase,
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.neutralBase,
    fontSize: 12,
    fontWeight: 'bold',
  },
  productList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    backgroundColor: colors.neutralBase,
    borderRadius: 8,
    margin: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.secondary,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: colors.neutralBase,
    fontSize: 12,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.neutralBase,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: colors.textDark,
  },
  modalProductInfo: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.neutralLight,
    borderRadius: 8,
  },
  modalProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 5,
  },
  modalProductPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  continueButton: {
    backgroundColor: colors.secondary,
  },
  modalCartButton: {
    backgroundColor: colors.primary,
  },
  continueButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  modalCartButtonText: {
    color: colors.neutralBase,
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
