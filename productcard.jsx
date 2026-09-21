
import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border hover:shadow-xl transition duration-300">

      {/* Image */}

      <div className="relative">

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-cover"
        />

        {/* Discount */}

        <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
          {discount}% OFF
        </span>

      </div>


      {/* Information */}

      <div className="p-5">

        <p className="text-xs text-gray-500 uppercase tracking-wider">
          {product.brand}
        </p>

        <h2 className="text-lg font-semibold mt-1">
          {product.title}
        </h2>


        {/* Rating */}

        <div className="flex items-center gap-2 mt-2">

          <span className="text-yellow-500">
            ⭐ {product.rating}
          </span>

          <span className="text-xs text-gray-500">
            ({product.stock} left)
          </span>

        </div>


        {/* Price */}

        <div className="flex items-center gap-3 mt-3">

          <span className="text-xl font-bold">
            Rs. {product.price}
          </span>

          <span className="text-sm text-gray-400 line-through">
            Rs. {product.oldPrice}
          </span>

        </div>


        {/* Buttons */}

        <div className="flex gap-2 mt-5">

          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center border border-black py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Details
          </Link>


          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;

