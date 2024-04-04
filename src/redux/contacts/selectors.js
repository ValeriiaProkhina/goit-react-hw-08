import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filter/selectors";
import { useSelector } from "react-redux";

export const selectContacts = (state) => state.contacts;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  ({ items }, filter) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const useContacts = () => {
  const { items } = useSelector(selectContacts);
  const { loading } = useSelector(selectContacts);
  const { error } = useSelector(selectContacts);
  return items, loading, error;
};
