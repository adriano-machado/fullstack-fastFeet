import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Modal = styled.div`
    display: ${props => (props.visible ? 'block' : 'none')};
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; /* Full height */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    margin: auto;
    overflow-y: hidden; /* Enable scroll if needed */
`;

export const ModalBody = styled.div`
    box-shadow: 0px 0px 10px #00000033;
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 100%;
    border-radius: 4px;
    max-width: 450px;
    /* Could be more or less, depending on screen size */
`;

export const aeew = styled.div`
    cursor: pointer;

    color: #999999;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    svg {
        margin: 0 5px;
    }
    & + div {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #eeeeee;
    }

    span {
        font-size: 14px;
    }
`;
