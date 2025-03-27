import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import colors from '../constants/colors';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';

const ProductDetailScreen = ({ route, navigation }) => {
  // Get the product from route params
  const { product } = route.params;
  
  // State for quantity
  const [quantity, setQuantity] = useState(1);
  
  // Access cart context
  const { addToCart, getItemCount } = useCart();
  const cartItemCount = getItemCount();
  
  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    // const quatityNum = null;
    // console.log(quatityNum);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert(
      'Added to Cart',
      `${quantity} ${product.productName} added to your cart.`,
      [
        {
          text: 'Continue Shopping',
          onPress: () => console.log('Continue shopping'),
          style: 'cancel',
        },
        {
          text: 'Go to Cart',
          onPress: () => navigation.navigate('Cart'),
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity
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
      
      <ScrollView 
        testID="product-detail-container"
        style={styles.scrollView}>
        {/* Product Image */}
        <Image
          source={product.productPhoto}
          style={styles.productImage}
          resizeMode="cover"
        />
        
        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text testID="product-name" style={styles.productName}>{product.productName}</Text>
          <Text testID="product-price" style={styles.productPrice}>${product.productPrice.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <StarRating rating={product.ratings} />
          </View>
        </View>
        
        {/* Product Description */}
        <View style={styles.descriptionContainer}>
          <Text testID="product-description" style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>
        
        {/* Quantity Selector */}
        <View 
          testID="quantity-container"
          style={styles.quantityContainer}
        >
          <Text style={styles.quantityTitle}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              testID="decrease-quantity"
              style={styles.quantityButton}
              onPress={decreaseQuantity}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text testID="quantity-display" style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              testID="increase-quantity"
              style={styles.quantityButton}
              onPress={increaseQuantity}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Total Price */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalTitle}>Total</Text>
          <Text style={styles.totalPrice}>
            ${(product.productPrice * quantity).toFixed(2)}
          </Text>
        </View>
      </ScrollView>
      
      {/* Add to Cart Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          testID="add-to-cart-button"
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutralBase,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: colors.primary,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.neutralBase,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.neutralBase,
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartButtonText: {
    fontSize: 20,
    color: colors.neutralBase,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
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
  scrollView: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    backgroundColor: colors.secondary,
  },
  productInfo: {
    padding: 16,
    backgroundColor: colors.neutralBase,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.textDark,
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: colors.neutralLight,
    marginTop: 8,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textDark,
  },
  quantityContainer: {
    padding: 16,
    backgroundColor: colors.neutralBase,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  quantityText: {
    width: 50,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 16,
    backgroundColor: colors.neutralLight,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: colors.neutralBase,
    borderTopWidth: 1,
    borderTopColor: colors.neutralLight,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: colors.neutralBase,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen; 