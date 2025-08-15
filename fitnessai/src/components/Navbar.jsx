import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "react-oauth2-code-pkce";
import { useContext, useState, useRef, useEffect } from "react";
import { logout } from "../store/authSlice";
import { MdLogout, MdPerson } from "react-icons/md";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    function handle(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    if (open) window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, [open]);


  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow sticky top-0 z-20">
      <Link to="/dashboard" className="text-2xl font-bold tracking-wide text-sky-700">FitnessAI</Link>

      <ul className="hidden md:flex gap-6 text-gray-700 font-semibold">
        <li><Link to="/dashboard" className="hover:text-sky-700">Dashboard</Link></li>
        <li><Link to="/activities" className="hover:text-sky-700">Activities</Link></li>
        <li><Link to="/profile" className="hover:text-sky-700">Profile</Link></li>
      </ul>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-sky-100 focus:outline-none transition"
        >
          <FaUserCircle className="text-2xl text-gray-600" />
          <span className="font-semibold text-gray-700">{user?.name || user?.preferred_username || "User"}</span>
        </button>
        {open && (
          <div className="absolute right-0 w-52 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
            <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-sky-50 gap-2" onClick={() => setOpen(false)}><MdPerson />Profile</Link>
            <button variant="contained" color="secondary" className="flex w-full items-center px-4 py-2 hover:bg-sky-50 gap-2 text-left" onClick={logOut}><MdLogout />Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
