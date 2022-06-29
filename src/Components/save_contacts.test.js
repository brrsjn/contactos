import { render, screen } from '@testing-library/react';
import Save_Contacts from "./save_contacts";


test('should render a form', () => { 
    const component = render(<Save_Contacts></Save_Contacts>)
    expect(component.container).toHaveTextContent("Agregar contacto")
    expect(component.container).toHaveTextContent("Enviar")
})