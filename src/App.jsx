import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/ordersuccess";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./component/navbar";
import Home from "./pages/home";
import ProductDetails from "./pages/productdetails";
import Cart from "./pages/cart";

function App() {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("qshop-cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "qshop-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (product) => {
    setCart((oldCart) => {
      const existingProduct = oldCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return oldCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...oldCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <Home addToCart={addToCart} />
          }
        />
<Route
  path="/checkout"
  element={
    <Checkout
      cart={cart}
      setCart={setCart}
    />
  }
/>

<Route
  path="/order-success"
  element={<OrderSuccess />}
/>
       <Route
  path="/product/:id"
  element={
    <ProductDetails
      addToCart={addToCart}
    />
  }
/>

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />
      </Routes>

      <footer className="bg-black text-white text-center py-8 mt-16">
        <h2 className="text-xl font-bold">
          QShop
        </h2>

        <p className="text-gray-500 mt-2">
          Modern E-Commerce Store
        </p>
      </footer>
    </BrowserRouter>
  );
}

export default App;

