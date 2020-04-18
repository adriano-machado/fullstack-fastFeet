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
import Loading from '~/components/Loading';

import {
    Container,
    SubHeader,
    RighterIcon,
    LastColumn,
    RowIcons,
} from './styles';
import { ROUTES } from '~/consts';

export default function Recipients() {
    const [recipients, setRecipients] = useState([]);
    const [searchName, setSearchName] = useState('');
    const debouncedValue = useDebounce(searchName, 600);
    const [atualPage, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMoreContent, setHasMoreContent] = useState(true);
    useEffect(() => {
        async function getRecipients(page, q) {
            try {
                setLoading(true);
                const response = await api.get(`/recipients`, {
                    params: {
                        page,
                        q,
                    },
                });
                if (response.data.length < 6) {
                    setHasMoreContent(false);
                }
                setRecipients(response.data);
                setLoading(false);

                return response.data;
            } catch (err) {
                setLoading(false);

                console.tron.log(err);
                toast.error('Problemas para buscar destinatários');
                return null;
            }
        }
        getRecipients(atualPage, debouncedValue);
    }, [atualPage, debouncedValue]);
    function redirectToCreate() {
        history.push(ROUTES.RECIPIENTS_CREATE);
    }

    async function handleDeleteRecipient(id) {
        if (
            window.confirm(
                `Tem certeza que deseja deletar o destinatário #${id}?`
            )
        ) {
            try {
                await api.delete(`recipients/${id}`);

                setRecipients(
                    recipients.filter(recipient => recipient.id !== id)
                );
                toast.success('Destinatário deletado!');
            } catch (err) {
                toast.error(
                    'Problemas para deletar o destinatário.\n Verfique se ele não tem nenhuma entrega atribuída à ele'
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
        setSearchName(target.value);
        setPage(1);
        setHasMoreContent(true);
    }

    return (
        <Container>
            <header>
                <strong>Gerenciando destinatários</strong>
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
                <Loading> </Loading>
            ) : (
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <LastColumn>Ações</LastColumn>
                        </tr>
                    </thead>
                    <tbody>
                        {recipients.map(recipient => (
                            <Fragment key={recipient.id}>
                                <tr>
                                    <td>#{recipient.id}</td>

                                    <td>{recipient.name}</td>
                                    <td>
                                        <span>{`${recipient.street}, ${recipient.cep}, ${recipient.city} - ${recipient.state}`}</span>
                                    </td>

                                    <td>
                                        <RighterIcon>
                                            <MenuOptions
                                                deleteButtonAction={() =>
                                                    handleDeleteRecipient(
                                                        recipient.id
                                                    )
                                                }
                                                handleEditAction={() =>
                                                    history.push(
                                                        ROUTES.RECIPIENTS_EDIT.replace(
                                                            ':recipientId',
                                                            recipient.id
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
