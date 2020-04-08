import React from 'react';

import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { FaPlus, FaSearch } from 'react-icons/fa';
import api from '../../services/api';
import { Container, SubHeader } from './styles';

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
        id: 1,
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
    {
        id: 1,
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

                <button type="button" onClick={() => {}}>
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
                                    <div>
                                        <img
                                            src="https://api.adorable.io/avatars/50/abott@adorable.png"
                                            alt="NOME"
                                        />
                                        <span>{product.entregador}</span>
                                    </div>
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
                                    <span>...</span>
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
