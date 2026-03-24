import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingFallback } from './LoadingFallback';
import Home from '@/pages/home';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '../config';

// Lazy load all route components
const Layout = lazy(() => import('@/widgets/layout'));
const Contact = lazy(() => import('@/pages/contact'));
const Wishlist = lazy(() => import('@/pages/wishlist'));
const CartOverview = lazy(() => import('@/pages/cart'));
const ProductsOverview = lazy(() => import('@/pages/products-overview'));
const ProductDetails = lazy(() => import('@/pages/product-details'));
const RecentProducts = lazy(() => import('@/pages/recent-products'));
const CheckoutSummary = lazy(() => import('@/pages/checkout'));
const Orders = lazy(() => import('@/pages/orders'));
const NotFound = lazy(() => import('@/pages/not-found'));

const stripePromise = loadStripe(env.STRIPE.PUBLISHABLE_KEY);

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="recent_products" element={<RecentProducts />} />
            <Route path="cart" element={<CartOverview />} />
            <Route path="category/:category" element={<ProductsOverview />} />
            <Route path="category/:category/:id/product_details" element={<ProductDetails />} />
            <Route path="cart/checkout" element={<CheckoutSummary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Elements>
    </Suspense>
  );
}
