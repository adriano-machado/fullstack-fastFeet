import React, { useState, Fragment, useEffect } from 'react';

import { useDebounce } from 'use-lodash-debounce';
import {
    FaPlus,
    FaSearch,
    FaChevronLeft,
    FaChevronRight,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import api from '~/services/api';
import history from '~/services/history';
import noAvatar from '~/assets/no-avatar.jpg';

import {
    Container,
    SubHeader,
    AvatarContainer,
    CenteredIcon,
    Badge,
    RowIcons,
} from './styles';
import MenuOptions from '~/components/MenuOptions';
import { ROUTES } from '~/consts';
import Dialog from '~/components/Dialog';
import Loading from '~/components/Loading';

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
    const [loading, setLoading] = useState(false);
    const [hasMoreContent, setHasMoreContent] = useState(true);
    const [checked,setChecked] = useState(false)

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
            setLoading(true);
            try {
                const response = await api.get(`/deliveries?`, {
                    params: {
                        page,
                        q,
                        filter: checked? "problems" : ""
                    },
                });
                if (response.data.length < 6) {
                    setHasMoreContent(false);
                }
                setDeliveries(
                    response.data.map(delivery => ({
                        ...delivery,
                        formattedEndDate:
                            delivery.end_date ? format(
                                parseISO(delivery.start_date),
                                "d'/'MM'/'yyyy"
                            )
                          : '-- / -- / --',
                            formattedStartDate: delivery.start_date
                            ? format(
                                  parseISO(delivery.start_date),
                                  "d'/'MM'/'yyyy"
                              )
                            : '-- / -- / --',
                    }))
                );
                setLoading(false);
                return response.data;
            } catch (err) {
                setLoading(false);
                toast.error('Problemas para buscar as encomendas');
                return null;
            }
        }
        getDeliveries(atualPage, debouncedValue);
    }, [atualPage, debouncedValue,checked]);

    async function handleDeleteDelivery(id) {
        if (
            window.confirm(`Tem certeza que deseja deletar a encomenda #${id}?`)
        ) {
            try {
                await api.delete(`deliveries/${id}`);

                setDeliveries(
                    deliveries.filter(delivery => delivery.id !== id)
                );
                toast.success('Encomenda deletada!');
            } catch (err) {
                toast.error(
                    'Problemas para deletar a encomenda.\nApenas encomendas com status "pendente" podem ser deletadas '
                );
            }
        }
    }

    function handleNextPage() {
        if (!hasMoreContent) return;
        setPage(atualPage + 1);
    }
    function handlePreviusPage() {
        if (atualPage <= 1) return;
        setPage(atualPage - 1);
        setHasMoreContent(true);
    }
    function handleInputChange({ target }) {
        setSearchProduct(target.value);
        setPage(1);
        setHasMoreContent(true);
    }
    function handleFilter() {
        setChecked(!checked)
        setPage(1);
        setHasMoreContent(true);
    }
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
                        onChange={handleInputChange}
                    />
                </div>
                <label>
                    <input
                        id="filter"
                        type="checkbox"
                        value={checked}
                        onChange={handleFilter}></input>
                    <span
                    htmlFor="filter">
                        Apenas com problemas
                    </span>
                </label>

                <button type="button" onClick={redirectToCreate}>
                    <FaPlus size={16} />
                    CADASTRAR
                </button>
            </SubHeader>
            {loading ? (
                <Loading />
            ) : (
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
                                                    (delivery.deliveryman
                                                        .avatar &&
                                                        delivery.deliveryman
                                                            .avatar.url) ||
                                                    noAvatar
                                                }
                                                alt={delivery.deliveryman.name}
                                            />
                                            <span>
                                                {delivery.deliveryman.name}
                                            </span>
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
                                            color={
                                                mapObjToColor[delivery.status]
                                            }
                                        >
                                            <span>{delivery.status}</span>
                                        </Badge>
                                    </td>
                                    <td>
                                        <CenteredIcon>
                                            <MenuOptions
                                                deleteButtonAction={() =>
                                                    handleDeleteDelivery(
                                                        delivery.id
                                                    )
                                                }
                                                visibilityAction={() =>
                                                    toogleModalAndSetContent(
                                                        delivery
                                                    )
                                                }
                                                handleEditAction={() =>
                                                    history.push(
                                                        ROUTES.DELIVERIES_EDIT.replace(
                                                            ':deliveryId',
                                                            delivery.id
                                                        )
                                                    )
                                                }
                                            />
                                        </CenteredIcon>
                                    </td>
                                </tr>
                                <br />
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            )}
            <RowIcons>
                <FaChevronLeft
                    onClick={handlePreviusPage}
                    color="#999999"
                    size={40}
                />
                <FaChevronRight
                    onClick={handleNextPage}
                    color="#999999"
                    size={40}
                />
            </RowIcons>
        </Container>
    );
}
