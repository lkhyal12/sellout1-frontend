import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Info,
  LayoutGrid,
  LogIn,
  LogOut,
  Menu,
  MenuSquare,
  Shield,
  ShoppingCart,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { user, isAdmin, logout } = useAuthStore();
  const { cart, getCartProducts } = useCartStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  async function handleLogout() {
    const { success } = await logout();
    if (success) return navigate("/login");
  }

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return (
    <div className=" text-white fixed top-0 left-0 right-0 px-5 md:px-0  bg-background h-15 flex items-center justify-center w-full z-100">
      {windowWidth > 676 ? (
        <DesktopNavbar
          navigate={navigate}
          user={user}
          cart={cart}
          isAdmin={isAdmin}
          handleLogout={handleLogout}
        />
      ) : (
        <MobileNavbar
          navigate={navigate}
          user={user}
          isAdmin={isAdmin}
          handleLogout={handleLogout}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

function DesktopNavbar({ navigate, user, cart, isAdmin, handleLogout }) {
  return (
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
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white flex items-center gap-1 px-2 py-1 font-semibold rounded-lg cursor-pointer"
          >
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
  );
}

function MobileNavbar({ navigate, user, cart, isAdmin, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  // useEffect(() => {
  //   function handleClick(e) {
  //     if (menuRef.current && !menuRef.current.contains(e.target))
  //       setIsMenuOpen(false);
  //   }
  //   window.addEventListener("click", handleClick);
  //   return () => window.removeEventListener("click", handleClick);
  // }, [isMenuOpen]);
  return (
    <div className="w-full px-2 sm:px-4 flex items-center justify-between relative z-20">
      <div
        className=""
        ref={menuRef}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? (
          <X size={24} className="text-white cursor-pointer" />
        ) : (
          <Menu size={24} className="text-white cursor-pointer" />
        )}

        {isMenuOpen && (
          <NavMenu
            user={user}
            handleLogout={handleLogout}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isAdmin={isAdmin}
          />
        )}
      </div>

      <h2
        onClick={() => navigate("/")}
        className="text-white cursor-pointer text-2xl font-semibold"
      >
        Sell<span className="text-orange-primary">Out</span>
      </h2>

      <Link to="/cart">
        <div className="relative">
          {user && cart && cart.length > 0 && (
            <span className="size-4 bg-orange-primary text-white rounded-full -top-2 -right-2 absolute text-sm flex items-center justify-center">
              {cart.length}
            </span>
          )}
          <ShoppingCart size={22} className="hover:text-light-gray" />
        </div>
      </Link>
    </div>
  );
}

function NavMenu({ user, handleLogout, setIsMenuOpen, isMenuOpen, isAdmin }) {
  const menuRef = useRef();

  return (
    <div className="fixed top-16 w-full inset-0 z-9999 h-fit">
      <div className="h-full w-8/10 mx-auto bg-background/80 shadow rounded-2xl flex flex-col items-start px-5 gap-5 py-5">
        <Link to="/" className="flex items-center gap-5 text-lg w-full">
          <Home className="text-orange-primary" size={20} /> Home
        </Link>
        <Link to="/about" className="flex items-center gap-3 text-lg w-full">
          <Info className="text-orange-primary" size={20} /> About
        </Link>

        <Link to="/about" className="flex items-center gap-3 text-lg w-full">
          <LayoutGrid className="text-orange-primary" size={20} /> Categories
        </Link>

        {!user && (
          <Link to="/login" className="flex items-center gap-3 text-lg w-full">
            <User className="text-orange-primary" size={20} /> Login
          </Link>
        )}

        {!user && (
          <Link to="/signup" className="flex items-center gap-3 text-lg w-full">
            <UserPlus className="text-orange-primary" size={20} /> Sign Up
          </Link>
        )}
        {user && (
          <button
            onClick={handleLogout}
            to="/login"
            className="flex items-center gap-3 text-lg cursor-pointer "
          >
            <LogOut className="text-orange-primary" size={20} /> Logout
          </button>
        )}
        {user && isAdmin && (
          <Link
            to="/dashboard"
            className="flex items-center gap-3 text-lg w-full"
          >
            <Shield className="text-orange-primary" size={20} /> Admin Panel
          </Link>
        )}
      </div>
    </div>
  );
}
export default Navbar;
