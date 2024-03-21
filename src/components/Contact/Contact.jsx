import { FaPhone } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();
  return (
    <li className={css.listItem}>
      <div className={css.itemInfo}>
        <p>
          <IoPersonSharp size="14" />
          <span className={css.text}>{name}</span>
        </p>
        <p>
          <FaPhone size="14" />
          <span className={css.text}>{number}</span>
        </p>
      </div>
      <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
    </li>
  );
}
