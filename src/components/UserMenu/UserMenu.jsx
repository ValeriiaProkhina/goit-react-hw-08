import { useDispatch } from "react-redux";
import { useAuth } from "../../redux/auth/authSlice";
import { logOut } from "../../redux/auth/authOps";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  return (
    <div className={css.container}>
      <p className={css.text}>Welcome, {user.name}</p>
      <button type="button" onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
}
