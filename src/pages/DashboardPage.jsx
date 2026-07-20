import { ChartBar, Package, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProductForm from "../components/CreateProductForm";
import AdminProductsPage from "../components/AdminProductsPage";
import AnalyticsPage from "../components/AnalyticsPage";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    image: "",
    description: "",
  });
  const navigate = useNavigate();

  const activeTabObj = {
    create: (
      <CreateProductForm
        productData={productData}
        setProductData={setProductData}
      />
    ),
    products: <AdminProductsPage />,
    analytics: <AnalyticsPage />,
  };
  return (
    <div className="min-h-dvh w-full  bg-background py-15">
      <h2 className="pageTitle">Admin Dashboard</h2>
      <div className="flex items-center justify-center gap-5 px-1">
        <button
          className={`flex text-sm md:text-base items-center justify-center gap-1  rounded-lg cursor-pointer py-1 px-2 font-semibold shadow-sm ${activeTab === "create" ? "bg-orange-primary text-white " : "bg-surface text-text-secondary"}`}
          onClick={() => setActiveTab("create")}
        >
          <PlusCircle size={20} />
          Create Product
        </button>

        <button
          className={`flex text-sm md:text-base items-center justify-center gap-1  rounded-lg cursor-pointer py-1 px-2 font-semibold shadow-sm ${activeTab === "products" ? "bg-orange-primary text-white " : "bg-surface text-text-secondary"}`}
          onClick={() => setActiveTab("products")}
        >
          <Package size={20} />
          Porudcts
        </button>

        <button
          className={`flex text-sm md:text-base items-center justify-center gap-1  rounded-lg cursor-pointer py-1 px-2 font-semibold shadow-sm ${activeTab === "analytics" ? "bg-orange-primary text-white " : "bg-surface text-text-secondary"}`}
          onClick={() => setActiveTab("analytics")}
        >
          <ChartBar size={20} />
          Analytics
        </button>
      </div>
      {activeTabObj[activeTab]}
    </div>
  );
};

export default DashboardPage;
