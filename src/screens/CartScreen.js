import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList,
  Image,
  Alert,
  Modal
} from 'react-native';
import colors from '../constants/colors';
import { useCart } from '../context/CartContext';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const itemTotal = item.productPrice * item.quantity;

  return (
    <View testID={`cart-item-${item.id}`} style={styles.cartItem}>
      <Image source={item.productPhoto} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text testID={`cart-item-name-${item.id}`} style={styles.itemName} numberOfLines={1}>
          {item.productName}
        </Text>
        <Text testID={`cart-item-price-${item.id}`} style={styles.itemPrice}>
          ${item.productPrice.toFixed(2)}
        </Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            testID={`decrease-item-${item.id}`}
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Text style={[
              styles.quantityButtonText, 
              item.quantity <= 1 ? styles.disabledText : null
            ]}>-</Text>
          </TouchableOpacity>
          
          <Text testID={`cart-item-quantity-${item.id}`} style={styles.quantityText}>
            Qty: {item.quantity}
          </Text>
          
          <TouchableOpacity 
            testID={`increase-item-${item.id}`}
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemActions}>
        <Text testID={`cart-item-total-${item.id}`} style={styles.itemTotal}>
          ${itemTotal.toFixed(2)}
        </Text>
        <TouchableOpacity 
          testID={`remove-item-${item.id}`}
          style={styles.removeButton}
          onPress={() => onRemove(item.id, item.productName)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CartScreen = ({ navigation }) => {
  const { 
    cartItems, 
    getCartTotal, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    getItemCount 
  } = useCart();
  
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [clearModalVisible, setClearModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  
  const itemCount = getItemCount();
  const totalAmount = getCartTotal();
  
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const confirmRemoveItem = (productId, productName) => {
    setItemToRemove({ id: productId, name: productName });
    setRemoveModalVisible(true);
  };
  
  const handleRemoveItem = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.id);
      setRemoveModalVisible(false);
      setItemToRemove(null);
    }
  };
  
  const confirmClearCart = () => {
    setClearModalVisible(true);
  };
  
  const handleClearCart = () => {
    clearCart();
    setClearModalVisible(false);
  };
  
  const handleCheckout = () => {
    // Navigate to checkout screen
    navigation.navigate('Checkout');
  };
  
  return (
    <SafeAreaView testID="cart-screen" style={styles.container}>
      {/* Header */}
      <View testID="cart-header" style={styles.header}>
        <TouchableOpacity
          testID="back-button"
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Cart Content */}
      <View testID="cart-content" style={styles.content}>
        {cartItems.length === 0 ? (
          <View testID="empty-cart" style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <TouchableOpacity
              testID="shop-now-button"
              style={styles.shopButton}
              onPress={() => navigation.navigate('ProductList')}
            >
              <Text style={styles.shopButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList
              testID="cart-items-list"
              data={cartItems}
              renderItem={({ item }) => (
                <CartItem 
                  item={item} 
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={confirmRemoveItem}
                />
              )}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.cartList}
            />
            
            {/* Summary Section */}
            <View testID="cart-summary" style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Total Items:</Text>
                <Text testID="cart-total-items" style={styles.summaryValue}>{itemCount}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTextBold}>Total:</Text>
                <Text testID="cart-total" style={styles.summaryTotal}>${totalAmount.toFixed(2)}</Text>
              </View>
            </View>
            
            {/* Action Buttons */}
            <View testID="cart-actions" style={styles.actionButtons}>
              <TouchableOpacity 
                testID="clear-cart-button"
                style={styles.clearButton}
                onPress={confirmClearCart}
              >
                <Text style={styles.clearButtonText}>Clear Cart</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                testID="checkout-button"
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
                <View style={styles.checkoutBadge}>
                  <Text style={styles.checkoutBadgeText}>{itemCount}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      
      {/* Remove Item Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={removeModalVisible}
        onRequestClose={() => setRemoveModalVisible(false)}
      >
        <View testID="remove-modal" style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Remove Item</Text>
            <Text testID="remove-modal-text" style={styles.modalText}>
              Are you sure you want to remove {itemToRemove?.name} from your cart?
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                testID="modal-cancel-button"
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setRemoveModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                testID="modal-remove-button"
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleRemoveItem}
              >
                <Text style={styles.confirmButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Clear Cart Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={clearModalVisible}
        onRequestClose={() => setClearModalVisible(false)}
      >
        <View testID="clear-modal" style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clear Cart</Text>
            <Text testID="clear-modal-text" style={styles.modalText}>
              Are you sure you want to clear all items from your cart?
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                testID="modal-cancel-clear-button"
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setClearModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                testID="modal-confirm-clear-button"
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleClearCart}
              >
                <Text style={styles.confirmButtonText}>Clear</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: colors.textDark,
    marginBottom: 16,
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  shopButtonText: {
    color: colors.neutralBase,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartList: {
    paddingBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.neutralLight,
    borderRadius: 10,
    marginBottom: 12,
    padding: 12,
    elevation: 1,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.secondary,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: colors.secondary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  disabledText: {
    color: colors.neutralLight,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textDark,
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  removeButton: {
    padding: 6,
  },
  removeButtonText: {
    fontSize: 14,
    color: colors.error,
    fontWeight: '500',
  },
  summaryContainer: {
    backgroundColor: colors.neutralLight,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: colors.textDark,
  },
  summaryTextBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  summaryValue: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '500',
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clearButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
    position: 'relative',
  },
  checkoutButtonText: {
    color: colors.neutralBase,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.error,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  checkoutBadgeText: {
    color: colors.neutralBase,
    fontSize: 12,
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: colors.secondary,
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButtonText: {
    color: colors.neutralBase,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen; 