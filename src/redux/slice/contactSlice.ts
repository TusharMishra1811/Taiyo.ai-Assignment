import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../types/ContactTypes";

const initialState = {
  contact: [] as Contact[],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactDetails: (state, action: PayloadAction<Contact>) => {
      state.contact.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contact = state.contact.filter((i) => i.id !== action.payload);
    },
    editContact: (state, action) => {
      const { id, updatedFields } = action.payload;
      const contactToUpdate = state.contact.find(
        (contact) => contact.id === id
      );

      if (contactToUpdate) {
        Object.assign(contactToUpdate, updatedFields);
      }
    },
  },
});

export default contactSlice;
export const { setContactDetails, deleteContact, editContact } =
  contactSlice.actions;
