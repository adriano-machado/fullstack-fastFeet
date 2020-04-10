import React, { useState, Fragment } from 'react';

import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { FaPlus, FaSearch } from 'react-icons/fa';
import api from '../../services/api';
import history from '../../services/history';

import {
    Container,
    SubHeader,
    AvatarContainer,
    CenteredIcon,
    Badge,
} from './styles';
import MenuOptions from '../../components/MenuOptions';
import { ROUTES } from '../../consts';

import Dialog from '../../components/Dialog';

const mapObjToColor = {
    pendente: '#C1BC35',
    cancelada: '#DE3B3B',
    retirada: '#4D85EE',
    entregue: '#2CA42B',
};
const list = [
    {
        id: 1,
        destinatario: 'Adriano ricardo machadoaaaaaaaaaaaaaaaaaaaaaa',
        entregador: 'adriano ricardo machado',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'entregue',
    },
    {
        id: 2,
        destinatario: 'Adriano ricardo machado',
        entregador: 'adriano ricardo machado',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'retirada',
    },
    {
        id: 3,
        destinatario: 'Adriano ricardo machado',
        entregador: 'adriano ricardo machado',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'entregue',
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
        id: 5,
        destinatario: 'Adriano ricardo machado',
        entregador: 'adriano ricardo machado',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'cancelada',
    },
    {
        id: 6,
        destinatario: 'Adriano ricardo machado',
        entregador: 'adriano ricardo machado',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'cancelada',
    },
];
export default function Deliveries() {
    const [openModal, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    function toogleModal() {
        setOpen(!openModal);
    }

    function toogleModalAndChooseText(delivery) {
        setOpen(!openModal);
        setModalContent(delivery);
    }
    function redirectToCreate() {
        history.push(ROUTES.DELIVERIES_CREATE);
    }
    return (
        <Container>
            <Dialog toggleModal={toogleModal} open={openModal}>
                <>
                    <div>
                        <strong>Informações da encomenda</strong>
                        <span>{modalContent.destinatario}</span>
                        <span>{modalContent.entregador}</span>
                        <span>{modalContent.id}</span>
                    </div>
                    <div>
                        <strong>Datas</strong>
                        <span>
                            <strong>Retirada: </strong>
                            {modalContent.status}
                        </span>
                        <span>
                            <strong>Entrega: </strong>
                            {modalContent.status}
                        </span>
                    </div>
                    <div>
                        <strong>Assinatura do destinatário</strong>
                        <img
                            src="https://api.adorable.io/avatars/50/abott@adorable.png"
                            alt="NOME"
                        />
                    </div>
                </>
            </Dialog>
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
                        <Fragment key={product.id}>
                            <tr>
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
                                    <Badge
                                        color={mapObjToColor[product.status]}
                                    >
                                        <span>{product.status}</span>
                                    </Badge>
                                </td>
                                <td>
                                    <CenteredIcon>
                                        <MenuOptions
                                            visibilityAction={() =>
                                                toogleModalAndChooseText(
                                                    product
                                                )
                                            }
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
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}
