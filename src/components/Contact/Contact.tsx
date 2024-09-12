import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  const navigate = useNavigate();
  const contacts = useSelector((state: RootState) => state.contact.contact); // Fetching the contacts stored in redux store

  return (
    <div className="w-full h-screen flex flex-col items-center p-4">

      {/* Button to create a contact */}
      <button
        className="bg-blue-500 w-48 h-10 border-2 border-blue-500 rounded-lg p-2 text-white font-semibold drop-shadow-lg hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mb-8 sm:mb-14"
        onClick={() => navigate("/create-contact")}
      >
        Create Contact
      </button>

      {/* Rendering the ContactInfo component and if there are no contacts then rendering a icon with a message */}
      {contacts?.length === 0 ? (
        <div className="h-24 w-full max-w-xl flex flex-col sm:flex-row items-center justify-center gap-4 p-4">
          <MdCancel size={60} />
          <p className="text-center sm:text-left">
            No Contact found. Please add a contact from the Create Contact
            button.
          </p>
        </div>
      ) : (
        <ContactInfo />
      )}
    </div>
  );
};

export default Contact;
