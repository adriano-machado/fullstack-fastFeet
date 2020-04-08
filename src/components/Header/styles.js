import styled from 'styled-components';

export const Container = styled.div`
    background: #fff;
    padding: 0 30px;
`;

export const Content = styled.div`
    height: 64px;
    /* max-width: 900px; */
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    nav {
        display: flex;
        align-items: center;

        img {
            margin-right: 20px;
            padding-right: 20px;
            border-right: 1px solid #eee;
        }
    }

    aside {
        display: flex;
        align-items: center;
    }
`;

export const Profile = styled.div`
    display: flex;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #eee;
    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #666666;
        }
        a {
            display: block;
            margin-top: 2px;
            font-size: 14px;
            color: #de3b3b;
        }
    }
`;

export const LinkHandle = styled.div`
    a {
        text-decoration: none;
        font-weight: bold;
        color: ${props => (props.activeRoute ? '#444444' : '#999999')};
        margin-left: 20px;
    }
`;
