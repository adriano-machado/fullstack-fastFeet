import React, { useState, useEffect, Fragment } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from 'use-lodash-debounce';
import { toast } from 'react-toastify';
import MenuOptions from '../../components/MenuOptions';
import Dialog from '../../components/Dialog';

import api from '../../services/api';

import { Container, SubHeader, RighterIcon, LastColumn } from './styles';

export default function Problems() {
    const [openModal, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const [problems, setProblems] = useState([]);
    const [idToSearch, setIdToSearch] = useState('');
    const debouncedValue = useDebounce(idToSearch, 600);
    const [atualPage, setPage] = useState(1);

    useEffect(() => {
        async function getProblems(page, id) {
            try {
                const response = await api.get(
                    `/delivery/problems${id && `/${id}`}?page=${page}`
                );

                setProblems(response.data);
                return response.data;
            } catch (err) {
                console.tron.log(err);
                toast.error('Problemas para buscar destinatários');
                return null;
            }
        }
        getProblems(atualPage, debouncedValue);
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

                // setProblems(
                //     problems.filter(
                //         problem => problem.id !== problemToDelete.id
                //     )
                // );
                toast.success('Encomenda cancelada!');
            } catch (err) {
                toast.error(
                    'Problemas para cancelar encomenda.\nEncomendas que já foram entregues não podem ser canceladas'
                );
            }
        }
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
                        placeholder="ID da encomenda"
                        value={idToSearch}
                        onChange={e => {
                            setIdToSearch(e.target.value);
                        }}
                    />
                </div>
            </SubHeader>

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
                                                handleCancelDelivery(problem)
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
        </Container>
    );
}
