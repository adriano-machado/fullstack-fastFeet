import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
    height: 100%;
    background: #7d40e7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 315px;
    text-align: center;
    background: rgba(255, 255, 255);
    padding: 60px 30px;
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
            }
        }

        label {
            color: #444444;
            font-weight: bold;
            text-align: left;
            margin-bottom: 5px;
        }

        span {
            color: #fb6f91;
            margin: -10px 0 10px 5px;
            align-self: flex-start;
            font-weight: bold;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            background: #7d40e7;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.3s;

            &:hover {
                background: ${darken(0.03, '#7D40E7')};
            }
        }

        a {
            color: #fff;
            margin-top: 15px;
            font-size: 16px;
            opacity: 0.7;

            &:hover {
                opacity: 1;
            }
        }
    }
`;
