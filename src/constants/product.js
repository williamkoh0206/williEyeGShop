// Import local images
import blackRimmedGlassesImg from '../image/blackRimmedGlassesImg.png';
import rimlessGlasses from '../image/rimlessImg.png';
import semiRimlessGlasses from '../image/semiRimlessImg.png';
import lowBridgeGlasses from '../image/lowBridgeImg.png';
import wireGlasses from '../image/wireGlassesImg.png';
import luxurySunglasses from '../image/luxurySunGlassesImg.png';

// src/data/products.js
const products = [
  {
    id: 1,
    productName: "Black Full-rimmed glasses",
    productPrice: 149.99,
    description: "Sleek black full-rimmed glasses that combine durability and style, perfect for any occasion. A bold choice for those seeking a classic yet modern look.",
    ratings: 3.2,
    productPhoto: blackRimmedGlassesImg,
  },
  {
    id: 2,
    productName: "Rimless glasses",
    productPrice: 129.99,
    description: "Embrace minimalism with these rimless glasses. Lightweight and stylish, they provide a seamless look while offering maximum comfort and versatility for everyday wear.",
    ratings: 4.2,
    productPhoto: rimlessGlasses,
  },
  {
    id: 3,
    productName: "Semi-rimless Glasses",
    productPrice: 119.99,
    description: "These semi-rimless glasses blend sophistication and practicality. The unique design offers a contemporary edge, with a lightweight feel that ensures all-day comfort.",
    ratings: 2.6,
    productPhoto: semiRimlessGlasses,
  },
  {
    id: 4,
    productName: "Low Bridge Glasses",
    productPrice: 189.99,
    description: "Designed for comfort, these low bridge glasses fit securely and flatter diverse face shapes. Enjoy a stylish look without compromising on comfort or functionality.",
    ratings: 3.6,
    productPhoto: lowBridgeGlasses,
  },
  {
    id: 5,
    productName: "Wire Glasses",
    productPrice: 159.99,
    description: "Timeless wire glasses exude elegance and simplicity. Their lightweight structure makes them ideal for daily use, providing a chic and understated accessory for any wardrobe.",
    ratings: 4.8,
    productPhoto: wireGlasses,
  },
  {
    id: 6,
    productName: "Luxury Sunglasses",
    productPrice: 139.99,
    description: "Discover the allure of exclusivity with these luxury sunglasses. Each pair is a masterpiece, blending innovative design with superior craftsmanship for a standout accessory.",
    ratings: 4.0,
    productPhoto: luxurySunglasses,
  }
];

export default products;