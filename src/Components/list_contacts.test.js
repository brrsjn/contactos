import List_Contacts from "./list_contacts";
import { render, screen } from '@testing-library/react';


test('should render a list with a mock', () => { 
    const fakeContact = [{
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
    const component = render(<List_Contacts contacts={fakeContact}></List_Contacts>)

    expect(component.container).toHaveTextContent("Editar")
    expect(component.container).toHaveTextContent("Eliminar")
    expect(component.container).toHaveTextContent(fakeContact[0].nombre)
})

test('should not render list', () => { 
    const component = render(<List_Contacts contacts={null}></List_Contacts>)

    expect(component.container).toHaveTextContent("Cargando")
})