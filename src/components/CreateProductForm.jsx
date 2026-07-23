import { useRef, useState } from "react";
import { categories } from "../pages/CategoriesPage";
import { Loader, PlusCircle, Upload } from "lucide-react";
import { useProductStore } from "../store/productStore";
import { useAuthStore } from "../store/authStore";
import { Link, Navigate } from "react-router-dom";

const CreateProductForm = ({ productData, setProductData }) => {
  const { user, isAdmin } = useAuthStore();
  const { createProduct } = useProductStore();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  function handleChange(e) {
    setProductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // handle image change
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProductData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { success } = await createProduct(productData);
    setLoading(false);
    if (success) {
      setProductData({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        image: "",
        description: "",
      });
    }
  }

  return (
    <div className="w-[95%] max-w-xl mx-auto bg-surface shadow-sm p-4 mt-5 rounded-lg">
      <h3 className="text-xl md:text-2xl font-semibold text-orange-primary mb-3">
        Create Product
      </h3>
      <form className="space-y-5">
        <div>
          <label htmlFor="productName" className="text-white font-semibold">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            name="name"
            className="w-full bg-divider text-white p-1 rounded mt-1 outline-none border-none"
            placeholder="Enter Product Name"
            value={productData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description" className="text-white font-semibold">
            Product Description:
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            className="w-full bg-divider text-white p-1 rounded mt-1 outline-none border-none"
            placeholder="Enter Product Description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price" className="text-white font-semibold">
            Product Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full bg-divider text-white p-1 rounded mt-1 outline-none border-none"
            placeholder="Enter Product Price"
            value={productData.price}
            min={0}
            step={0.1}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="category" className="text-white font-semibold">
            Product Category:
          </label>
          <select
            name="category"
            id="category"
            className="block bg-background text-white p-2 rounded mt-2 w-full"
            value={productData.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Catgory
            </option>
            <>
              {categories.map((category) => (
                <option key={category.name} value={category.name.toLowerCase()}>
                  {category.name}
                </option>
              ))}
            </>
          </select>
        </div>

        <div
          onClick={() => inputRef.current?.click()}
          className="max-w-3xs bg-background text-white flex items-center justify-center gap-1 cursor-pointer font-bold py-2 rounded-md"
        >
          {productData.image ? (
            "Image Selected"
          ) : (
            <>
              <Upload size={20} /> Upload Image
            </>
          )}
        </div>
        <input
          type="file"
          ref={inputRef}
          className="sr-only"
          onChange={handleImageChange}
        />
        <button
          className="bg-orange-primary text-white w-full flex items-center justify-center h-10 rounded-lg cursor-pointer font-semibold disabled:opacity-60 disabled:pointer-events-none"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <Loader className="size-6 animate-spin" />
          ) : (
            <>
              <PlusCircle size={20} className="mr-1" /> Create Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
