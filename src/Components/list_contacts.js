import React from "react";
import { Link } from "wouter";
import axios from 'axios'
import Save_Contacts from "./save_contacts";
import useLocation from "wouter"


export default function List_Contacts(props) {
  const [location, setLocation] = useLocation();
  console.log(location)
  return (
    <div>
      <table id="customers">
        <tbody>
          <tr>
            <th>Nombre</th>
            <th>Primer apellido</th>
            <th>Segundo apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th></th>
            <th></th>
          </tr>
          {!props.contacts ? (
            <tr>
              <td>Cargando...</td>
              <td>Cargando...</td>
              <td>Cargando...</td>
              <td>Cargando...</td>
              <td>Cargando...</td>
              <td>Cargando...</td>
              <td>Cargando...</td>
            </tr>
          ) : (
            props.contacts.map((contacto) => {
              return (
                <tr key={contacto.id}>
                  <td>{contacto.nombre}</td>
                  <td>{contacto.primer_apellido}</td>
                  <td>{contacto.segundo_apellido}</td>
                  <td>{contacto.email}</td>
                  <td>{contacto.numero_celular}</td>
                  <td>
                    <Link to={Save_Contacts}>
                      <button>Editar</button>
                    </Link>
                  </td>
                  <td>
                      <button onClick={()=>{
                            return axios.delete('http://localhost:8080/api/contacto/'+contacto.id)
                            .then(() => setLocation("/"));
                      }}>Eliminar</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
