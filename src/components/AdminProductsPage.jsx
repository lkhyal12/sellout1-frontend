import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { LoaderCircle, Star, Trash } from "lucide-react";

const AdminProductsPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {
    allProducts,
    getAllProducts,
    toggleFeaturedProduct,
    deleteProduct,
    fetchingProducts,
  } = useProductStore();

  // handle toggle featured product
  async function handleToggleFeaturedProduct(productId) {
    await toggleFeaturedProduct(productId);
  }
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // set width on resizing
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  if (fetchingProducts)
    return (
      <div className="h-dvh w-full flex items-center justify-center bg-background text-white">
        <LoaderCircle size={60} className="animate-spin" />
      </div>
    );
  if (allProducts.length === 0)
    return (
      <div className="h-[50dvh] w-full flex items-center justify-center">
        <div>
          <h2 className="text-red-600 text-xl md:text-2xl lg:text-3xl text-center">
            No Products Found
          </h2>
        </div>
      </div>
    );
  return (
    <div className="container mx-auto">
      {/* <h2 className="pageTitle text-left">Products</h2> */}
      <p className="text-text-secondary text-center mt-5">
        Manage and organize your store products
      </p>
      {windowWidth <= 676 ? (
        <MobileProductsDesign
          products={allProducts}
          handleToggleFeaturedProduct={handleToggleFeaturedProduct}
          deleteProduct={deleteProduct}
        />
      ) : (
        <DesktopProductsDesign
          products={allProducts}
          handleToggleFeaturedProduct={handleToggleFeaturedProduct}
          deleteProduct={deleteProduct}
        />
      )}
    </div>
  );
};

function DesktopProductsDesign({
  products,
  handleToggleFeaturedProduct,
  deleteProduct,
}) {
  async function handleDelete(productId) {
    await deleteProduct(productId);
  }
  return (
    <table className="w-full  max-w-4xl mx-auto mt-4 rounded-lg">
      <thead className="bg-divider">
        <tr className=" text-text-secondary">
          <th className="px-2 py-2 text-left">Products</th>
          <th className="text-center">Category</th>
          <th className="text-center">Price</th>
          <th className="text-center">Created At</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map((product) => (
            <tr
              key={product._id}
              className="border-b border-divider hover:bg-divider transition-colors last:border-b-0 bg-surface"
            >
              <td className="text-white p-2 py-3">
                <div className="flex items-center gap-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-11 object-cover rounded"
                  />
                  <div>
                    <h4 className=" font-bold">{product.name}</h4>
                    <p className="text-sm text-text-secondary">
                      {product.description?.length > 30
                        ? product.description.slice(0, 30) + "..."
                        : product.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="font-semibold text-white text-center">
                {product.category}
              </td>
              <td className="font-semibold text-white text-center">
                ${product.price.toFixed(2)}
              </td>
              <td className=" text-white text-center">
                {new Date(product.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td>
                <div className="flex items-center justify-center gap-2">
                  <Star
                    className={`${product.isFeatured ? "text-amber-500" : "text-text-secondary"} cursor-pointer`}
                    size={20}
                    onClick={() => handleToggleFeaturedProduct(product._id)}
                  />
                  <Trash
                    size={20}
                    className="cursor-pointer text-error"
                    onClick={() => handleDelete(product._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function MobileProductsDesign({
  products,
  handleToggleFeaturedProduct,
  deleteProduct,
}) {
  async function handleDelete(productId) {
    await deleteProduct(productId);
  }
  return (
    <div className="w-9/10 mx-auto my-4">
      {products.map((product) => (
        <div className="flex items-center justify-between bg-surface rounded-lg shadow p-2 mb-4">
          <div className="flex items-center gap-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-15 h-17 object-cover rounded-md"
            />
            <div className="space-y-1">
              <h3 className="font-semibold  text-white">{product.name}</h3>
              <p className="text-text-secondary text-sm">{product.category}</p>
              <h4 className="text-white font-semibold text-sm">
                ${product.price.toFixed(2)}
              </h4>
            </div>
          </div>
          {/* actions */}
          <div className="flex items-end h-full gap-1">
            <Star
              size={20}
              className={`${product.isFeatured ? "text-yellow-600" : "text-text-secondary"} cursor-pointer`}
              onClick={() => handleToggleFeaturedProduct(product._id)}
            />
            <Trash
              className="text-red-600 cursor-pointer"
              size={20}
              onClick={() => handleDelete(product._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminProductsPage;
