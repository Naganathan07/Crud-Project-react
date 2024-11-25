import axios from 'axios'



export const getAllContactsAPI =async () =>{

    try {
        
        let allContacts = await axios.get('http://localhost:8000/contacts');
        return allContacts;

    } catch (error) {

        console.log(error);
        
    }
    
}

export const addContactsAPI = async (data) =>{
    try {
        let addContact = await axios.post('http://localhost:8000/contacts',{
            id:data.id,
            name:data.name,
            email:data.email,
            phone:data.phone
        })
        return addContact
    } catch (error) {
        console.log(error);
        
    }
}


export const searchContactAPI =  async (searchId) =>{
    try {
        
        let allContacts = await axios.get(`http://localhost:8000/contacts/${searchId}`);
        return allContacts;
    } catch (error) {

        console.log(error);
        
    }
}


export const deleteUserAPI = async(deleteId) =>{
    try {
        
        let allContacts = await axios.delete(`http://localhost:8000/contacts/${deleteId}`);
        return allContacts;
    } catch (error) {

        console.log(error);
        
    }
}

export const editUserAPI = async (editId, data) => {
    try {
        let updateContact = await axios.put(`http://localhost:8000/contacts/${editId}`, {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone
        });
        return updateContact;
    } catch (error) {
        console.log(error);
    }
}
