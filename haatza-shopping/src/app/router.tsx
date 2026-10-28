import React, { lazy } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { HaatzaShoppingLayout } from '../layouts/HaatzaShoppingLayout';

// Redirection helpers for multi-level fashion aliases
const MenAliasRedirect: React.FC = () => {
  const { sectionSlug, itemSlug } = useParams<{ sectionSlug?: string; itemSlug?: string }>();
  if (sectionSlug && itemSlug) {
    return <Navigate to={`/category/men-fashion/${sectionSlug}/${itemSlug}`} replace />;
  }
  if (sectionSlug) {
    return <Navigate to={`/category/men-fashion/${sectionSlug}`} replace />;
  }
  return <Navigate to="/category/men-fashion" replace />;
};

const WomenAliasRedirect: React.FC = () => {
  const { sectionSlug, itemSlug } = useParams<{ sectionSlug?: string; itemSlug?: string }>();
  if (sectionSlug && itemSlug) {
    return <Navigate to={`/category/women-fashion/${sectionSlug}/${itemSlug}`} replace />;
  }
  if (sectionSlug) {
    return <Navigate to={`/category/women-fashion/${sectionSlug}`} replace />;
  }
  return <Navigate to="/category/women-fashion" replace />;
};

// Primary landing page
import { HomePage } from '../pages/home/HomePage';

// Lazy load secondary routes for performance
const ProductListingPage = lazy(() => import('../pages/category/ProductListingPage').then(m => ({ default: m.ProductListingPage })));
const SearchPage = lazy(() => import('../pages/search/SearchPage').then(m => ({ default: m.SearchPage })));
const ProductDetailsPage = lazy(() => import('../pages/product-details/ProductDetailsPage').then(m => ({ default: m.ProductDetailsPage })));
const DealsOfTheDayPage = lazy(() => import('../pages/deals/DealsOfTheDayPage').then(m => ({ default: m.DealsOfTheDayPage })));
const CartPage = lazy(() => import('../pages/cart/CartPage').then(m => ({ default: m.CartPage })));
const WishlistPage = lazy(() => import('../pages/wishlist/WishlistPage').then(m => ({ default: m.WishlistPage })));
const CheckoutPage = lazy(() => import('../pages/checkout/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() => import('../pages/orders/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage })));
const OrdersPage = lazy(() => import('../pages/orders/OrdersPage').then(m => ({ default: m.OrdersPage })));
const OrderTrackingPage = lazy(() => import('../pages/orders/OrderTrackingPage').then(m => ({ default: m.OrderTrackingPage })));
const ReturnsRefundsPage = lazy(() => import('../pages/orders/ReturnsRefundsPage').then(m => ({ default: m.ReturnsRefundsPage })));
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
const ProductFullscreenImageViewerPage = lazy(() => import('../pages/product-details/ProductFullscreenImageViewerPage').then(m => ({ default: m.ProductFullscreenImageViewerPage })));

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Standalone Fullscreen Product Image Viewer (Pure White Background) */}
      <Route path="/product/:idOrSlug/fullscreen" element={<ProductFullscreenImageViewerPage />} />
      <Route path="/product/:idOrSlug/gallery" element={<ProductFullscreenImageViewerPage />} />

      <Route element={<HaatzaShoppingLayout />}>
        {/* Marketplace Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/haatza" element={<Navigate to="/" replace />} />

        {/* Catalog & Search */}
        <Route path="/category/:slug" element={<ProductListingPage />} />
        <Route path="/category/:slug/:sectionSlug" element={<ProductListingPage />} />
        <Route path="/category/:slug/:sectionSlug/:itemSlug" element={<ProductListingPage />} />
        <Route path="/categories/:slug" element={<ProductListingPage />} />
        <Route path="/categories/:slug/:sectionSlug" element={<ProductListingPage />} />
        <Route path="/categories/:slug/:sectionSlug/:itemSlug" element={<ProductListingPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/under-49" element={<Navigate to="/category/under-49" replace />} />

        {/* Fashion Multi-Level Aliases */}
        <Route path="/men" element={<MenAliasRedirect />} />
        <Route path="/men/:sectionSlug" element={<MenAliasRedirect />} />
        <Route path="/men/:sectionSlug/:itemSlug" element={<MenAliasRedirect />} />
        <Route path="/men-fashion" element={<MenAliasRedirect />} />
        <Route path="/men-fashion/:sectionSlug" element={<MenAliasRedirect />} />
        <Route path="/men-fashion/:sectionSlug/:itemSlug" element={<MenAliasRedirect />} />

        <Route path="/women" element={<WomenAliasRedirect />} />
        <Route path="/women/:sectionSlug" element={<WomenAliasRedirect />} />
        <Route path="/women/:sectionSlug/:itemSlug" element={<WomenAliasRedirect />} />
        <Route path="/women-fashion" element={<WomenAliasRedirect />} />
        <Route path="/women-fashion/:sectionSlug" element={<WomenAliasRedirect />} />
        <Route path="/women-fashion/:sectionSlug/:itemSlug" element={<WomenAliasRedirect />} />

        <Route path="/fashion" element={<MenAliasRedirect />} />
        <Route path="/fashion/:sectionSlug" element={<MenAliasRedirect />} />
        <Route path="/fashion/:sectionSlug/:itemSlug" element={<MenAliasRedirect />} />
        <Route path="/deals-of-the-day" element={<DealsOfTheDayPage />} />
        <Route path="/deals" element={<Navigate to="/deals-of-the-day" replace />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:idOrSlug" element={<ProductDetailsPage />} />

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

export default AppRouter;
