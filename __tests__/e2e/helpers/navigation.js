// Helper functions for navigation
async function navigateToProductDetail(productId) {
    await element(by.id(`product-item-${productId}`)).tap();
    await waitFor(element(by.id('product-detail-container')))
      .toBeVisible()
      .withTimeout(2000);
  }
  
  async function navigateToCart() {
    // First check if we have a cart icon in the header
    try {
      await element(by.id('cart-icon')).tap();
    } catch (e) {
      // Fallback: go back to product list and use the cart button there
      await device.pressBack();
      await element(by.id('cart-icon')).tap();
    }
    
    await waitFor(element(by.id('cart-items-list')))
      .toBeVisible()
      .withTimeout(2000);
  }
  
  module.exports = {
    navigateToProductDetail,
    navigateToCart
  };