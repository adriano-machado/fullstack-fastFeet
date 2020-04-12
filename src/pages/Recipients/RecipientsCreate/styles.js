import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
    /* margin: 15px auto 0; */
    width: 100%;
    max-width: 900px;
    display: flex;
    margin: auto;
    flex-direction: column;
`;
export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 20px;

    div {
        background: transparent;
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    strong {
        color: #444444;
        font-size: 24px;
        /* margin: 0 15px; */
    }
    svg {
        margin: 0 5px;
    }
`;

export const Button = styled.button`
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
    margin-left: 16px;
    &:hover {
        background: ${darken(0.08, '#7d40e7')};
    }

    ${props =>
        props.grey &&
        css`
            background: #cccccc;

            &:hover {
                background: ${darken(0.08, '#cccccc')};
            }
        `}
    svg {
        margin-right: 8px;
    }
`;

export const FormContent = styled.div`
    width: 100%;
    text-align: center;
    background: rgba(255, 255, 255);
    padding: 0px 30px 30px;
    border-radius: 4px;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #999999;
            margin: 0 0 10px;

            &::placeholder {
                color: #999999;
                opacity: 0.4;
            }
        }

        label {
            color: #444444;
            font-weight: bold;
            text-align: left;
            margin-bottom: 5px;
        }

        span {
            color: ${lighten(0.1, '#de3b3b')};
            font-size: 12px;
            margin-top: -10px;
            text-align: start;
            margin-bottom: 5px;
            margin-left: 5px;
            font-weight: bold;
        }
    }
`;

export const Row1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    div {
        display: flex;
        flex-direction: column;
        width: 60%;
        input {
            min-width: 100%;
        }

        & + div {
            width: 20%;
            margin: 0px 0px 0px 18px;
        }
    }
`;

export const Row2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    div {
        display: flex;
        flex-direction: column;
        width: 33%;
        input {
            min-width: 100%;
        }

        & + div {
            margin: 0px 0px 0px 18px;
        }
    }
`;
