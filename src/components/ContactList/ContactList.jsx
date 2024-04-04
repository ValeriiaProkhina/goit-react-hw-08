import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  return (
    <>
      {contacts.length > 0 ? (
        <ul className={css.list}>
          {contacts.map(({ ...contact }) => {
            return <Contact key={contact.id} contact={contact} />;
          })}
        </ul>
      ) : (
        <p>Contact list is empty.</p>
      )}
    </>
  );
}
