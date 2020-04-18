import React, { useState, useEffect, Fragment } from 'react';
import {
    FaPlus,
    FaSearch,
    FaChevronLeft,
    FaChevronRight,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-lodash-debounce';
import MenuOptions from '~/components/MenuOptions';
import history from '~/services/history';
import api from '~/services/api';
import noAvatar from '~/assets/no-avatar.jpg';
import Loading from '~/components/Loading';

import {
    Container,
    SubHeader,
    RighterIcon,
    LastColumn,
    RowIcons,
} from './styles';
import { ROUTES } from '~/consts';

export default function Deliverymans() {
    const [deliverymans, setDeliverymans] = useState([]);
    const [searchName, setSearchName] = useState('');
    const debouncedValue = useDebounce(searchName, 600);
    const [atualPage, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMoreContent, setHasMoreContent] = useState(true);

    function redirectToCreate() {
        history.push(ROUTES.DELIVERYMANS_CREATE);
    }
    async function handleDeleteDeliveryman(id) {
        if (
            window.confirm(
                `Tem certeza que deseja deletar o entregador #${id}?`
            )
        ) {
            try {
                await api.delete(`deliverymans/${id}`);

                setDeliverymans(
                    deliverymans.filter(deliveryman => deliveryman.id !== id)
                );
                toast.success('Entregador deletado!');
            } catch (err) {
                toast.error(
                    'Problemas para deletar o entregador.\n Verfique se ele não tem nenhuma entrega atribuída à ele'
                );
            }
        }
    }
    useEffect(() => {
        async function getDeliverymans() {
            setLoading(true);
            try {
                const response = await api.get(`/deliverymans`, {
                    params: {
                        page: atualPage,
                        q: debouncedValue,
                    },
                });
                if (response.data.length < 6) {
                    setHasMoreContent(false);
                }
                setDeliverymans(response.data);
                setLoading(false);

                return response.data;
            } catch (err) {
                setLoading(false);

                toast.error('Problemas para buscar entregadores');
                return null;
            }
        }
        getDeliverymans();
    }, [atualPage, debouncedValue]);

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
        setSearchName(target.value);
        setPage(1);
        setHasMoreContent(true);
    }
    return (
        <Container>
            <header>
                <strong>Gerenciando entregadores</strong>
            </header>
            <SubHeader>
                <div>
                    <FaSearch size={16} color="#DDDDDD" />
                    <input
                        placeholder="Buscar por nome"
                        value={searchName}
                        onChange={handleInputChange}
                    />
                </div>

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
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <LastColumn>Ações</LastColumn>
                        </tr>
                    </thead>
                    <tbody>
                        {deliverymans.map(deliveryman => (
                            <Fragment key={deliveryman.id}>
                                <tr>
                                    <td>#{deliveryman.id}</td>

                                    <td>
                                        <img
                                            src={
                                                (deliveryman.avatar &&
                                                    deliveryman.avatar.url) ||
                                                noAvatar
                                            }
                                            alt={deliveryman.name}
                                        />
                                    </td>
                                    <td>
                                        <span>{deliveryman.name}</span>
                                    </td>

                                    <td>
                                        <span>{deliveryman.email}</span>
                                    </td>
                                    <td>
                                        <RighterIcon>
                                            <MenuOptions
                                                deleteButtonAction={() =>
                                                    handleDeleteDeliveryman(
                                                        deliveryman.id
                                                    )
                                                }
                                                handleEditAction={() =>
                                                    history.push(
                                                        ROUTES.DELIVERYMANS_EDIT.replace(
                                                            ':deliverymanId',
                                                            deliveryman.id
                                                        )
                                                    )
                                                }
                                            />
                                        </RighterIcon>
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
