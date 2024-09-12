import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setContactDetails } from "../../redux/slice/contactSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    active: false,
  }); // defining the initial state of the contact

  //Submit handlere will take care of the logic for submitting the contact info
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    //validating that the user has provided all the fields or not.
    if (contact.lastName === "" || contact.lastName === "") {
      toast.error("Please provide all the fields");
      return;
    }

    // copy the existing contact to new object and add the id field to it
    const newContact = {
      ...contact,
      id: Date.now(),
    };

    //dispatch setContactDetails action to save a new contact in redux store
    dispatch(setContactDetails(newContact));
    toast.success("Contact is created successfully");

    //navigate the user back to contact page
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

export default CreateContact;
