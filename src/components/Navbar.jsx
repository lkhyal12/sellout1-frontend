import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  const { user } = useAuthStore();
  const isAdmin = true;
  const cart = [1];
  const navigate = useNavigate();
  return (
    <div className=" text-white fixed top-0 left-0 right-0 px-5 md:px-0 bg-background h-15 flex items-center justify-center">
      <div className="container py-2 flex items-center justify-between mx-auto">
        <h2
          className=" font-bold text-xl md:text-2xl lg:text-3xl uppercase cursor-pointer"
          onClick={() => navigate("/")}
        >
          Sell<span className="text-orange-primary">Out</span>
        </h2>

        <nav className="flex items-center gap-5 text-gray-300">
          <Link to="/" className="hover:text-light-gray">
            Home
          </Link>
          <Link to="/categories" className="hover:text-light-gray">
            Categories
          </Link>

          <Link to="/about" className="hover:text-light-gray">
            About
          </Link>
          <Link to="/cart">
            <div className="relative">
              {user && cart.length > 0 && (
                <span className="size-4 bg-orange-primary text-white rounded-full -top-2 -right-2 absolute text-sm flex items-center justify-center">
                  {cart.length}
                </span>
              )}
              <ShoppingCart size={22} className="hover:text-light-gray" />
            </div>
          </Link>

          {isAdmin && (
            <Link
              to="/dashboard"
              className="bg-orange-primary text-white px-2 py-1 rounded-lg text-sm font-bold"
            >
              Admin
            </Link>
          )}

          {user && (
            <button className="bg-surface text-gray-300 flex items-center gap-1 px-2 py-1 font-semibold rounded-lg cursor-pointer">
              Logout <LogOut size={20} />
            </button>
          )}

          {!user && (
            <div className="flex items-center gap-3">
              <button
                className="bg-surface text-gray-300 flex items-center gap-1 px-2 py-1 font-semibold text-sm rounded-lg cursor-pointer"
                onClick={() => navigate("/sign-up")}
              >
                Sign Up <User size={20} />
              </button>

              <button
                className="bg-orange-primary text-gray-300 flex items-center gap-1 px-2 py-1 font-semibold rounded-lg cursor-pointer text-sm"
                onClick={() => navigate("/login")}
              >
                Log In <LogIn size={20} />
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
