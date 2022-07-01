import React, { useState } from "react";

import { Link } from "wouter";
import axios from 'axios'

export default function Update_Contacts(props) {
  const [formValue, setformValue] = useState({
    id: props.contacts.id,
    nombre: props.contacts.nombre,
    primer_apellido: props.contacts.primer_apellido,
    segundo_apellido: props.contacts.segundo_apellido,
    email: props.contacts.email,
    numero_celular: props.contacts.numero_celular,
  });
  const handleSubmit = () => {
    // store the states in the form data
    const loginFormData = {
      id: props.contacts.id,
      nombre: formValue.nombre,
      primer_apellido: formValue.primer_apellido,
      segundo_apellido: formValue.segundo_apellido,
      email: formValue.email,
      numero_celular: formValue.numero_celular,
    };
    return axios({
      url: `http://localhost:8080/api/contacto`,
      method: `PUT`,
      data: loginFormData
    })
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Link to="/"><button>Volver</button></Link>
      <form onSubmit={handleSubmit}>
        <h2>Actualizar contacto</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Ingresa un nombre"
          value={formValue.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="primer_apellido"
          placeholder="Ingresa el primer apellido"
          value={formValue.primer_apellido}
          onChange={handleChange}
        />
        <input
          type="text"
          name="segundo_apellido"
          placeholder="Ingresa el segundo apellido"
          value={formValue.segundo_apellido}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Ingresa un email"
          value={formValue.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="numero_celular"
          placeholder="Ingresa un numero de celular"
          value={formValue.numero_celular}
          onChange={handleChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
