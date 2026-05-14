import { NavLink } from "react-router";

function Header() {
  return (
    <div className="bg-amber-200 mb-8 flex justify-center items-center gap-8 min-h-20 ">
      {/* <div className="cursor-pointer">Home</div>
      <div className="cursor-pointer">Form</div> */}

      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/form">Post</NavLink>
    </div>
  );
}

export default Header;
