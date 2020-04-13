import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-lodash-debounce';
import MenuOptions from '../../../components/MenuOptions';
import history from '../../../services/history';
import api from '../../../services/api';
import noAvatar from '../../../assets/no-avatar.jpg';

import { Container, SubHeader, RighterIcon, LastColumn } from './styles';
import { ROUTES } from '../../../consts';

export default function Deliverymans() {
    const [deliverymans, setDeliverymans] = useState([]);
    const [searchName, setSearchName] = useState('');
    const debouncedValue = useDebounce(searchName, 600);
    const [atualPage, setPage] = useState(1);
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
                    'Problemas para deletar o entregador.\n Verfique se ele não tem nenhuma entrega atribuída a ele'
                );
            }
        }
    }
    useEffect(() => {
        async function getDeliverymans(page, q) {
            try {
                const response = await api.get(
                    `/deliverymans?page=${page}&q=${q}`
                );

                setDeliverymans(response.data);
                return response.data;
            } catch (err) {
                toast.error('Problemas para buscar entregadores');
                return null;
            }
        }
        getDeliverymans(atualPage, debouncedValue);
    }, [atualPage, debouncedValue]);
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
                        onChange={e => setSearchName(e.target.value)}
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
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <LastColumn>Ações</LastColumn>
                    </tr>
                </thead>
                <tbody>
                    {deliverymans.map(deliveryman => (
                        <>
                            <tr key={deliveryman.id}>
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
                        </>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}
