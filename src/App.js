import React, { useState } from 'react';
import './App.css';
import ContactList from '../src/components/ContactList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActionButton from './components/ActionButton'; // Import ActionButton


function App() {
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  
  // Function to validate mobile number
  const isValidMobileNumber = (number) => /^[0-9]{10}$/.test(number);

  const addOrUpdateContact = (e) => {
    e.preventDefault();

    if (!isValidMobileNumber(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    const newContact = { firstName, lastName, mobile, email };

    if (isEditing) {
      const updatedContacts = contacts.map((contact, index) =>
        index === currentIndex ? newContact : contact
      );
      setContacts(updatedContacts);
      toast.success("Contact updated successfully!");
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setContacts([...contacts, newContact]);
      toast.success("Contact added successfully!");
    }

    // Reset input fields
    setFirstName('');
    setLastName('');
    setMobile('');
    setEmail('');
    setShowForm(false); // Hide form after adding/updating contact
  };

  const editContact = (index) => {
    const contact = contacts[index];
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setMobile(contact.mobile);
    setEmail(contact.email);
    setIsEditing(true);
    setCurrentIndex(index);
    setShowForm(true); // Show form when editing contact
  };

  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    toast.success("Contact deleted successfully!");
  };

  return (
    <div className="App">
      <h1>Contact Manager</h1>

      {!showForm && (
        <div>
          <button onClick={() => setShowForm(true)}>Add Contact</button>
          {contacts.length === 0 && <p>No contacts available</p>}
        </div>
      )}

      {showForm && (
        <form onSubmit={addOrUpdateContact}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Use ActionButton component for adding or updating contact */}
          <ActionButton type={isEditing ? 'edit' : 'add'} onClick={addOrUpdateContact} />
        </form>
      )}

      {contacts.length > 0 && (
        <ContactList
          contacts={contacts}
          editContact={editContact}
          deleteContact={deleteContact}
        />
      )}

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
