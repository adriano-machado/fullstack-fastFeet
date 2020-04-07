import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logoPurple from '../../assets/fastfeet-logo.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
    const profile = useSelector(state => state.user.profile);
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logoPurple} alt="GoBarber" />
                    <Link to="/dashboard">ENCOMENDAS</Link>
                    <Link to="/dashboard">ENTREGADORES</Link>
                    <Link to="/dashboard">DESTINATÁRIOS</Link>
                    <Link to="/dashboard">PROBLEMAS</Link>
                </nav>

                <aside>
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        {/* <img
                            src={
                                profile.avatar.url ||
                                'https://api.adorable.io/avatars/50/abott@adorable.png'
                            }
                            alt="Avatar"
                        /> */}
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
