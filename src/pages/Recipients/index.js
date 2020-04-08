import React from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';

import { Container, SubHeader } from './styles';

export default function Recipients() {
    return (
        <Container>
            <header>
                <strong>Gerenciando destinatários</strong>
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
        </Container>
    );
}
