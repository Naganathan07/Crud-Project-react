import './App.css';
import {
  addContactsAPI,
  deleteUserAPI,
  editUserAPI,
  getAllContactsAPI,
  searchContactAPI,
} from './services/Api';
import { useEffect, useState } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    try {
      const results = await getAllContactsAPI();
      setContacts(results.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        const updatedContact = await editUserAPI(formData.id, formData);
        setContacts(
          contacts.map((contact) =>
            contact.id === formData.id ? updatedContact.data : contact
          )
        ); 
        setIsEditing(false);
      } else {
        const createdContact = await addContactsAPI(formData);
        setContacts([...contacts, createdContact.data]);
      }
      setFormData({ id: '', name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };
  
  let searchContacts = async (event) => {

        try {
          let data = event.target.value;
    
          let result = await searchContactAPI(data);

          data ? setContacts([result.data]) : getAllContacts();
    
        } catch (error) {
    
          console.log(error);
    
        }
    
      }

  const deleteContact = async (id) => {
    if (window.confirm(`Are you sure you want to delete contact with ID: ${id}?`)) {
      try {
        await deleteUserAPI(id);
        setContacts(contacts.filter((contact) => contact.id !== id));
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const editContact = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    if (contactToEdit) {
      setFormData(contactToEdit);
      setIsEditing(true);
    } else {
      console.error('Contact not found.');
    }
  };

  return (
    
    <>
      <h1>Contact App</h1>
      <div>
        <input
          type="text"
          placeholder="Search Name"
          style={{ margin: '20px' }}
          onChange={searchContacts}
        />
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={handleFormChange}
          required
          disabled={isEditing} />
        <br />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleFormChange}
          required
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleFormChange}
          required
        />
        <br />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleFormChange}
          required
        />
        <br />
        <button type="submit" style={{ margin: '20px' }}>
          {isEditing ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>
      <div style={{ margin: '20px' }}>
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button onClick={() => editContact(contact.id)}>Edit</button>
                  <button onClick={() => deleteContact(contact.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
