import { useState } from "react";
import ProductCard from "../component/productcard";
import products from "../data/products";

function Home({ addToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Accessories",
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sorting
  if (sort === "low-high") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating") {
    filteredProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  return (
    <>
      {/* ================= HERO ================= */}

      <section className="bg-black text-white  !mb-[40px]">
        <div className="max-w-7xl mb-100 px-6 sm:px-8 lg:px-10 py-24 md:py-32">

          <div className="max-w-3xl">

            <p className="text-gray-400 text-xs md:text-sm font-semibold tracking-[0.3em] mb-6 uppercase">
              Modern Online Store
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Everything you need,
              <span className="block text-gray-400 mt-3">
                all in one place.
              </span>
            </h1>

            <p className="text-gray-400 mt-7 max-w-2xl text-base md:text-lg leading-8">
              Discover quality products at affordable prices.
              Shop your favorite products with QShop.
            </p>

           <a
  href="#products"
  className="inline-flex items-center justify-center mt-[50px] mb-[100px] px-10 py-4  text-black rounded-full font-semibold  hover:text-black hover:scale-105 transition duration-300"
>
  Shop Now →
</a>

          </div>
        </div>
      </section>


      {/* ================= PRODUCTS ================= */}

      <section
        id="products"
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-32"
      >

        {/* Heading */}

        <div className="mb-12   mt-700  ml-100">

          <p className="text-sm font-semibold  !mt-[10px] !ml-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3">
  Our Collection
</p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Featured Products
          </h2>

          

        </div>


        {/* ================= SEARCH + SORT ================= */}

        <div className="flex flex-col !mx-[20px] !mt-[20px]  !mb-[10px] my-[40px] md:flex-row gap-4 mb-10">

          {/* Search */}

         
<div className="flex-1 !mx-[20px] !mt-[20px]  !mb-[20px] my-[40px]">

  <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-[900px] mt-[900px] mb-[600px] ml-[600px] mr-[1200px] border border-gray-300 bg-white rounded-xl px-5 py-4 text-gray-800 placeholder-gray-400 outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition"
/>

</div>

          {/* Sort */}
<div   className=" !mx-[20px] !mt-[20px]  !mb-[20px] my-[40px]">
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="w-full md:w-64 border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 text-gray-700 outline-none cursor-pointer focus:bg-white focus:border-black focus:ring-4 focus:ring-gray-100 transition"
          >

            <option value="default">
              Sort Products
            </option>

            <option value="low-high">
              Price: Low to High
            </option>

            <option value="high-low">
              Price: High to Low
            </option>

            <option value="rating">
              Highest Rated
            </option>

          </select>
</div>
        </div>


        {/* ================= CATEGORIES ================= */}
<div className="flex flex-wrap  !mb-[20px] gap-3 mt-[500px] mb-12">

  {categories.map((item) => (

    <button
      key={item}
      onClick={() => setCategory(item)}
      className={`w-[100px] h-[30px] ml-[40px] rounded-full border text-sm font-semibold transition duration-300 ${
        category === item
          ? "bg-black text-white border-black shadow-lg scale-105"
          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-400"
      }`}
    >
      {item}
    </button>

  ))}

</div>

        {/* ================= PRODUCT COUNT ================= */}

        <div className="flex items-center justify-between mb-7">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

        </div>


        {/* ================= PRODUCT GRID ================= */}

        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1   !mb-[30px]  !ml-[20px] sm:grid-cols-2 lg:grid-cols-3 gap-8 pl-[800px]">

  {filteredProducts.map((product) => (

    <ProductCard  className="!p-[20px]"
      key={product.id}
      product={product}
      addToCart={addToCart}
    />

  ))}

</div>
        ) : (

          /* ================= NO PRODUCTS ================= */

          <div className="text-center py-28 px-6 bg-gray-50 rounded-3xl border border-gray-200">

            <div className="text-5xl mb-6">
              🔍
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              No products found
            </h3>

            <p className="text-gray-500 mt-3">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-7 px-7 py-3.5 bg-black text-white rounded-full font-semibold hover:bg-gray-800 hover:scale-105 transition duration-300"
            >
              View All Products
            </button>

          </div>

        )}

      </section>
    </>
  );
}

export default Home;
