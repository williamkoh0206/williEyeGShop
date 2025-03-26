import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import colors from '../constants/colors';
import { useCart } from '../context/CartContext';

// Cart item component to display in order summary
const CartSummaryItem = ({ item }) => {
  const itemTotal = item.productPrice * item.quantity;
  
  return (
    <View style={styles.cartSummaryItem}>
      <Image source={item.productPhoto} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{item.productName}</Text>
        <View style={styles.itemDetails}>
          <Text style={styles.itemQuantity}>{item.quantity} x ${item.productPrice.toFixed(2)}</Text>
          <Text style={styles.itemTotal}>${itemTotal.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const CheckoutScreen = ({ navigation }) => {
  const { cartItems, getCartTotal, clearCart, getItemCount } = useCart();
  const [name, setName] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  
  const totalAmount = getCartTotal();
  const itemCount = getItemCount();
  
  // Monitor keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  
  const handlePayment = () => {
    // Dismiss keyboard
    Keyboard.dismiss();
    
    // Validate input fields
    if (!name.trim() || !creditCardNumber.trim()) {
      Alert.alert(
        'Payment Failed',
        'Sorry, we are not able to proceed. Please try again.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Simulate payment process
    setIsLoading(true);
    
    // Simulate 3-second process time
    setTimeout(() => {
      setIsLoading(false);
      setSuccessModalVisible(true);
    }, 3000);
  };
  
  const handleSuccess = () => {
    setSuccessModalVisible(false);
    clearCart(); // Clear the cart after successful payment
    navigation.navigate('ProductList'); // Navigate back to home screen
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
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* For Android, use a regular View with TouchableWithoutFeedback */}
      {Platform.OS === 'android' ? (
        <View style={styles.keyboardAvoidingContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView 
              style={styles.content}
              contentContainerStyle={[
                styles.scrollContentContainer,
                keyboardVisible && styles.keyboardAwareContent
              ]}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
            >
              {renderContent()}
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        // For iOS, use KeyboardAvoidingView with padding behavior
        <KeyboardAvoidingView 
          behavior="padding"
          style={styles.keyboardAvoidingContainer}
          keyboardVerticalOffset={64}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView 
              style={styles.content}
              contentContainerStyle={styles.scrollContentContainer}
              showsVerticalScrollIndicator={false}
            >
              {renderContent()}
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
      
      {/* Payment Button */}
      <View style={[
        styles.bottomContainer,
        Platform.OS === 'android' && keyboardVisible && { display: 'none' }
      ]}>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            (cartItems.length === 0 || isLoading) ? styles.disabledButton : null
          ]}
          onPress={handlePayment}
          disabled={isLoading || cartItems.length === 0}
          testID="confirm-payment-button"
        >
          {isLoading ? (
            <ActivityIndicator color={colors.neutralBase} size="small" />
          ) : (
            <Text style={styles.paymentButtonText}>
              {cartItems.length === 0 ? 'Cart Empty' : 'Confirm Payment'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={handleSuccess}
        testID="success-modal"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Payment Successful</Text>
            <Text style={styles.modalText} testID="success-message">
              Congrats, your payment has been successful!
            </Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleSuccess}
              testID="success-confirm-button"
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
  
  // Helper function to render content (extracted to avoid repetition)
  function renderContent() {
    return (
      <>
        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          {/* Display cart items */}
          {cartItems.map(item => (
            <CartSummaryItem key={item.id} item={item} />
          ))}
          
          <View style={styles.divider} />
          
          {/* Total section */}
          <View style={styles.summaryItemTotal}>
            <Text style={styles.totalText}>Total ({itemCount} {itemCount === 1 ? 'item' : 'items'})</Text>
            <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
        
        {/* Payment Details */}
        <View style={styles.paymentContainer} testID="checkout-form">
          <Text style={styles.sectionTitle}>Payment Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              returnKeyType="next"
              blurOnSubmit={false}
              testID="name-input"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Credit Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your card number"
              value={creditCardNumber}
              onChangeText={setCreditCardNumber}
              keyboardType={__DEV__ ? "default" : "number-pad"}
              maxLength={16}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              testID="credit-card-input"
            />
          </View>
          
          {/* Extra padding at bottom for Android keyboard */}
          {/* {Platform.OS === 'android' && (
            <View style={styles.androidBottomPadding} />
          )} */}
        </View>
      </>
    );
  }
};

const { height } = Dimensions.get('window');

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
  placeholder: {
    width: 40,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  keyboardAwareContent: {
    paddingBottom: height * 0.4, // Add significant padding when keyboard is visible on Android
  },
  summaryContainer: {
    backgroundColor: colors.neutralLight,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cartSummaryItem: {
    flexDirection: 'row',
    padding: 8,
    marginBottom: 8,
    backgroundColor: colors.neutralBase,
    borderRadius: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 4,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemQuantity: {
    fontSize: 13,
    color: colors.textDark,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  paymentContainer: {
    backgroundColor: colors.neutralLight,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryItemTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: colors.textDark,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.secondary,
    marginVertical: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.neutralBase,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  androidBottomPadding: {
    height: 100, // Extra padding at the bottom of the form for Android
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: colors.neutralBase,
    borderTopWidth: 1,
    borderTopColor: colors.neutralLight,
  },
  paymentButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.secondary,
    opacity: 0.7,
  },
  paymentButtonText: {
    color: colors.neutralBase,
    fontSize: 18,
    fontWeight: 'bold',
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
    color: colors.textDark,
  },
  modalText: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: colors.neutralBase,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen; 