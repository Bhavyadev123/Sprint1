import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ActionButton from './ActionButton';

const ContactList = ({ contacts, editContact, deleteContact }) => {
  return (
    <div>
      <h2>Contact List</h2>
      {contacts.length === 0 ? (
        <p>No contacts available.</p> // Display this message when there are no contacts
      ) : (
      <ul>
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <span>{`${index + 1}. ${contact.firstName} ${contact.lastName}`}</span>
            <br />

            {/* Phone number with icon */}
            <span className="contact-details">
              <a href={`tel:${contact.mobile}`} className="phone-link">
                <PhoneIcon /> {contact.mobile}
              </a>

              {/* Email with icon */}
              <a href={`mailto:${contact.email}`} className="email-link">
                <EmailIcon /> {contact.email}
              </a>
            </span>
            <br />

            <div>
            <ActionButton type="edit" onClick={() => editContact(index)} />
            <ActionButton type="delete" onClick={() => deleteContact(index)} />
            </div>
          </li>
        ))}
      </ul>
      )}
      <ToastContainer />
    </div>
  );
};

export default ContactList;
