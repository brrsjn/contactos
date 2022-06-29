import React from "react";
import { Link, Route } from "wouter";
import axios from 'axios'
import UPDATE_CONTACTS from "./update_contacts";


export default function List_Contacts(props) {
  return (
    <div>
      <table id="customers">
        <tbody key={props.table}>
          <tr >
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
                  <Route path="/actualizar-contacto" component={<UPDATE_CONTACTS contacts={contacto}></UPDATE_CONTACTS>}></Route>
                  <Link to="/actualizar-contacto"><button>Editar</button></Link>
                  </td>
                  <td>
                      <button onClick={()=>{
                            return axios.delete('http://localhost:8080/api/contacto/'+contacto.id)
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
