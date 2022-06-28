import React, { useState } from "react";

import { Link } from "wouter";
import axios from 'axios'

import { useLocation} from "wouter"



export default function Save_Contacts() {
  const [formValue, setformValue] = useState({
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    email: "",
    numero_celular: "",
  });
  const [location, setLocation] = useLocation();
  console.log(location)
  const handleSubmit = async () => {
    // store the states in the form data
    const loginFormData = {
      nombre: formValue.nombre,
      primer_apellido: formValue.primer_apellido,
      segundo_apellido: formValue.segundo_apellido,
      email: formValue.email,
      numero_celular: formValue.numero_celular,
    };
    return axios({
      url: `http://localhost:8080/api/contacto`,
      method: `POST`,
      data: loginFormData
    })
    .then((res)=>{
      setLocation("/")
    })
    .catch( e => {
      console.log(e)
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
        <h2>Agregar contacto</h2>
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
