import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex items-center justify-center">
      <ul className="flex items-center gap-6 justify-center">
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/login'}>Login</Link>
        </li>
        <li>
          <Link to={'/register'}>Signup</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
