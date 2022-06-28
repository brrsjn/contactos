import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import getDataContacts from "../Services/contact";
import LIST_CONTACTS from "./list_contacts";

export default function Index() {
  const [contactos, setContactos] = useState();

  useEffect(() => {
    getDataContacts().then((todos) => setContactos(todos));
  }, []);

  return (
    <div>
          <h1>Listado de contactos</h1>
        <Link to="agregar-contacto"><button>+Agregar contacto</button></Link>
        <LIST_CONTACTS contacts={contactos}></LIST_CONTACTS>
    </div>
  );
}
