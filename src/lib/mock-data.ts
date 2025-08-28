import { ProductType } from '@/types/product';

// Mock products data
export const MOCK_PRODUCTS: ProductType[] = [
  {
    id: 1,
    name: 'Legendary Chicken Ramen',
    slug: 'legendary-chicken-ramen',
    category: 'Ramen',
    price: 12.99,
    originalPrice: 14.99,
    discount: 13,
    image: '/images/menu/Legendary-Chicken-Ramen.jpg',
    description: 'Our signature ramen with tender chicken, soft-boiled egg, and rich broth.',
    features: ['Spicy option available', 'Gluten-free noodles option', 'Extra toppings available'],
    sku: 'RAMEN-001',
    inStock: true,
    tags: ['bestseller', 'spicy', 'chicken'],
    categories: ['Ramen', 'Main Course', 'Hot Dishes'],
    galleryImages: [
      '/images/menu/Legendary-Chicken-Ramen.jpg',
      '/images/menu/ramen-gallery-1.jpg',
      '/images/menu/ramen-gallery-2.jpg'
    ],
  },
  {
    id: 2,
    name: 'Vegetable Gyoza',
    slug: 'vegetable-gyoza',
    category: 'Appetizers',
    price: 7.99,
    originalPrice: 9.99,
    discount: 20,
    image: '/images/menu/Vegetable-Gyoza.jpg',
    description: 'Pan-fried dumplings filled with vegetables and served with dipping sauce.',
    features: ['Vegan', '6 pieces per order', 'Homemade dipping sauce'],
    sku: 'APP-001',
    inStock: true,
    tags: ['vegetarian', 'appetizer'],
    categories: ['Appetizers', 'Vegetarian'],
    galleryImages: [
      '/images/menu/Vegetable-Gyoza.jpg',
      '/images/menu/gyoza-gallery-1.jpg'
    ],
  },
  {
    id: 3,
    name: 'Matcha Green Tea Ice Cream',
    slug: 'matcha-green-tea-ice-cream',
    category: 'Desserts',
    price: 5.99,
    originalPrice: 5.99,
    discount: 0,
    image: '/images/menu/Matcha-Ice-Cream.jpg',
    description: 'Premium matcha green tea ice cream, made in-house daily.',
    features: ['Homemade daily', 'Authentic matcha powder', 'Optional red bean topping'],
    sku: 'DST-001',
    inStock: true,
    tags: ['dessert', 'cold'],
    categories: ['Desserts', 'Ice Cream'],
    galleryImages: [
      '/images/menu/Matcha-Ice-Cream.jpg'
    ],
  }
];