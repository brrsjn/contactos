import './App.css';

import { Route } from "wouter";

import Save_Contacts from './Components/save_contacts';
import Index from './Components';

const App = () => (
  <div>
    <Route path="/" component={Index}></Route>
    <Route path="/agregar-contacto" component={Save_Contacts}></Route>
  </div>
);

export default App;
