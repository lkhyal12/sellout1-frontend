import React from "react";
import { Link } from "react-router-dom";

export const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];
const CategoriesPage = () => {
  return (
    <div className="min-h-dvh w-full pt-15">
      <div>
        <h2 className="pageTitle">Explore Our Categories</h2>
        <p className="text-text-secondary text-center max-w-lg mx-auto">
          Explore our newest collections and exclusive deals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5  mt-10">
          {categories.map((category, i) => (
            <Link
              key={category.name}
              to={"/categories" + category.href}
              className="w-full rounded-lg overflow-hidden aspect-square relative"
            >
              <img
                src={category.imageUrl}
                className="size-full object-cover transform hover:scale-110 transition-all duration-300"
                alt={category.name}
              />
              <div className="absolute left-0 bottom-0 w-full bg-background/30 p-2 text-white">
                <h3 className="text-3xl font-bold mb-3">{category.name}</h3>
                <h5 className="text-lg">Explore {category.name}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
