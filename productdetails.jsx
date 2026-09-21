import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../component/productcard";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    product?.image
  );

  if (!product) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>

        <p className="text-gray-500 mt-3">
          Sorry, this product does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-xl"
        >
          Back to Shop
        </Link>
      </section>
    );
  }

  const images = product.images || [product.image];

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  return (
    <section className="max-w-7xl    !ml-[20px] mx-auto px-6 py-16">

      {/* PRODUCT SECTION */}

      <div className="grid lg:grid-cols-2 gap-12">

        {/* IMAGE GALLERY */}

        <div>
          <div className="relative bg-white rounded-3xl overflow-hidden border">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-[500px] object-cover"
            />

            <span className="absolute top-5 left-5 bg-black text-white px-4 py-2 rounded-full text-sm">
              {discount}% OFF
            </span>
          </div>

          {/* THUMBNAILS */}

          <div className="flex gap-4 mt-5 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`shrink-0 rounded-xl overflow-hidden border-2 ${
                  selectedImage === image
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-24 h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT INFORMATION */}

        <div>

          <p className="text-sm text-gray-500 uppercase tracking-widest">
            {product.category}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {product.brand}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            {product.title}
          </h1>

          {/* RATING */}

          <div className="flex items-center gap-3 mt-5">
            <span className="text-yellow-500 text-lg">
              ⭐ {product.rating}
            </span>

            <span className="text-gray-500">
              Customer Rating
            </span>
          </div>

          {/* PRICE */}

          <div className="flex items-center gap-4 mt-7">
            <span className="text-4xl font-bold">
              Rs. {product.price}
            </span>

            <span className="text-lg text-gray-400 line-through">
              Rs. {product.oldPrice}
            </span>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </span>
          </div>

          {/* DESCRIPTION */}

          <p className="text-gray-600 leading-7 mt-7">
            {product.description}
          </p>

          {/* STOCK */}

          <div className="mt-6">

            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold">
                ✓ In Stock — {product.stock} items available
              </p>
            ) : (
              <p className="text-red-600 font-semibold">
                ✕ Out of Stock
              </p>
            )}

          </div>

          {/* QUANTITY */}

          <div className="mt-7">

            <p className="font-semibold mb-3">
              Quantity
            </p>

            <div className="flex items-center gap-4">

              <button
                onClick={decreaseQuantity}
                className="w-11 h-11 border rounded-xl text-xl hover:bg-gray-100"
              >
                −
              </button>

              <span className="font-bold text-lg w-8 text-center">
                {quantity}
              </span>

              <button
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
                className="w-11 h-11 border rounded-xl text-xl hover:bg-gray-100 disabled:opacity-40"
              >
                +
              </button>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              Add {quantity} to Cart
            </button>

            <Link
              to="/cart"
              className="flex-1 text-center border border-black py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              View Cart
            </Link>

          </div>

          {/* FEATURES */}

          <div className="border-t mt-10 pt-7 space-y-5">

            <div className="flex gap-4">
              <span className="text-2xl">🚚</span>

              <div>
                <strong>Fast Delivery</strong>

                <p className="text-sm text-gray-500 mt-1">
                  Delivery available nationwide.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl">🔒</span>

              <div>
                <strong>Secure Shopping</strong>

                <p className="text-sm text-gray-500 mt-1">
                  Safe and secure shopping experience.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl">↩️</span>

              <div>
                <strong>Easy Returns</strong>

                <p className="text-sm text-gray-500 mt-1">
                  Simple and convenient return process.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}

      {relatedProducts.length > 0 && (
        <section className="mt-24     !ml-[20px]  !mb-[20px]">

          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Related Products
            </h2>

            <p className="text-gray-500 mt-2">
              You may also like these products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {relatedProducts
              .slice(0, 3)
              .map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  addToCart={addToCart}
                />
              ))}

          </div>

        </section>
      )}

    </section>
  );
}

export default ProductDetails;