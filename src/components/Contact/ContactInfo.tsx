import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteContact } from "../../redux/slice/contactSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contact.contact);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const navigate = useNavigate();

  //This will handle the show contact details functionality
  const handleShowDetails = (id: number) => {
    if (showDetails === id) {
      setShowDetails(null);
    } else {
      setShowDetails(id);
    }
  };

  //This will handle the delete contact functionality
  const handleDelete = (id: number) => {
    dispatch(deleteContact(id));
    toast.success("Contact is deleted successfully");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {/* Iterating through the contacts array and displaying the information */}
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white p-4 shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className="flex flex-col items-center mb-4">
            <h1 className="text-lg font-semibold text-gray-800">
              {contact.firstName}
            </h1>
            <h2 className="text-md text-gray-600">{contact.lastName}</h2>
            {showDetails === contact.id && (
              <p
                className={`font-medium ${
                  contact.active ? "text-green-600" : "text-red-500"
                }`}
              >
                {contact.active ? "Active" : " Inactive"}
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            {/* This button will navigate to the page with contact id where the user can edit the contact info */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => navigate(`/edit-contact/${contact.id}`)}
            >
              Edit
            </button>
            {/* This button is for showing the detials about the contact */}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => handleShowDetails(contact.id)}
            >
              Details
            </button>

            {/* This button is for deleting the existing contact */}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
