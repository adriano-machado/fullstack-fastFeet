import React, { useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import MenuOptions from '../../components/MenuOptions';
import Dialog from '../../components/Dialog';

import { Container, SubHeader, RighterIcon, LastColumn } from './styles';
import { ROUTES } from '../../consts';

const list = [
    {
        id: 1,
        destinatario:
            'Adriano ricardo machadoaaaaaaaaaaaaaaaaaaaaaamachadoaaaaaaaaaaaaaaaaaaaaaamachadoaaaaaaaaaaaaaaaaaaaaaamachadoaaaaaaaaaaaaaaaaaaaaaamachadoaaaaaaaaaaaaaaaaaaaaaamachadoaaaaaaaaaaaaaaaaaaaaaamachadoaaaaaaaaaaaaaaaaaaaaaa',
        entregador: 'adriano ricardo machado333',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'pendente',
    },
    {
        id: 2,
        destinatario: 'Adriano ricardo machado',
        entregador: 'adriano ricardo 66',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'pendente',
    },
    {
        id: 3,
        destinatario: 'Adriano ricardo machado',
        entregador: 'adriano ricardo machado444',
        cidade: ' Rio de janeiro',
        estado: 'RJ',
        status: 'pendente',
    },
    {
        id: 4,
        destinatario: 'Adriano ricardo machado555',
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
export default function Problems() {
    const [openModal, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    function toogleModal() {
        setOpen(!openModal);
    }

    function toogleModalAndChooseText(content) {
        setOpen(!openModal);
        setModalContent(content);
    }
    return (
        <Container>
            <Dialog toggleModal={toogleModal} open={openModal}>
                <strong>DESCRIÇÃO PROBLEMA</strong>
                <span>{modalContent}</span>
            </Dialog>
            <header>
                <strong>Problemas na entrega</strong>
            </header>
            <SubHeader>
                <div>
                    <FaSearch size={16} color="#DDDDDD" />
                    <input placeholder="Buscar por encomendas" />
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
                                    <RighterIcon>
                                        <MenuOptions
                                            visibilityAction={() =>
                                                toogleModalAndChooseText(
                                                    product.destinatario
                                                )
                                            }
                                            deleteText="Cancelar encomenda"
                                            showEditOption={false}
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
