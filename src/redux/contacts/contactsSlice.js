import { createSlice } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from "./contactsOps";
import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filter/filtersSlice";
import { useSelector } from "react-redux";
import { logOut } from "../auth/authOps";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[itemIndex] = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(editContact.rejected, handleRejected);
  },
});

export default slice.reducer;

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
