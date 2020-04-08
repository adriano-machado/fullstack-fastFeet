import React from 'react';

import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { FaPlus, FaSearch } from 'react-icons/fa';
import api from '../../services/api';
import { Container, SubHeader } from './styles';

export default function Deliveries() {
    return (
        <Container>
            <header>
                <strong>Gerenciando encomendas</strong>
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
