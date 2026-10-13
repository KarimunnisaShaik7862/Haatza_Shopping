import { Address, Order, ReturnRequest } from '../../../types';
import { mockProducts } from './products';

export const mockDefaultAddresses: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    altPhone: '+91 98111 22334',
    pincode: '400001',
    addressLine1: 'Flat 402, Sea Green Apartments',
    addressLine2: 'Marine Drive, Fort',
    landmark: 'Opposite Oval Maidan',
    city: 'Mumbai',
    state: 'Maharashtra',
    addressType: 'home',
    isDefault: true,
  },
  {
    id: 'addr-2',
    fullName: 'Rahul Sharma (Tech Office)',
    phone: '+91 98765 43210',
    pincode: '400051',
    addressLine1: 'Tower B, 7th Floor, BKC One',
    addressLine2: 'Bandra Kurla Complex',
    landmark: 'Near Diamond Bourse',
    city: 'Mumbai',
    state: 'Maharashtra',
    addressType: 'work',
    isDefault: false,
  },
];

export const mockInitialOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'HTZ-839201-4421',
    date: '2026-10-06T11:20:00Z',
    items: [
      {
        product: mockProducts[3], // SonicPro ANC Headphones
        selectedVariant: mockProducts[3].variants?.[0],
        quantity: 1,
        price: 3499,
      },
      {
        product: mockProducts[5], // Derma Co Serum
        quantity: 2,
        price: 499,
      },
    ],
    subtotal: 4497,
    discount: 200,
    deliveryCharge: 0,
    total: 4297,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    shippingAddress: mockDefaultAddresses[0],
    status: 'shipped',
    estimatedDelivery: '2026-10-10',
    trackingSteps: [
      {
        title: 'Order Confirmed',
        date: '06 Oct 2026, 11:25 AM',
        description: 'Your order was verified and payment of ₹4,297 was received via UPI.',
        completed: true,
      },
      {
        title: 'Packed & Invoiced',
        date: '07 Oct 2026, 03:40 PM',
        description: 'Item securely boxed at Haatza Fulfillment Hub, Bhiwandi.',
        completed: true,
      },
      {
        title: 'In Transit / Dispatched',
        date: '08 Oct 2026, 09:15 AM',
        description: 'Carrier: Blue Dart Express (AWB #839210923). Departed transit facility.',
        completed: true,
        current: true,
      },
      {
        title: 'Out for Delivery',
        date: 'Expected 10 Oct 2026',
        description: 'Will be out for delivery with our executive soon.',
        completed: false,
      },
      {
        title: 'Delivered',
        date: 'Expected 10 Oct 2026',
        description: 'Package handed over with OTP verification.',
        completed: false,
      },
    ],
  },
  {
    id: 'ord-102',
    orderNumber: 'HTZ-749102-1205',
    date: '2026-09-28T16:45:00Z',
    items: [
      {
        product: mockProducts[0], // Linen Shirt
        selectedVariant: mockProducts[0].variants?.[1],
        quantity: 1,
        price: 1899,
      },
    ],
    subtotal: 1899,
    discount: 100,
    deliveryCharge: 0,
    total: 1799,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    shippingAddress: mockDefaultAddresses[0],
    status: 'delivered',
    estimatedDelivery: '2026-09-30',
    trackingSteps: [
      {
        title: 'Order Confirmed',
        date: '28 Sep 2026, 04:50 PM',
        description: 'Order confirmed and verified.',
        completed: true,
      },
      {
        title: 'Shipped',
        date: '29 Sep 2026, 10:00 AM',
        description: 'Handed to courier delivery partner.',
        completed: true,
      },
      {
        title: 'Delivered',
        date: '30 Sep 2026, 02:15 PM',
        description: 'Package safely delivered to recipient.',
        completed: true,
        current: true,
      },
    ],
  },
];

export const mockReturnRequests: ReturnRequest[] = [
  {
    id: 'ret-901',
    orderId: 'ord-102',
    orderNumber: 'HTZ-749102-1205',
    productId: 'prod-fash-1',
    productName: 'Pure Linen Mandarin Collar Slim Fit Shirt',
    productImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80',
    reason: 'Size is slightly loose around the shoulders',
    comment: 'Need replacement in Size S (38)',
    status: 'approved',
    requestedAt: '2026-10-02T10:00:00Z',
    refundAmount: 1799,
    resolutionType: 'replacement',
  },
];
