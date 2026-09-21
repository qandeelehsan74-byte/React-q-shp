import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "Cash on Delivery",
  });

  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 5000 ? 0 : 250;

  const total = subtotal + delivery;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phonePattern = /^03[0-9]{9}$/;

    if (!phonePattern.test(formData.phone)) {
      setError(
        "Please enter a valid Pakistani phone number, e.g. 03001234567"
      );
      return;
    }

    if (cart.length === 0) {
      return;
    }

    const orderId =
      "QSH-" + Math.floor(100000 + Math.random() * 900000);

    const order = {
      orderId,
      customer: formData.name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      payment: formData.payment,
      items: cart,
      subtotal,
      delivery,
      total,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "qshop-last-order",
      JSON.stringify(order)
    );

    setCart([]);

    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl">
          🛒
        </div>

        <h1 className="text-3xl font-bold mt-5">
          Your cart is empty
        </h1>

        <p className="text-gray-500 mt-3">
          Add some products before checkout.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-black text-white px-7 py-3 rounded-xl font-semibold"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          QShop
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Checkout
        </h1>

        <p className="text-gray-500 mt-2">
          Complete your information to place your order.
        </p>
      </div>

      <div className="grid lg:grid-cols-3   !ml-[20px] !mb-[20px]  gap-10">

        {/* Checkout Form */}

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white  rounded-2xl p-7 shadow-sm"
        >
          <h2 className="text-2xl font-bold mb-7">
            Delivery Information
          </h2>

          {/* Name */}

          <div className="mb-5">
            <label className="block font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Phone */}

          <div className="mb-5">
            <label className="block font-medium mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="03001234567"
              required
              maxLength="11"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Address */}

          <div className="mb-5">
            <label className="block font-medium mb-2">
              Complete Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House number, street, area..."
              required
              rows="4"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          {/* City */}

          <div className="mb-7">
            <label className="block font-medium mb-2">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Lahore"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Payment */}

          <div className="mb-7">
            <h2 className="text-xl font-bold mb-4">
              Payment Method
            </h2>

            <label
              className={`flex items-center gap-4 border rounded-xl p-5 cursor-pointer transition ${
                formData.payment === "Cash on Delivery"
                  ? "border-black bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={
                  formData.payment ===
                  "Cash on Delivery"
                }
                onChange={handleChange}
              />

              <div>
                <p className="font-semibold">
                  💵 Cash on Delivery
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Pay when your order arrives.
                </p>
              </div>
            </label>

            <label
              className={`flex items-center gap-4 border rounded-xl p-5 mt-3 cursor-pointer transition ${
                formData.payment === "Bank Transfer"
                  ? "border-black bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="Bank Transfer"
                checked={
                  formData.payment ===
                  "Bank Transfer"
                }
                onChange={handleChange}
              />

              <div>
                <p className="font-semibold">
                  🏦 Bank Transfer
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Pay through bank transfer.
                </p>
              </div>
            </label>
          </div>

          {/* Error */}

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 mb-5">
              {error}
            </div>
          )}

          {/* Place Order */}

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition"
          >
            Place Order — Rs. {total}
          </button>
        </form>

        {/* Order Summary */}

        <div className="bg-white border rounded-2xl p-7 shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-6">
            Your Order
          </h2>

          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <p className="font-semibold">
                    {item.title}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  Rs.{" "}
                  {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-7 pt-6 space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-600">
                Items
              </span>

              <span>
                {totalItems}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span>
                Rs. {subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Delivery
              </span>

              <span className="font-semibold">
                {delivery === 0
                  ? "FREE"
                  : `Rs. ${delivery}`}
              </span>
            </div>

            <div className="border-t pt-5 flex justify-between">
              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-xl font-bold">
                Rs. {total}
              </span>
            </div>
          </div>

          <div className="border-t mt-6 pt-5">

            <p className="text-sm text-gray-500">
              🔒 Your information is safe and secure.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              🚚 Free delivery on orders above Rs. 5,000.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
