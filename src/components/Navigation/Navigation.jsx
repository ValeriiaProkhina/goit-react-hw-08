import { NavLink } from "react-router-dom";
import { useAuth } from "../../redux/auth/authSlice";
import css from "./Navigation.module.css";

export default function Navigation() {
  const { isLoggedIn } = useAuth();
  return (
    <nav className={css.navList}>
      <NavLink to="/">Home</NavLink>
      {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
    </nav>
  );
}
