describe('Checkout Flow', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('should complete a successful checkout', async () => {
      // Step 1: Select a product from the list
      await waitFor(element(by.id('product-item-1')))
        .toBeVisible()
        .withTimeout(2000);
      await element(by.id('product-item-1')).tap();
  
      // Step 2: On product details screen, wait for the screen to load
      await waitFor(element(by.id('product-detail-container')))
        .toBeVisible()
        .withTimeout(2000);
      
      // Scroll to the quantity container
      await element(by.id('product-detail-container')).scroll(500, 'down');
      
      // Wait for quantity container to be visible after scrolling
      await waitFor(element(by.id('quantity-container')))
        .toBeVisible()
        .withTimeout(2000);
      
      // Increase quantity to 2
      await element(by.id('increase-quantity')).tap();
      await expect(element(by.id('quantity-display'))).toHaveText('2');
      
      // Add to cart
      await element(by.id('add-to-cart-button')).tap();
      
      // Go to cart from alert dialog
      await element(by.text('Go to Cart')).tap();
  
      // Step 3: Verify cart and proceed to checkout
      await waitFor(element(by.id('cart-items-list')))
        .toBeVisible()
        .withTimeout(2000);
      
      await expect(element(by.id('cart-item-1'))).toBeVisible();
      await expect(element(by.id('cart-item-quantity-1'))).toHaveText('Qty: 2');
      
      // Go to checkout
      await element(by.id('checkout-button')).tap();
  
      // Step 4: Fill checkout form with improved keyboard handling
      await waitFor(element(by.id('name-input')))
        .toBeVisible()
        .withTimeout(2000);
      
      // Fill the name input
      await element(by.id('name-input')).typeText('John Doe');
      
      // Tap return key to dismiss keyboard after name input
      await element(by.id('name-input')).tapReturnKey();
      
      // Tap on the screen to ensure focus is cleared (helps on Android)
      await element(by.text('Payment Details')).tap();
      
      // Small pause to let animations complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // // Tap on credit card input to ensure focus
      // await element(by.id('credit-card-input')).tap();
      
      // Now try to find and interact with the credit card input
      await element(by.id('credit-card-input')).scroll(500, 'down');
      // Try a different approach for typing credit card number
      if (device.getPlatform() === 'android') {
        // For Android, type normally on the element
        await element(by.id('credit-card-input')).typeText('4242424242424242');
      }
      
      // Dismiss keyboard again to make payment button accessible
      await element(by.id('credit-card-input')).tapReturnKey();
      
      // Small pause to let animations complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Confirm payment
      await element(by.id('confirm-payment-button')).tap();
      
      console.log('Payment button tapped, waiting for processing...');
      
      // First wait a small amount to let the payment processing start
      await new Promise(resolve => setTimeout(resolve, 6000));
      
      try {
        // Try to wait for the modal first (it's the container)
        // Then verify the success message text
        await expect(element(by.id('success-message')))
          .toHaveText('Congrats, your payment has been successful!');
          
        console.log('Success message verified, tapping confirm button...');
        
        // Confirm and return to home
        await element(by.id('success-confirm-button')).tap();
        
      } catch (error) {
        console.error('Error during success verification:', error);
        // Take a screenshot if possible to help debug
        try {
          await device.takeScreenshot('checkout-error-' + new Date().getTime());
        } catch (e) {
          console.log('Could not take screenshot', e);
        }
        throw error;
      }
      
      // Verify we're back at product list
      await waitFor(element(by.id('product-item-1')))
        .toBeVisible()
        .withTimeout(2000);
    });
  });