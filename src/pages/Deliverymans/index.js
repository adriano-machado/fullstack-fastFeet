import React from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import MenuOptions from '../../components/MenuOptions';
import history from '../../services/history';

import { Container, SubHeader, RighterIcon, LastColumn } from './styles';
import { ROUTES } from '../../consts';

const list = [
    {
        id: 1,
        destinatario: 'Adriano ricardo machadoaaaaaaaaaaaaaaaaaaaaaa',
        entregador: 'adriano ricardo machado',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'pendente',
    },
    {
        id: 2,
        destinatario: 'Adriano ricardo machado',
        entregador: 'adriano ricardo machado',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'pendente',
    },
    {
        id: 3,
        destinatario: 'Adriano ricardo machado',
        entregador: 'adriano ricardo machado',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'pendente',
    },
    {
        id: 4,
        destinatario: 'Adriano ricardo machado',
        entregador: 'adriano ricardo machado',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'pendente',
    },
    {
        id: 1,
        destinatario: 'Adriano ricardo machado',
        entregador: 'adriano ricardo machado',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'pendente',
    },
];
export default function Deliverymans() {
    function redirectToCreate() {
        history.push(ROUTES.DELIVERYMANS_CREATE);
    }
    return (
        <Container>
            <header>
                <strong>Gerenciando entregadores</strong>
            </header>
            <SubHeader>
                <div>
                    <FaSearch size={16} color="#DDDDDD" />
                    <input placeholder="Buscar por entregadores" />
                </div>

                <button type="button" onClick={redirectToCreate}>
                    <FaPlus size={16} />
                    CADASTRAR
                </button>
            </SubHeader>
            <table cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <LastColumn>Ações</LastColumn>
                    </tr>
                </thead>
                <tbody>
                    {list.map(product => (
                        <>
                            <tr key={product.id}>
                                <td>
                                    {product.id}
                                    {/* <img src={product.image} alt={product.title} /> */}
                                </td>

                                <td>
                                    <img
                                        src="https://api.adorable.io/avatars/50/abott@adorable.png"
                                        alt="NOME"
                                    />
                                </td>
                                <td>
                                    <span>{product.cidade}</span>
                                </td>

                                <td>
                                    <span>PENDENTE</span>
                                </td>
                                <td>
                                    <RighterIcon>
                                        <MenuOptions
                                            showVisibilityOption={false}
                                            editOptionRedirectTo={ROUTES.DELIVERYMANS_EDIT.replace(
                                                ':deliverymanId',
                                                product.id
                                            )}
                                        />
                                    </RighterIcon>
                                </td>
                            </tr>
                            <br />
                        </>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}
