import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
const ProductsPage = () => {
  const { category } = useParams();
  return (
    <div className="min-h-dvh py-10 bg-background">
      <h1 className="text-orange-primary text-center pageTitle font-bold ">
        {category.toUpperCase()}
      </h1>
      <p className="text-text-secondary text-center mb-10">
        Discover our latest {category}
      </p>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4, 5, 6, 7].map((el) => (
          <ProductCard
            key={el}
            product={{ name: "Jeans", price: 152, image: "/jeans.jpg" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
