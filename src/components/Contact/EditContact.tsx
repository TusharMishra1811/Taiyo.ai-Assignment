import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { editContact } from "../../redux/slice/contactSlice";
import toast from "react-hot-toast";

const EditContact = () => {
  const { id } = useParams(); // obtaining the contact id from the params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector((state: RootState) => state.contact.contact);
  const contactToUpdate = contacts.find((contact) => contact.id === Number(id)); //finding which contact to be updated with the contact id passed in the params.

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    active: false,
  }); //defining local state for saving the edited contact info locally.

  //this ensures that the local state would be populated with the existing contact state.
  useEffect(() => {
    if (contactToUpdate) {
      setContact({
        firstName: contactToUpdate.firstName,
        lastName: contactToUpdate.lastName,
        active: contactToUpdate.active,
      });
    }
  }, [contactToUpdate]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // dispatch the editContact action with id and the updated fields.
    dispatch(editContact({ id: Number(id), updatedFields: contact }));
    toast.success("Contact is edited successfully");

    //navigating the user back to contact page
    navigate("/contact");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-3xl m-8">Create Contact</h1>
      <form
        className="space-y-4 p-4 bg-white shadow-md rounded-lg max-w-md w-full"
        onSubmit={submitHandler}
      >
        {/* First Name */}
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="first-name"
          >
            First Name:
          </label>
          <input
            type="text"
            id="first-name"
            placeholder="First Name"
            value={contact.firstName}
            onChange={(e) =>
              setContact({ ...contact, firstName: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="last-name"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="last-name"
            placeholder="Last Name"
            value={contact.lastName}
            onChange={(e) =>
              setContact({ ...contact, lastName: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Status:
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="active"
                checked={contact.active === true}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    active: e.target.value === "active",
                  })
                }
                className="form-radio text-blue-500 focus:ring-blue-400"
              />
              <span className="ml-2 text-gray-700">Active</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={contact.active === false}
                className="form-radio text-blue-500 focus:ring-blue-400"
                onChange={(e) =>
                  setContact({
                    ...contact,
                    active: e.target.value === "active",
                  })
                }
              />
              <span className="ml-2 text-gray-700">Inactive</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600 transition-all duration-300 ease-in-out"
        >
          Save Contact
        </button>
      </form>
    </div>
  );
};

export default EditContact;
