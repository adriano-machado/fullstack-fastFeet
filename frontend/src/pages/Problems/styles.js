import styled from 'styled-components';
import { darken } from 'polished';

export const LastColumn = styled.th`
    text-align: right !important;
`;
export const Container = styled.div`
    /* margin: 15px auto 0; */
    width: 100%;
    display: flex;
    flex-direction: column;

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        button {
            background: none;
            border: 0;
        }

        strong {
            color: #444444;
            font-size: 24px;
            /* margin: 0 15px; */
        }
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 15px;
        margin-top: 10px;
    }

    img {
        height: 35px;
        width: 35px;
        margin-right: 5px;
        border-radius: 50%;
    }
`;

export const SubHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 40px 0 10px;

    div {
        svg {
            margin-right: 8px;
        }
        border: 1px solid #dddddd;
        background: #ffffff;
        border-radius: 4px;
        height: 36px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    input {
        background: #ffffff;
        border: 0;
        color: #999999;

        &::placeholder {
            color: #999999;
        }
    }
    button {
        height: 36px;
        background: #7d40e7;
        color: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        border-radius: 4px;
        padding: 9px 16px;
        &:hover {
            background: ${darken(0.08, '#7d40e7')};
        }
    }

    svg {
        margin: 0 5px;
    }
`;

export const RighterIcon = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;

    svg {
        cursor: pointer;
    }
`;

export const RowIcons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    svg {
        cursor: pointer;
        margin: 10px;

        &:hover {
            opacity: 0.7;
        }
    }
`;
