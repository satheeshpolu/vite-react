import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingFallback } from './LoadingFallback';
import Home from '@/pages/Home';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import CheckoutScreen from '@/pages/CheckoutScreen';

// Lazy load all route components
const Layout = lazy(() => import('@/pages/Layout'));
const Contact = lazy(() => import('@/pages/Contact'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const CartOverview = lazy(() => import('@/pages/CartOverview'));
const CheckoutScreen = lazy(() => import('@/pages/CheckoutScreen'));
const ProductsOverview = lazy(() => import('@/pages/ProductsOverview'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const RecentProducts = lazy(() => import('@/pages/RecentProducts'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const stripePromise = loadStripe(
  'pk_test_51SxVD1LcAJPF47dSIH5L5vi7E0sCq1K6IXm6icBMuvlui03tITLzfJbuHJQMMmFS3jGzEZ1fLAa74HkHVCh7NSOW00nZhj2rKl'
);

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
            <Route path="cart/checkout" element={<CheckoutScreen />} />
            <Route path="category/:category" element={<ProductsOverview />} />
            <Route path="category/:category/:id/product_details" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Elements>
    </Suspense>
  );
}
