import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';

// Eager load primary landing page for instant first paint
import { HaatzaHomePage } from '../pages/home/HaatzaHomePage';

// Lazy load secondary routes to prevent huge initial bundle parse and memory bloat
const LiteHomePage = lazy(() => import('../pages/lite/LiteHomePage').then(m => ({ default: m.LiteHomePage })));
const NestHomePage = lazy(() => import('../pages/nest/NestHomePage').then(m => ({ default: m.NestHomePage })));
const ProductListingPage = lazy(() => import('../pages/category/ProductListingPage').then(m => ({ default: m.ProductListingPage })));
const SearchPage = lazy(() => import('../pages/search/SearchPage').then(m => ({ default: m.SearchPage })));
const ProductDetailPage = lazy(() => import('../pages/product/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import('../pages/cart/CartPage').then(m => ({ default: m.CartPage })));
const WishlistPage = lazy(() => import('../pages/wishlist/WishlistPage').then(m => ({ default: m.WishlistPage })));
const CheckoutPage = lazy(() => import('../pages/checkout/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() => import('../pages/orders/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage })));
const OrdersPage = lazy(() => import('../pages/orders/OrdersPage').then(m => ({ default: m.OrdersPage })));
const OrderTrackingPage = lazy(() => import('../pages/orders/OrderTrackingPage').then(m => ({ default: m.OrderTrackingPage })));
const ReturnsRefundsPage = lazy(() => import('../pages/returns/ReturnsRefundsPage').then(m => ({ default: m.ReturnsRefundsPage })));
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const AccountDashboardPage = lazy(() => import('../pages/account/AccountDashboardPage').then(m => ({ default: m.AccountDashboardPage })));
const SavedAddressesPage = lazy(() => import('../pages/account/SavedAddressesPage').then(m => ({ default: m.SavedAddressesPage })));
const HelpCenterPage = lazy(() => import('../pages/support/HelpCenterPage').then(m => ({ default: m.HelpCenterPage })));
const ContactUsPage = lazy(() => import('../pages/support/ContactUsPage').then(m => ({ default: m.ContactUsPage })));
const FaqPage = lazy(() => import('../pages/support/FaqPage').then(m => ({ default: m.FaqPage })));
const AboutUsPage = lazy(() => import('../pages/support/AboutUsPage').then(m => ({ default: m.AboutUsPage })));
const PolicyPage = lazy(() => import('../pages/policies/PolicyPage').then(m => ({ default: m.PolicyPage })));
const NotFoundPage = lazy(() => import('../pages/not-found/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Destination Routes */}
        <Route path="/" element={<Navigate to="/haatza" replace />} />
        <Route path="/haatza" element={<HaatzaHomePage />} />
        <Route path="/lite" element={<LiteHomePage />} />
        <Route path="/nest" element={<NestHomePage />} />
        {/* Backward compatibility redirects */}
        <Route path="/light" element={<Navigate to="/lite" replace />} />
        <Route path="/next" element={<Navigate to="/nest" replace />} />

        {/* Catalog & Search */}
        <Route path="/category/:slug" element={<ProductListingPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/under-49" element={<Navigate to="/category/under-49" replace />} />
        <Route path="/deals" element={<Navigate to="/category/deals" replace />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:idOrSlug" element={<ProductDetailPage />} />

        {/* Cart & Wishlist */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Checkout & Orders */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId/track" element={<OrderTrackingPage />} />
        <Route path="/returns" element={<ReturnsRefundsPage />} />

        {/* Auth & Account */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/account" element={<AccountDashboardPage />} />
        <Route path="/profile" element={<AccountDashboardPage />} />
        <Route path="/my-profile" element={<AccountDashboardPage />} />
        <Route path="/my-account" element={<Navigate to="/account" replace />} />
        <Route path="/account/addresses" element={<SavedAddressesPage />} />

        {/* Support & Policies */}
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/privacy" element={<PolicyPage />} />
        <Route path="/terms" element={<PolicyPage />} />
        <Route path="/shipping-policy" element={<PolicyPage />} />
        <Route path="/refund-policy" element={<PolicyPage />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
