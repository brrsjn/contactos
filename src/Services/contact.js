import axios from 'axios'


export default function getDataContacts(){
    const url = "http://localhost:8080/api/listar-contactos" 
    return fetch(url)
    .then(res => res.json())
    .then(res => res.data);
};

export async function saveContact(contacto) {
    try {
        const response = await axios({
            url: `http://localhost:8080/api/contacto`,
            method: `POST`,
            data: contacto
        })
        return response
    } catch (e) {
        console.log(e)
    }
}
