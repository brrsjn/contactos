import { render, screen } from '@testing-library/react';
import Update_Contacts from './update_contacts';


test('should render a form update', () => { 
    const fakeContact = [{
        id: 12,
        nombre: "Joni Baez",
        primer_apellido: "32",
        segundo_apellido: "123, Charming Avenue",
        email: "test@test.com",
        numero_celular: "+56982576311"
    }];
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeContact)
        })
    );
    const component = render(<Update_Contacts contacts={fakeContact}></Update_Contacts>)
    expect(component.container).toHaveTextContent("Actualizar contacto")
    expect(component.container).toHaveTextContent("Enviar")
})