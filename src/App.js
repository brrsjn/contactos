import './App.css';

import { Route } from "wouter";

import Save_Contacts from './Components/save_contacts';
import Index from './views/index';
import Edit_Contact from './views/edit_contact';

const App = () => (
  <div>
    <Route path="/" component={Index}></Route>
    <Route path="/agregar-contacto" component={Save_Contacts}></Route>
    <Route path="/actualizar-contacto/id_:keyword" component={Edit_Contact} ></Route>
  </div>
);

export default App;
