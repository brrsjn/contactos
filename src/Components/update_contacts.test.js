import { render, screen } from '@testing-library/react';
import Update_Contacts from './update_contacts';


test('should render a form update', () => { 
    const component = render(<Update_Contacts></Update_Contacts>)
    expect(component.container).toHaveTextContent("Actualizar contacto")
    expect(component.container).toHaveTextContent("Enviar")
})