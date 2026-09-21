import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold">
          QShop
        </Link>

        <div className="flex gap-6 items-center">

          <Link to="/" className="hover:text-gray-500">
            Home
          </Link>

          <a href="/#products" className="hover:text-gray-500">
            Products
          </a>

          <Link to="/cart" className="relative">
            🛒

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;