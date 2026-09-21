import { Link } from "react-router-dom";

function OrderSuccess() {
  const savedOrder = localStorage.getItem(
    "qshop-last-order"
  );

  const order = savedOrder
    ? JSON.parse(savedOrder)
    : null;

  if (!order) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">

        <div className="text-6xl">
          📦
        </div>

        <h1 className="text-3xl font-bold mt-5">
          No Order Found
        </h1>

        <Link
          to="/"
          className="inline-block mt-6 bg-black text-white px-7 py-3 rounded-xl"
        >
          Back to Shop
        </Link>

      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">

      {/* SUCCESS */}

      <div className="text-center">

        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center text-4xl">
          ✓
        </div>

        <h1 className="text-4xl font-bold mt-6">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-3">
          Thank you for shopping with QShop.
          Your order has been received.
        </p>

      </div>

      {/* ORDER CARD */}

      <div className="bg-white    !ml-[20px]  border rounded-2xl shadow-sm mt-10 p-7">

        <div className="flex flex-col md:flex-row md:justify-between gap-4 border-b pb-6">

          <div>
            <p className="text-sm text-gray-500">
              Order ID
            </p>

            <p className="text-xl font-bold mt-1">
              {order.orderId}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Order Date
            </p>

            <p className="font-semibold mt-1">
              {order.date}
            </p>
          </div>

        </div>

        {/* CUSTOMER */}

        <div className="grid md:grid-cols-2 gap-6 py-7 border-b">

          <div>
            <h2 className="font-bold text-lg mb-3">
              Customer Information
            </h2>

            <p className="text-gray-600">
              {order.customer}
            </p>

            <p className="text-gray-600 mt-1">
              {order.phone}
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3">
              Delivery Address
            </h2>

            <p className="text-gray-600">
              {order.address}
            </p>

            <p className="text-gray-600 mt-1">
              {order.city}
            </p>
          </div>

        </div>

        {/* PAYMENT */}

        <div className="py-7 border-b">

          <h2 className="font-bold text-lg mb-3">
            Payment Method
          </h2>

          <span className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
            {order.payment}
          </span>

        </div>

        {/* PRODUCTS */}

        <div className="py-7">

          <h2 className="font-bold text-lg mb-5">
            Order Items
          </h2>

          <div className="space-y-5">

            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4"
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-xl"
                />

                <div className="flex-1">

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Qty: {item.quantity}
                  </p>

                </div>

                <p className="font-bold">
                  Rs.{" "}
                  {item.price * item.quantity}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* TOTAL */}

        <div className="border-t pt-6 space-y-3">

          <div className="flex justify-between">
            <span className="text-gray-600">
              Subtotal
            </span>

            <span>
              Rs. {order.subtotal}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Delivery
            </span>

            <span>
              {order.delivery === 0
                ? "FREE"
                : `Rs. ${order.delivery}`}
            </span>
          </div>

          <div className="border-t pt-5 flex justify-between">

            <span className="text-xl font-bold">
              Total
            </span>

            <span className="text-xl font-bold">
              Rs. {order.total}
            </span>

          </div>

        </div>

      </div>

      {/* DELIVERY MESSAGE */}

      <div className="bg-gray-100 rounded-2xl p-6 mt-6 text-center">

        <p className="font-semibold">
          🚚 Your order is being processed.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          We will contact you regarding your delivery.
        </p>

      </div>

      {/* BUTTON */}

      <div className="text-center">

      <Link
  to="/"
  className="inline-block !mt-[30px] !mb-[40px] bg-black !text-white   !px-10 py-10 rounded-xl font-semibold hover:bg-gray-800 hover:!text-white transition"
>
 Continue Shopping
</Link>
      </div>

    </section>
  );
}

export default OrderSuccess;