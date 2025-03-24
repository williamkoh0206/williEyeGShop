## UI/UX Design
- **Philosophy**: Create a visually appealing, intuitive, and engaging experience for eyeglass enthusiasts aged 20-40, emphasizing ease of use and aesthetic alignment with modern trends.

- **Color Palette**:
- **Primary color: **#B08968
- **Secondary color: **#EDE0D4
- Neutral Base**: **#FFFFFF (White)** and **#F5F5F5 (Light Gray)**
- **Text Colors**: **#333333 (Dark Gray)** and **#000000 (Black)**
- - **Error/Warning**: **#FF4500 (Orange Red)**


## Project Scope
- **Screens**: Four screens with specific functionalities.
  1. **ProductListScreen (Home Screen)**  
     - **Functionalities**: Display scrollable product list (photo, name, price), "Add to Cart" button with popup ("Continue to Shop" or "Go to Cart"), navigation to `ProductDetailScreen` on product tap.
  2. **ProductDetailScreen**  
     - **Functionalities**: Show product details (name, price, mock description), "+/-" counter for quantity, "Add to Cart" to update state, navigation ("Back" to `ProductListScreen`, "Go to Cart" to `CartScreen`).
  3. **CartScreen**  
     - **Functionalities**: List cart items (name, price, quantity, total), "Remove" button with popup, "Clear Cart" button, "Checkout" button, total price display, navigation ("Back" to `ProductListScreen`).
  4. **CheckoutScreen**  
     - **Functionalities**: Input fields (Name, Credit Card Number), "Confirm Payment" button with loading (3s) and success/failure prompts, navigation (redirect to `ProductListScreen` after payment outcome).
     - successful case: Name, Credit Card Number input fields are filled, show the successful prompt: "Message: Congrats, your payment has been successful!" with a "Confirm" button to close the popup and direct to home screen
    
     - unsuccessful prompt: fields are empty and "Confirm Payment" is pressed, unsuccessful prompt: "Message: Sorry, we are not able to proceed. Please try again. Stay in the checkout page
### Dummy Product data structure
-   id: number;
- productName: string;
-   productPrice: number;
- description: string;
- ratings: number;
- productPhoto: string;
- **Test Cases**:
  - **Unit Tests**:
    - `calculateTotal`: Verify sum of item totals.
  - **Integration Tests**:
    - `ProductDetailScreen`: UI screen display and "+/-" state updates.
    - `HomeScreen`: Test home and cart tabs navigation
  - **E2E Tests**:
    - Successful Checkout: Add items, checkout, fill fields, confirm, verify success.
    - Failed Checkout: Add items, checkout, leave fields empty, confirm, verify failure.