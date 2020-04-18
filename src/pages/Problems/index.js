import React, { useState, useEffect, Fragment } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDebounce } from 'use-lodash-debounce';
import { toast } from 'react-toastify';
import MenuOptions from '~/components/MenuOptions';
import Dialog from '~/components/Dialog';
import Loading from '~/components/Loading';

import api from '~/services/api';

import {
    Container,
    SubHeader,
    RighterIcon,
    LastColumn,
    RowIcons,
} from './styles';

export default function Problems() {
    const [openModal, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const [problems, setProblems] = useState([]);
    const [description, setDescription] = useState('');
    const debouncedValue = useDebounce(description, 600);
    const [atualPage, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMoreContent, setHasMoreContent] = useState(true);
    useEffect(() => {
        async function getProblems() {
            try {
                setLoading(true);
                const response = await api.get(`/delivery/problems`, {
                    params: { page: atualPage, q: debouncedValue },
                });

                setProblems(response.data);
                if (response.data.length < 6) {
                    setHasMoreContent(false);
                }
                setLoading(false);

                return response.data;
            } catch (err) {
                setLoading(false);

                toast.error('Problemas para buscar destinatários');
                return null;
            }
        }
        getProblems();
    }, [atualPage, debouncedValue]);
    function toogleModal() {
        setOpen(!openModal);
    }

    function toogleModalAndChooseText(content) {
        setOpen(!openModal);
        setModalContent(content);
    }
    async function handleCancelDelivery(problemToDelete) {
        if (
            window.confirm(
                `Tem certeza que deseja cancelar a encomenda #${problemToDelete.delivery.id}?`
            )
        ) {
            try {
                await api.delete(
                    `problem/${problemToDelete.id}/cancel-delivery`
                );

                toast.success('Encomenda cancelada!');
            } catch (err) {
                toast.error(
                    'Problemas para cancelar encomenda.\nEncomendas que já foram entregues não podem ser canceladas'
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
        setDescription(target.value);
        setPage(1);
        setHasMoreContent(true);
    }
    return (
        <Container>
            <Dialog toggleModal={toogleModal} open={openModal}>
                <>
                    <strong>DESCRIÇÃO PROBLEMA</strong>
                    <span>{modalContent}</span>
                </>
            </Dialog>
            <header>
                <strong>Problemas na entrega</strong>
            </header>
            <SubHeader>
                <div>
                    <FaSearch size={16} color="#DDDDDD" />
                    <input
                        placeholder="Descrição"
                        value={description}
                        onChange={handleInputChange}
                    />
                </div>
            </SubHeader>
            {loading ? (
                <Loading />
            ) : (
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Encomenda</th>
                            <th>Problema</th>
                            <LastColumn>Ações</LastColumn>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map(problem => (
                            <Fragment key={problem.id}>
                                <tr>
                                    <td>#{problem.delivery.id}</td>

                                    <td>
                                        <span>{problem.description}</span>
                                    </td>

                                    <td>
                                        <RighterIcon>
                                            <MenuOptions
                                                deleteButtonAction={() =>
                                                    handleCancelDelivery(
                                                        problem
                                                    )
                                                }
                                                visibilityAction={() =>
                                                    toogleModalAndChooseText(
                                                        problem.description
                                                    )
                                                }
                                                deleteText="Cancelar encomenda"
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
