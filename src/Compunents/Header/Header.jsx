import { NavLink } from "react-router";

function Header() {
  return (
    <div className="bg-(--background-secondary) mb-8 flex justify-center items-center gap-8 min-h-20 ">
      {/* <div className="cursor-pointer">Home</div>
      <div className="cursor-pointer">Form</div> */}

      <NavLink to="/" end className={ ({isActive})=> `${isActive ? " text-(--primary) ": ""}` }>Home</NavLink>
      <NavLink to="/form" className={ ({isActive})=> `${isActive ? "text-(--primary) ": ""}` }>Post</NavLink>
    </div>
  );
}

export default Header;
