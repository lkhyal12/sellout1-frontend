import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/productStore";
import { LoaderCircle } from "lucide-react";
const ProductsPage = () => {
  const { fetchingProducts, categoryProducts, getProductsByCategory } =
    useProductStore();
  const { category } = useParams();

  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory, category]);
  if (fetchingProducts)
    return (
      <div className="h-dvh w-full flex items-center justify-center bg-background text-white">
        <LoaderCircle size={60} className="animate-spin" />
      </div>
    );
  return (
    <div className="min-h-dvh py-10 bg-background">
      <h1 className="text-orange-primary text-center pageTitle font-bold ">
        {category.toUpperCase()}
      </h1>
      <p className="text-text-secondary text-center mb-10">
        Discover our latest {category}
      </p>

      <div className="w-20/22 md:w-9/10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categoryProducts.map((el) => (
          <ProductCard key={el._id} product={el} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
