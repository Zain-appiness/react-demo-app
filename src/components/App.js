import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveContacts) {
      setContacts(retrieveContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container" style={{ marginTop: '30px' }}>
      <Header />
      <div className="ui grid">
        <div className="row">
          <div className="column">
            <div className="ui segment">
              <h2 className="ui dividing header">Add Contact</h2>
              <AddContact addContactHandler={addContactHandler} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="ui segment">
              <h2 className="ui dividing header">Contact List</h2>
              <ContactList contacts={contacts} getContactId={removeContactHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
