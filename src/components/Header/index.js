import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../services/history';
import logoPurple from '../../assets/fastfeet-logo.png';
import { Container, Content, Profile, LinkHandle } from './styles';

export default function Header(props) {
    const profile = useSelector(state => state.user.profile);
    const activeRoute = history.location.pathname;
    const routesList = [
        { routeName: '/deliveries', label: 'ENCOMENDAS' },
        { routeName: '/deliverymans', label: 'ENTREGADORES' },
        { routeName: '/recipients', label: 'DESTINATÁRIOS' },
        { routeName: '/problems', label: 'PROBLEMAS' },
    ];
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logoPurple} alt="GoBarber" />

                    {routesList.map(route => (
                        <LinkHandle
                            key={route.routeName}
                            activeRoute={activeRoute.includes(route.routeName)}
                        >
                            <Link to={route.routeName}>{route.label}</Link>
                        </LinkHandle>
                    ))}
                </nav>

                <aside>
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">Sair do sistema</Link>
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
