import './App.css';

import { Route } from "wouter";

import Save_Contacts from './Components/save_contacts';
import Index from './Components';
import Update_Contacts from './Components/update_contacts';

const App = () => (
  <div>
    <Route path="/" component={Index}></Route>
    <Route path="/agregar-contacto" component={Save_Contacts}></Route>
    <Route path="/actualizar-contacto" component={Update_Contacts} ></Route>
  </div>
);

export default App;
