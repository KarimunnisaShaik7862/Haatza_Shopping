import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HaatzaLiteLayout } from './HaatzaLiteLayout';
import { HaatzaLiteHomePage } from '../pages/HaatzaLiteHome/HaatzaLiteHomePage';
import { HaatzaLiteCategoriesPage } from '../pages/categories/HaatzaLiteCategoriesPage';
import { HaatzaLiteSearchPage } from '../pages/search/HaatzaLiteSearchPage';

// Marketplace Layout & Pages
import { HaatzaShoppingLayout } from '@shopping/layouts/HaatzaShoppingLayout';
import { HomePage as ShoppingHomePage } from '@shopping/pages/home/HomePage';

// Nest Layout & Pages
import { HaatzaNestLayout } from '@nest/app/HaatzaNestLayout';
import { HaatzaNestHomePage } from '@nest/pages/HaatzaNestHome/HaatzaNestHomePage';
import { HaatzaNestServicesPage } from '@nest/pages/services/HaatzaNestServicesPage';
import { HaatzaNestBookingsPage } from '@nest/pages/bookings/HaatzaNestBookingsPage';

// Lazy-loaded Shopping Pages
const ProductListingPage = lazy(() => import('@shopping/pages/category/ProductListingPage').then(m => ({ default: m.ProductListingPage })));
const SearchPage = lazy(() => import('@shopping/pages/search/SearchPage').then(m => ({ default: m.SearchPage })));
const ProductDetailsPage = lazy(() => import('@shopping/pages/product-details/ProductDetailsPage').then(m => ({ default: m.ProductDetailsPage })));
const CartPage = lazy(() => import('@shopping/pages/cart/CartPage').then(m => ({ default: m.CartPage })));
const WishlistPage = lazy(() => import('@shopping/pages/wishlist/WishlistPage').then(m => ({ default: m.WishlistPage })));
const CheckoutPage = lazy(() => import('@shopping/pages/checkout/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() => import('@shopping/pages/orders/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage })));
const OrdersPage = lazy(() => import('@shopping/pages/orders/OrdersPage').then(m => ({ default: m.OrdersPage })));
const OrderTrackingPage = lazy(() => import('@shopping/pages/orders/OrderTrackingPage').then(m => ({ default: m.OrderTrackingPage })));
const ReturnsRefundsPage = lazy(() => import('@shopping/pages/orders/ReturnsRefundsPage').then(m => ({ default: m.ReturnsRefundsPage })));
const LoginPage = lazy(() => import('@shopping/pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@shopping/pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('@shopping/pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const AccountDashboardPage = lazy(() => import('@shopping/pages/account/AccountDashboardPage').then(m => ({ default: m.AccountDashboardPage })));
const SavedAddressesPage = lazy(() => import('@shopping/pages/account/SavedAddressesPage').then(m => ({ default: m.SavedAddressesPage })));
const HelpCenterPage = lazy(() => import('@shopping/pages/support/HelpCenterPage').then(m => ({ default: m.HelpCenterPage })));
const ContactUsPage = lazy(() => import('@shopping/pages/support/ContactUsPage').then(m => ({ default: m.ContactUsPage })));
const FaqPage = lazy(() => import('@shopping/pages/support/FaqPage').then(m => ({ default: m.FaqPage })));
const AboutUsPage = lazy(() => import('@shopping/pages/support/AboutUsPage').then(m => ({ default: m.AboutUsPage })));
const PolicyPage = lazy(() => import('@shopping/pages/policies/PolicyPage').then(m => ({ default: m.PolicyPage })));
const NotFoundPage = lazy(() => import('@shopping/pages/not-found/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export const HaatzaLiteRouter: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-sm font-semibold text-zinc-500">Loading...</div>}>
      <Routes>
        {/* LITE ROUTES */}
        <Route path="/lite" element={<HaatzaLiteLayout />}>
          <Route index element={<HaatzaLiteHomePage />} />
          <Route path="categories" element={<HaatzaLiteCategoriesPage />} />
          <Route path="categories/:slug" element={<HaatzaLiteCategoriesPage />} />
          <Route path="search" element={<HaatzaLiteSearchPage />} />
        </Route>
        <Route path="/categories" element={<Navigate to="/lite/categories" replace />} />
        <Route path="/categories/:slug" element={<Navigate to="/lite/categories/:slug" replace />} />

        {/* NEST ROUTES */}
        <Route path="/nest" element={<HaatzaNestLayout />}>
          <Route index element={<HaatzaNestHomePage />} />
          <Route path="services" element={<HaatzaNestServicesPage />} />
          <Route path="bookings" element={<HaatzaNestBookingsPage />} />
        </Route>

        {/* MARKETPLACE / SHOPPING ROUTES */}
        <Route element={<HaatzaShoppingLayout />}>
          <Route path="/" element={<ShoppingHomePage />} />
          <Route path="/shopping" element={<ShoppingHomePage />} />
          <Route path="/shopping/*" element={<ShoppingHomePage />} />
          <Route path="/haatza" element={<Navigate to="/shopping" replace />} />

          {/* Catalog & Search */}
          <Route path="/category/:slug" element={<ProductListingPage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/under-49" element={<Navigate to="/category/under-49" replace />} />
          <Route path="/deals" element={<Navigate to="/category/deals" replace />} />
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
    </Suspense>
  );
};

export default HaatzaLiteRouter;
