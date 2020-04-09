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
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px #00000033;
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 25px;
    border: 1px solid #888;
    width: 100%;
    border-radius: 4px;
    max-width: 450px;
    height: auto;
    word-break: break-all;

    strong {
        text-align: left;
        color: #444444;
        font-size: 14px !important;
        margin-bottom: 5px;
    }
    span {
        font-size: 16px;
        color: #666666;
        margin-top: 5px;
        strong {
            color: #666666;
            font-size: 16px;
        }
    }

    div {
        display: flex;
        flex-direction: column;

        & + div {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #eeeeee;
        }

        img {
            height: 50px;
        }
    }

    /* Could be more or less, depending on screen size */
`;
