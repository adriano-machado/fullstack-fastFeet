import React from 'react';

import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { FaPlus, FaSearch } from 'react-icons/fa';
import api from '../../services/api';
import history from '../../services/history';

import { Container, SubHeader, AvatarContainer, CenteredIcon } from './styles';
import MenuOptions from '../../components/MenuOptions';
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
export default function Deliveries() {
    function redirectToCreate() {
        history.push(ROUTES.DELIVERIES_CREATE);
    }
    return (
        <Container>
            <header>
                <strong>Gerenciando encomendas</strong>
            </header>
            <SubHeader>
                <div>
                    <FaSearch size={16} color="#DDDDDD" />
                    <input placeholder="Buscar por encomendas" />
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
                        <th>Destinatário</th>
                        <th>Entregador</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Status</th>
                        <th>Ações</th>
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
                                    <span>{product.destinatario}</span>
                                </td>
                                <td>
                                    <AvatarContainer>
                                        <img
                                            src="https://api.adorable.io/avatars/50/abott@adorable.png"
                                            alt="NOME"
                                        />
                                        <span>{product.entregador}</span>
                                    </AvatarContainer>
                                </td>
                                <td>
                                    <span>{product.cidade}</span>
                                </td>
                                <td>
                                    <span>RJ</span>
                                </td>
                                <td>
                                    <span>PENDENTE</span>
                                </td>
                                <td>
                                    <CenteredIcon>
                                        <MenuOptions
                                            showVisibilityOption
                                            editOptionRedirectTo={ROUTES.DELIVERIES_EDIT.replace(
                                                ':deliveryId',
                                                product.id
                                            )}
                                        />
                                    </CenteredIcon>
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
