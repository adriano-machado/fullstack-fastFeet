import React, { useState, Fragment, useEffect } from 'react';

import { useDebounce } from 'use-lodash-debounce';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import api from '../../services/api';
import history from '../../services/history';
import noAvatar from '../../assets/no-avatar.jpg';

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
export default function Deliveries() {
    const [deliveries, setDeliveries] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const debouncedValue = useDebounce(searchProduct, 600);
    const [openModal, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [atualPage, setPage] = useState(1);

    function toogleModal() {
        setOpen(!openModal);
    }

    function toogleModalAndSetContent(delivery) {
        setOpen(!openModal);
        setModalContent(delivery);
    }
    function redirectToCreate() {
        history.push(ROUTES.DELIVERIES_CREATE);
    }

    useEffect(() => {
        async function getDeliveries(page, q) {
            try {
                const response = await api.get(
                    `/deliveries?page=${page}&q=${q}`
                );

                setDeliveries(
                    response.data.map(delivery => ({
                        ...delivery,
                        formattedEndDate:
                            delivery.end_date &&
                            format(
                                parseISO(delivery.end_date),
                                "d'/'MM'/'yyyy"
                            ),
                        formattedStartDate:
                            delivery.start_date &&
                            format(
                                parseISO(delivery.start_date),
                                "d'/'MM'/'yyyy"
                            ),
                    }))
                );
                return response.data;
            } catch (err) {
                console.log(err);
                toast.error('Problemas para buscar as encomendas');
                return null;
            }
        }
        getDeliveries(atualPage, debouncedValue);
    }, [atualPage, debouncedValue]);
    return (
        <Container>
            <Dialog toggleModal={toogleModal} open={openModal}>
                {modalContent && (
                    <>
                        <div>
                            <strong>Informações da encomenda</strong>
                            <span>
                                {`${modalContent.recipient.street}, ${modalContent.recipient.number}`}
                            </span>
                            <span>
                                {`${modalContent.recipient.city} -
                                ${modalContent.recipient.state}`}
                            </span>
                            <span>{modalContent.recipient.cep}</span>
                        </div>
                        <div>
                            <strong>Datas</strong>
                            <span>
                                <strong>Retirada: </strong>
                                {modalContent.formattedStartDate}
                            </span>
                            <span>
                                <strong>Entrega: </strong>
                                {modalContent.formattedEndDate}
                            </span>
                        </div>
                        <div>
                            <strong>Assinatura do destinatário</strong>

                            {modalContent.signature && (
                                <img
                                    src={modalContent.signature.url}
                                    alt="Assinatura"
                                />
                            )}
                        </div>
                    </>
                )}
            </Dialog>
            <header>
                <strong>Gerenciando encomendas</strong>
            </header>
            <SubHeader>
                <div>
                    <FaSearch size={16} color="#DDDDDD" />
                    <input
                        placeholder="Nome do produto"
                        value={searchProduct}
                        onChange={e => {
                            setSearchProduct(e.target.value);
                        }}
                    />
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
                        <th>Produto</th>

                        <th>Entregador</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.map(delivery => (
                        <Fragment key={delivery.id}>
                            <tr>
                                <td>
                                    #{delivery.id}
                                    {/* <img src={product.image} alt={product.title} /> */}
                                </td>
                                <td>
                                    <span>{delivery.recipient.name}</span>
                                </td>
                                <td>
                                    <span>{delivery.product}</span>
                                </td>
                                <td>
                                    <AvatarContainer>
                                        <img
                                            src={
                                                (delivery.deliveryman.avatar &&
                                                    delivery.deliveryman.avatar
                                                        .url) ||
                                                noAvatar
                                            }
                                            alt={delivery.deliveryman.name}
                                        />
                                        <span>{delivery.deliveryman.name}</span>
                                    </AvatarContainer>
                                </td>
                                <td>
                                    <span>{delivery.recipient.city}</span>
                                </td>
                                <td>
                                    <span>{delivery.recipient.state}</span>
                                </td>
                                <td>
                                    <Badge
                                        color={mapObjToColor[delivery.status]}
                                    >
                                        <span>{delivery.status}</span>
                                    </Badge>
                                </td>
                                <td>
                                    <CenteredIcon>
                                        <MenuOptions
                                            visibilityAction={() =>
                                                toogleModalAndSetContent(
                                                    delivery
                                                )
                                            }
                                            showVisibilityOption
                                            editOptionRedirectTo={ROUTES.DELIVERIES_EDIT.replace(
                                                ':deliveryId',
                                                delivery.id
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
