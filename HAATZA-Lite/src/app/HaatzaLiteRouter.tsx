import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HaatzaLiteLayout } from './HaatzaLiteLayout';
import { HaatzaLiteHomePage } from '../pages/HaatzaLiteHome/HaatzaLiteHomePage';
import { HaatzaLiteCategoriesPage } from '../pages/categories/HaatzaLiteCategoriesPage';
import { HaatzaLiteSearchPage } from '../pages/search/HaatzaLiteSearchPage';
import { AllForYou } from '../pages/AllForYou';
import { AllForYouPage } from '../pages/all-for-you/AllForYouPage';
import { FruitsVegetables } from '../pages/FruitsVegetables';
import { DairyBreakfast } from '../pages/DairyBreakfast';
import { SnacksBeverages } from '../pages/SnacksBeverages';
import { HouseholdCleaning } from '../pages/HouseholdCleaning';
import { PersonalCare } from '../pages/PersonalCare';
import { KitchenEssentials } from '../pages/KitchenEssentials';
import { BakeryBreads } from '../pages/BakeryBreads';
import { StaplesCookingEssentials } from '../pages/StaplesCookingEssentials';
import { FrozenFoods } from '../pages/FrozenFoods';
import { BabyCareEssentials } from '../pages/BabyCareEssentials';
import { PetSupplies } from '../pages/PetSupplies';
import { ProductDetails } from '../pages/ProductDetails';

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
          <Route path="all-for-you" element={<Navigate to="/lite" replace />} />
          <Route path="all" element={<Navigate to="/lite" replace />} />
          <Route path="fruits-vegetables" element={<FruitsVegetables />} />
          <Route path="fruits_vegetables" element={<FruitsVegetables />} />
          <Route path="fruits vegetables" element={<FruitsVegetables />} />
          <Route path="fruits%20vegetables" element={<FruitsVegetables />} />
          <Route path="fruits" element={<FruitsVegetables />} />
          <Route path="vegetables" element={<FruitsVegetables />} />
          <Route path="dairy-breakfast" element={<DairyBreakfast />} />
          <Route path="dairy_breakfast" element={<DairyBreakfast />} />
          <Route path="dairy breakfast" element={<DairyBreakfast />} />
          <Route path="dairy%20breakfast" element={<DairyBreakfast />} />
          <Route path="dairy" element={<DairyBreakfast />} />
          <Route path="breakfast" element={<DairyBreakfast />} />
          <Route path="snacks-beverages" element={<SnacksBeverages />} />
          <Route path="snacks_beverages" element={<SnacksBeverages />} />
          <Route path="snacks beverages" element={<SnacksBeverages />} />
          <Route path="snacks%20beverages" element={<SnacksBeverages />} />
          <Route path="snacks" element={<SnacksBeverages />} />
          <Route path="beverages" element={<SnacksBeverages />} />
          <Route path="household-cleaning" element={<HouseholdCleaning />} />
          <Route path="household_cleaning" element={<HouseholdCleaning />} />
          <Route path="household cleaning" element={<HouseholdCleaning />} />
          <Route path="household%20cleaning" element={<HouseholdCleaning />} />
          <Route path="household" element={<HouseholdCleaning />} />
          <Route path="cleaning" element={<HouseholdCleaning />} />
          <Route path="personal-care" element={<PersonalCare />} />
          <Route path="personal_care" element={<PersonalCare />} />
          <Route path="personal care" element={<PersonalCare />} />
          <Route path="personal%20care" element={<PersonalCare />} />
          <Route path="personal" element={<PersonalCare />} />
          <Route path="care" element={<PersonalCare />} />
          <Route path="kitchen-essentials" element={<KitchenEssentials />} />
          <Route path="kitchen_essentials" element={<KitchenEssentials />} />
          <Route path="kitchen essentials" element={<KitchenEssentials />} />
          <Route path="kitchen%20essentials" element={<KitchenEssentials />} />
          <Route path="kitchen" element={<KitchenEssentials />} />
          <Route path="essentials" element={<KitchenEssentials />} />
          <Route path="bakery-breads" element={<BakeryBreads />} />
          <Route path="bakery_breads" element={<BakeryBreads />} />
          <Route path="bakery breads" element={<BakeryBreads />} />
          <Route path="bakery%20breads" element={<BakeryBreads />} />
          <Route path="bakery" element={<BakeryBreads />} />
          <Route path="breads" element={<BakeryBreads />} />
          <Route path="staples-cooking-essentials" element={<StaplesCookingEssentials />} />
          <Route path="staples_cooking_essentials" element={<StaplesCookingEssentials />} />
          <Route path="staples cooking essentials" element={<StaplesCookingEssentials />} />
          <Route path="staples%20cooking%20essentials" element={<StaplesCookingEssentials />} />
          <Route path="staples" element={<StaplesCookingEssentials />} />
          <Route path="cooking" element={<StaplesCookingEssentials />} />
          <Route path="frozen-foods" element={<FrozenFoods />} />
          <Route path="frozen_foods" element={<FrozenFoods />} />
          <Route path="frozen foods" element={<FrozenFoods />} />
          <Route path="frozen%20foods" element={<FrozenFoods />} />
          <Route path="frozen" element={<FrozenFoods />} />
          <Route path="baby-care-essentials" element={<BabyCareEssentials />} />
          <Route path="baby_care_essentials" element={<BabyCareEssentials />} />
          <Route path="baby care essentials" element={<BabyCareEssentials />} />
          <Route path="baby%20care%20essentials" element={<BabyCareEssentials />} />
          <Route path="baby-care" element={<BabyCareEssentials />} />
          <Route path="baby" element={<BabyCareEssentials />} />
          <Route path="pet-supplies" element={<PetSupplies />} />
          <Route path="pet_supplies" element={<PetSupplies />} />
          <Route path="pet supplies" element={<PetSupplies />} />
          <Route path="pet%20supplies" element={<PetSupplies />} />
          <Route path="pet" element={<PetSupplies />} />
          <Route path="pets" element={<PetSupplies />} />
          <Route path="categories/all-for-you" element={<Navigate to="/lite" replace />} />
          <Route path="categories/all" element={<Navigate to="/lite" replace />} />
          <Route path="categories/fruits-vegetables" element={<FruitsVegetables />} />
          <Route path="categories/fruits_vegetables" element={<FruitsVegetables />} />
          <Route path="categories/fruits vegetables" element={<FruitsVegetables />} />
          <Route path="categories/fruits%20vegetables" element={<FruitsVegetables />} />
          <Route path="categories/dairy-breakfast" element={<DairyBreakfast />} />
          <Route path="categories/dairy_breakfast" element={<DairyBreakfast />} />
          <Route path="categories/dairy breakfast" element={<DairyBreakfast />} />
          <Route path="categories/dairy%20breakfast" element={<DairyBreakfast />} />
          <Route path="categories/snacks-beverages" element={<SnacksBeverages />} />
          <Route path="categories/snacks_beverages" element={<SnacksBeverages />} />
          <Route path="categories/snacks beverages" element={<SnacksBeverages />} />
          <Route path="categories/snacks%20beverages" element={<SnacksBeverages />} />
          <Route path="categories/household-cleaning" element={<HouseholdCleaning />} />
          <Route path="categories/household_cleaning" element={<HouseholdCleaning />} />
          <Route path="categories/household cleaning" element={<HouseholdCleaning />} />
          <Route path="categories/household%20cleaning" element={<HouseholdCleaning />} />
          <Route path="categories/personal-care" element={<PersonalCare />} />
          <Route path="categories/personal_care" element={<PersonalCare />} />
          <Route path="categories/personal care" element={<PersonalCare />} />
          <Route path="categories/personal%20care" element={<PersonalCare />} />
          <Route path="categories/kitchen-essentials" element={<KitchenEssentials />} />
          <Route path="categories/kitchen_essentials" element={<KitchenEssentials />} />
          <Route path="categories/kitchen essentials" element={<KitchenEssentials />} />
          <Route path="categories/kitchen%20essentials" element={<KitchenEssentials />} />
          <Route path="categories/bakery-breads" element={<BakeryBreads />} />
          <Route path="categories/bakery_breads" element={<BakeryBreads />} />
          <Route path="categories/bakery breads" element={<BakeryBreads />} />
          <Route path="categories/bakery%20breads" element={<BakeryBreads />} />
          <Route path="categories/staples-cooking-essentials" element={<StaplesCookingEssentials />} />
          <Route path="categories/staples_cooking_essentials" element={<StaplesCookingEssentials />} />
          <Route path="categories/staples cooking essentials" element={<StaplesCookingEssentials />} />
          <Route path="categories/staples%20cooking%20essentials" element={<StaplesCookingEssentials />} />
          <Route path="categories/frozen-foods" element={<FrozenFoods />} />
          <Route path="categories/frozen_foods" element={<FrozenFoods />} />
          <Route path="categories/frozen foods" element={<FrozenFoods />} />
          <Route path="categories/frozen%20foods" element={<FrozenFoods />} />
          <Route path="categories/baby-care-essentials" element={<BabyCareEssentials />} />
          <Route path="categories/baby_care_essentials" element={<BabyCareEssentials />} />
          <Route path="categories/baby care essentials" element={<BabyCareEssentials />} />
          <Route path="categories/baby%20care%20essentials" element={<BabyCareEssentials />} />
          <Route path="categories/pet-supplies" element={<PetSupplies />} />
          <Route path="categories/pet_supplies" element={<PetSupplies />} />
          <Route path="categories/pet supplies" element={<PetSupplies />} />
          <Route path="categories/pet%20supplies" element={<PetSupplies />} />
          <Route path="category/all-for-you" element={<Navigate to="/lite" replace />} />
          <Route path="category/all" element={<Navigate to="/lite" replace />} />
          <Route path="category/fruits-vegetables" element={<FruitsVegetables />} />
          <Route path="category/fruits_vegetables" element={<FruitsVegetables />} />
          <Route path="category/fruits vegetables" element={<FruitsVegetables />} />
          <Route path="category/fruits%20vegetables" element={<FruitsVegetables />} />
          <Route path="category/dairy-breakfast" element={<DairyBreakfast />} />
          <Route path="category/dairy_breakfast" element={<DairyBreakfast />} />
          <Route path="category/dairy breakfast" element={<DairyBreakfast />} />
          <Route path="category/dairy%20breakfast" element={<DairyBreakfast />} />
          <Route path="category/snacks-beverages" element={<SnacksBeverages />} />
          <Route path="category/snacks_beverages" element={<SnacksBeverages />} />
          <Route path="category/snacks beverages" element={<SnacksBeverages />} />
          <Route path="category/snacks%20beverages" element={<SnacksBeverages />} />
          <Route path="category/household-cleaning" element={<HouseholdCleaning />} />
          <Route path="category/household_cleaning" element={<HouseholdCleaning />} />
          <Route path="category/household cleaning" element={<HouseholdCleaning />} />
          <Route path="category/household%20cleaning" element={<HouseholdCleaning />} />
          <Route path="category/personal-care" element={<PersonalCare />} />
          <Route path="category/personal_care" element={<PersonalCare />} />
          <Route path="category/personal care" element={<PersonalCare />} />
          <Route path="category/personal%20care" element={<PersonalCare />} />
          <Route path="category/kitchen-essentials" element={<KitchenEssentials />} />
          <Route path="category/kitchen_essentials" element={<KitchenEssentials />} />
          <Route path="category/kitchen essentials" element={<KitchenEssentials />} />
          <Route path="category/kitchen%20essentials" element={<KitchenEssentials />} />
          <Route path="category/bakery-breads" element={<BakeryBreads />} />
          <Route path="category/bakery_breads" element={<BakeryBreads />} />
          <Route path="category/bakery breads" element={<BakeryBreads />} />
          <Route path="category/bakery%20breads" element={<BakeryBreads />} />
          <Route path="category/staples-cooking-essentials" element={<StaplesCookingEssentials />} />
          <Route path="category/staples_cooking_essentials" element={<StaplesCookingEssentials />} />
          <Route path="category/staples cooking essentials" element={<StaplesCookingEssentials />} />
          <Route path="category/staples%20cooking%20essentials" element={<StaplesCookingEssentials />} />
          <Route path="category/frozen-foods" element={<FrozenFoods />} />
          <Route path="category/frozen_foods" element={<FrozenFoods />} />
          <Route path="category/frozen foods" element={<FrozenFoods />} />
          <Route path="category/frozen%20foods" element={<FrozenFoods />} />
          <Route path="category/baby-care-essentials" element={<BabyCareEssentials />} />
          <Route path="category/baby_care_essentials" element={<BabyCareEssentials />} />
          <Route path="category/baby care essentials" element={<BabyCareEssentials />} />
          <Route path="category/baby%20care%20essentials" element={<BabyCareEssentials />} />
          <Route path="category/pet-supplies" element={<PetSupplies />} />
          <Route path="category/pet_supplies" element={<PetSupplies />} />
          <Route path="category/pet supplies" element={<PetSupplies />} />
          <Route path="category/pet%20supplies" element={<PetSupplies />} />
          <Route path="categories" element={<HaatzaLiteCategoriesPage />} />
          <Route path="categories/:slug" element={<HaatzaLiteCategoriesPage />} />
          <Route path="category/:slug" element={<HaatzaLiteCategoriesPage />} />
          <Route path="search" element={<HaatzaLiteSearchPage />} />
          {/* Shared Cart & Checkout Routes */}
          <Route path="cart" element={<Navigate to="/cart" replace />} />
          <Route path="checkout" element={<Navigate to="/checkout" replace />} />
          {/* Dynamic Product Details Route for Lite */}
          <Route path="product/:id" element={<ProductDetails />} />
          {/* Direct category slug routing within Lite: /lite/:slug */}
          <Route path=":slug" element={<HaatzaLiteCategoriesPage />} />
        </Route>

        {/* Redirect standalone /product/:id to /lite/product/:id */}
        <Route path="/product/:id" element={<Navigate to="/lite/product/:id" replace />} />

        {/* Redirect any legacy/global category paths strictly into Lite */}
        <Route path="/category/all-for-you" element={<Navigate to="/lite" replace />} />
        <Route path="/category/all" element={<Navigate to="/lite" replace />} />
        <Route path="/category/fruits-vegetables" element={<Navigate to="/lite/fruits-vegetables" replace />} />
        <Route path="/category/fruits_vegetables" element={<Navigate to="/lite/fruits-vegetables" replace />} />
        <Route path="/category/fruits vegetables" element={<Navigate to="/lite/fruits-vegetables" replace />} />
        <Route path="/category/fruits%20vegetables" element={<Navigate to="/lite/fruits-vegetables" replace />} />
        <Route path="/category/dairy-breakfast" element={<Navigate to="/lite/dairy-breakfast" replace />} />
        <Route path="/category/dairy_breakfast" element={<Navigate to="/lite/dairy-breakfast" replace />} />
        <Route path="/category/dairy breakfast" element={<Navigate to="/lite/dairy-breakfast" replace />} />
        <Route path="/category/dairy%20breakfast" element={<Navigate to="/lite/dairy-breakfast" replace />} />
        <Route path="/categories/dairy-breakfast" element={<Navigate to="/lite/dairy-breakfast" replace />} />
        <Route path="/categories/dairy_breakfast" element={<Navigate to="/lite/dairy-breakfast" replace />} />
        <Route path="/categories/dairy breakfast" element={<Navigate to="/lite/dairy-breakfast" replace />} />
        <Route path="/categories/dairy%20breakfast" element={<Navigate to="/lite/dairy-breakfast" replace />} />
        <Route path="/category/snacks-beverages" element={<Navigate to="/lite/snacks-beverages" replace />} />
        <Route path="/category/snacks_beverages" element={<Navigate to="/lite/snacks-beverages" replace />} />
        <Route path="/category/snacks beverages" element={<Navigate to="/lite/snacks-beverages" replace />} />
        <Route path="/category/snacks%20beverages" element={<Navigate to="/lite/snacks-beverages" replace />} />
        <Route path="/categories/snacks-beverages" element={<Navigate to="/lite/snacks-beverages" replace />} />
        <Route path="/categories/snacks_beverages" element={<Navigate to="/lite/snacks-beverages" replace />} />
        <Route path="/categories/snacks beverages" element={<Navigate to="/lite/snacks-beverages" replace />} />
        <Route path="/categories/snacks%20beverages" element={<Navigate to="/lite/snacks-beverages" replace />} />
        <Route path="/category/household-cleaning" element={<Navigate to="/lite/household-cleaning" replace />} />
        <Route path="/category/household_cleaning" element={<Navigate to="/lite/household-cleaning" replace />} />
        <Route path="/category/household cleaning" element={<Navigate to="/lite/household-cleaning" replace />} />
        <Route path="/category/household%20cleaning" element={<Navigate to="/lite/household-cleaning" replace />} />
        <Route path="/categories/household-cleaning" element={<Navigate to="/lite/household-cleaning" replace />} />
        <Route path="/categories/household_cleaning" element={<Navigate to="/lite/household-cleaning" replace />} />
        <Route path="/categories/household cleaning" element={<Navigate to="/lite/household-cleaning" replace />} />
        <Route path="/categories/household%20cleaning" element={<Navigate to="/lite/household-cleaning" replace />} />
        <Route path="/category/personal-care" element={<Navigate to="/lite/personal-care" replace />} />
        <Route path="/category/personal_care" element={<Navigate to="/lite/personal-care" replace />} />
        <Route path="/category/personal care" element={<Navigate to="/lite/personal-care" replace />} />
        <Route path="/category/personal%20care" element={<Navigate to="/lite/personal-care" replace />} />
        <Route path="/categories/personal-care" element={<Navigate to="/lite/personal-care" replace />} />
        <Route path="/categories/personal_care" element={<Navigate to="/lite/personal-care" replace />} />
        <Route path="/categories/personal care" element={<Navigate to="/lite/personal-care" replace />} />
        <Route path="/categories/personal%20care" element={<Navigate to="/lite/personal-care" replace />} />
        <Route path="/category/kitchen-essentials" element={<Navigate to="/lite/kitchen-essentials" replace />} />
        <Route path="/category/kitchen_essentials" element={<Navigate to="/lite/kitchen-essentials" replace />} />
        <Route path="/category/kitchen essentials" element={<Navigate to="/lite/kitchen-essentials" replace />} />
        <Route path="/category/kitchen%20essentials" element={<Navigate to="/lite/kitchen-essentials" replace />} />
        <Route path="/categories/kitchen-essentials" element={<Navigate to="/lite/kitchen-essentials" replace />} />
        <Route path="/categories/kitchen_essentials" element={<Navigate to="/lite/kitchen-essentials" replace />} />
        <Route path="/categories/kitchen essentials" element={<Navigate to="/lite/kitchen-essentials" replace />} />
        <Route path="/categories/kitchen%20essentials" element={<Navigate to="/lite/kitchen-essentials" replace />} />
        <Route path="/categories/all-for-you" element={<Navigate to="/lite" replace />} />
        <Route path="/categories/all" element={<Navigate to="/lite" replace />} />
        <Route path="/categories/fruits-vegetables" element={<Navigate to="/lite/fruits-vegetables" replace />} />
        <Route path="/categories/fruits_vegetables" element={<Navigate to="/lite/fruits-vegetables" replace />} />
        <Route path="/categories/fruits vegetables" element={<Navigate to="/lite/fruits-vegetables" replace />} />
        <Route path="/categories/fruits%20vegetables" element={<Navigate to="/lite/fruits-vegetables" replace />} />
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
