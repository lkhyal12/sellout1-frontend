import {
  ArrowLeft,
  ChartBar,
  Package,
  PlusCircle,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CreateProductForm from "../components/CreateProductForm";
import AdminProductsPage from "../components/AdminProductsPage";
import AnalyticsPage from "../components/AnalyticsPage";
import { useAuthStore } from "../store/authStore";
import backgroundImg from "../assets/bg2.png";
import mainBgImg from "../assets/background.png";
const DashboardPage = () => {
  const { user, isAdmin } = useAuthStore();
  const [activeTab, setActiveTab] = useState("create");
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    image: "",
    description: "",
  });
  // const navigate = useNavigate();

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

  if (!user) return <Navigate to="/login" />;
  if (!isAdmin)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-full relative">
          <img
            src={mainBgImg}
            alt="background"
            className="absolute inset-0 size-full object-cover "
          />
          <div className="absolute top-1/2 left-1/2 transform w-full max-w-4xl -translate-1/2 ">
            <ShieldAlert
              size={150}
              className="text-orange-primary block mx-auto"
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white w-full block">
              Access Denied
            </h2>
            <p className="text-text-secondary my-3 text-center">
              You don't have permission to access the admin dashboard. <br />
              Please contact an administrator if you believe this is an
              error{" "}
            </p>
            <Link className="w-full max-w-sm mx-auto  bg-orange-primary text-white text-lg font-semibold py-2 rounded-lg shadow flex items-center justify-center gap-1">
              <ArrowLeft size={20} />
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
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
