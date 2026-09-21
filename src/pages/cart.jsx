import { useState } from "react";
import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const increaseQuantity = (id) => {
    setCart((oldCart) =>
      oldCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((oldCart) =>
      oldCart.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Free delivery above Rs. 5000
  const freeDeliveryLimit = 5000;

  const delivery =
    subtotal >= freeDeliveryLimit || subtotal === 0
      ? 0
      : 250;

  // 10% discount with QSHOP10
  const discount = couponApplied
    ? Math.round(subtotal * 0.1)
    : 0;

  const grandTotal =
    subtotal + delivery - discount;

  const remainingForFreeDelivery =
    Math.max(freeDeliveryLimit - subtotal, 0);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

          {cart.length > 0 && (
            <p className="text-gray-500 mt-2">
              {totalItems} item
              {totalItems > 1 ? "s" : ""} in your cart
            </p>
          )}
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        )}

      </div>

      {/* EMPTY CART */}

      {cart.length === 0 ? (
        <div className="text-center py-20">

          <div className="text-7xl">
            🛒
          </div>

          <h2 className="text-3xl font-bold mt-6">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-3">
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/"
            className="inline-block !mt-[20px]     !mb-[20px] bg-black   !text-white !px-[10px] !py-[10px] rounded-xl font-semibold hover:bg-gray-800"
          >
            Start Shopping
          </Link>

        </div>
      ) : (
        <>

          {/* FREE DELIVERY MESSAGE */}

          <div className="bg-gray-100 rounded-2xl p-5 mb-8">

            {remainingForFreeDelivery > 0 ? (
              <>
                <p className="font-medium">
                  🚚 Add{" "}
                  <span className="font-bold">
                    Rs. {remainingForFreeDelivery}
                  </span>{" "}
                  more to get FREE delivery!
                </p>

                <div className="w-full bg-gray-300 h-2 rounded-full mt-4">
                  <div
                    className="bg-black h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        (subtotal / freeDeliveryLimit) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </>
            ) : (
              <p className="font-semibold text-green-600">
                🎉 Congratulations! You unlocked FREE delivery.
              </p>
            )}

          </div>

          <div className="grid lg:grid-cols-3 gap-10">

            {/* CART PRODUCTS */}

            <div className="lg:col-span-2 space-y-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border flex flex-col md:flex-row gap-5 md:items-center"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full md:w-28 h-28 object-cover rounded-xl"
                  />

                  <div className="flex-1">

                    <p className="text-sm text-gray-500">
                      {item.category}
                    </p>

                    <h2 className="text-lg font-bold mt-1">
                      {item.title}
                    </h2>

                    <p className="font-semibold mt-2">
                      Rs. {item.price}
                    </p>

                  </div>

                  {/* QUANTITY */}

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="font-semibold min-w-5 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                    >
                      +
                    </button>

                  </div>

                  {/* ITEM TOTAL */}

                  <div className="font-bold min-w-24 text-right">
                    Rs.{" "}
                    {item.price * item.quantity}
                  </div>

                  {/* REMOVE */}

                  <button
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

            {/* ORDER SUMMARY */}

            <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              {/* SUBTOTAL */}

              <div className="flex justify-between mb-4">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-semibold">
                  Rs. {subtotal}
                </span>
              </div>

              {/* DELIVERY */}

              <div className="flex justify-between mb-4">
                <span className="text-gray-600">
                  Delivery
                </span>

                <span className="font-semibold">
                  {delivery === 0
                    ? "FREE"
                    : `Rs. ${delivery}`}
                </span>
              </div>

              {/* COUPON */}

              <div className="border-t pt-5 mt-5">

                <p className="font-semibold mb-3">
                  Have a coupon?
                </p>

                <div className="flex gap-2">

                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) =>
                      setCoupon(e.target.value)
                    }
                    placeholder="Enter coupon"
                    className="min-w-0 flex-1 border rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
<button
  onClick={() => {
    if (
      coupon.trim().toUpperCase() ===
      "QSHOP10"
    ) {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
    }
  }}
className="ml-[15px] px-10 py-5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 hover:scale-105 transition duration-300 shadow-md"
 > Apply
</button>
                </div>

                {couponApplied && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ QSHOP10 applied — 10% discount
                  </p>
                )}

              </div>

              {/* DISCOUNT */}

              {discount > 0 && (
                <div className="flex justify-between mt-5 text-green-600">
                  <span>Discount</span>

                  <span>
                    - Rs. {discount}
                  </span>
                </div>
              )}

              {/* TOTAL */}

              <div className="border-t mt-6 pt-5 flex justify-between">

                <span className="text-xl font-bold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  Rs. {grandTotal}
                </span>

              </div>

              {/* CHECKOUT */}

     <Link
  to="/checkout"
  className="block text-center bg-black !text-white py-4 rounded-xl mt-6 font-semibold hover:bg-gray-800 transition"
>
  Proceed to Checkout
</Link>

              {/* CONTINUE */}

              <Link
                to="/"
                className="block text-center border border-black py-4 rounded-xl mt-3 font-semibold hover:bg-gray-100 transition"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        </>
      )}

    </section>
  );
}

export default Cart;
