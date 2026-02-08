import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingFallback } from './LoadingFallback';
import Home from '@/pages/Home';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '../config';

// import CheckoutScreen from '@/pages/CheckoutScreen';

// Lazy load all route components
const Layout = lazy(() => import('@/pages/Layout'));
const Contact = lazy(() => import('@/pages/Contact'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const CartOverview = lazy(() => import('@/pages/CartOverview'));
const CheckoutSummary = lazy(() => import('@/pages/CheckoutSummary'));
const ProductsOverview = lazy(() => import('@/pages/ProductsOverview'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const RecentProducts = lazy(() => import('@/pages/RecentProducts'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const stripePromise = loadStripe(env.STRIPE.PUBLISHABLE_KEY);

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="blogs" element={<Blogs />}>
            <Route index element={<BlogList />} />
            <Route path=":id" element={<BlogPost />} />
            <Route path="category/:category" element={<BlogCategory />} />
          </Route> */}
            <Route path="contact" element={<Contact />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="recent_products" element={<RecentProducts />} />
            <Route path="cart" element={<CartOverview />} />
            <Route path="cart/checkout" element={<CheckoutSummary />} />
            <Route path="category/:category" element={<ProductsOverview />} />
            <Route path="category/:category/:id/product_details" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Elements>
    </Suspense>
  );
}
