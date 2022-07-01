import React, { useEffect, useState, useCallback } from "react";
import UPDATE_CONTACTS from "../Components/update_contacts";

export default function Edit_Contact({params}) {
  var nuevo = parseInt(params.keyword)
  const url = "http://localhost:8080/api/contacto/"+nuevo; 

  const [data, setData] = useState();

  const fetchData = useCallback(async () => {
    const data = await fetch(url)
                .then(res => res.json())
                .then(res => res.data);
  
    setData(data);
  }, [url])

useEffect(() => {
  fetchData()
    // make sure to catch any error
    .catch(console.error);;
  }, [fetchData]);
  return (
    <div>
      <h1>Actualizar contacto</h1>
      {data ? <UPDATE_CONTACTS contacts={data[0]}></UPDATE_CONTACTS> : "Cargando"}
      
    </div>
  );
}
