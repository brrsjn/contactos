import React from "react";
import { Link } from "wouter";
import axios from 'axios'

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
              const auxval = `/actualizar-contacto/id_${contacto.id}`;
              return (
                <tr key={contacto.id}>
                  <td>{contacto.nombre}</td>
                  <td>{contacto.primer_apellido}</td>
                  <td>{contacto.segundo_apellido}</td>
                  <td>{contacto.email}</td>
                  <td>{contacto.numero_celular}</td>
                  <td>
                  <Link to={auxval}><button>Editar</button></Link>
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
