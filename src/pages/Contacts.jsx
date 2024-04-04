import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../redux/contacts/contactsOps";
import { useContacts } from "../redux/contacts/contactsSlice";
import ContactList from "../components/ContactList/ContactList";
import ContactForm from "../components/ContactForm/ContactForm";
import SearchBox from "../components/SearchBox/SearchBox";
import Loader from "../components/Loader/Loader";

export default function Contacts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const loading = useContacts();
  const error = useContacts();

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox>Find contacts by name</SearchBox>
        <ContactList />
        {loading && !error && <Loader />}
        {error && <b>{error}</b>}
      </div>
    </>
  );
}
