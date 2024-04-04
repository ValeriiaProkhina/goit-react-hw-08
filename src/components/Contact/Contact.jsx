import { FaPhone } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import { deleteContact, editContact } from "../../redux/contacts/contactsOps";
import { FiEdit3 } from "react-icons/fi";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact({ contact: { id, name, number } }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editContact({
        id,
        name: editedName,
        number: editedNumber,
      })
    )
      .unwrap()
      .then(() => {
        setIsEditing(false);
        toast.success("Update is success.");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <li className={css.listItem}>
      <Toaster />
      {isEditing ? (
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.itemInfo}>
            <label>
              <IoPersonSharp size="14" />
              <input
                className={css.input}
                type="text"
                name="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </label>
            <label>
              <FaPhone size="14" />
              <input
                className={css.input}
                type="text"
                name="number"
                value={editedNumber}
                onChange={(e) => setEditedNumber(e.target.value)}
              />
            </label>
          </div>

          <div className={css.button}>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      ) : (
        <>
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
          <div className={css.button}>
            <button type="button" onClick={() => setIsEditing(true)}>
              <FiEdit3 size="14" />
            </button>
            <button type="button" onClick={() => dispatch(deleteContact(id))}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
