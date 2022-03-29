import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserlistScreen from './screens/UserlistScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductlistScreen from './screens/ProductListScreen';
import CreateProductScreen from './screens/CreateProductScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/profile" element={<ProfileScreen />}></Route>
            <Route path="/register" element={<SignupScreen />}></Route>
            <Route path="/shipping" element={<ShippingScreen />}></Route>
            <Route path="/payment" element={<PaymentScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route path="/products/:id" element={<ProductScreen />}></Route>

            {/* ADMIN ROUTES */}
            <Route path="/admin/userlist" element={<UserlistScreen />}></Route>
            <Route
              path="/admin/productlist"
              element={<ProductlistScreen />}
            ></Route>
            <Route
              path="/admin/user/:id/edit"
              element={<UserEditScreen />}
            ></Route>
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen />}
            ></Route>
            <Route
              path="/admin/product/create"
              element={<CreateProductScreen />}
            ></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
