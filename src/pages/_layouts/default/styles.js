import styled from 'styled-components';

import { darken } from 'polished';

export const Wrapper = styled.div`
    min-height: 100%;
    background: #f5f5f5;
    width: 100%;
`;

export const Content = styled.div`
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;

    table {
        width: 100%;
        /* background: #f5f5f5; */

        thead th {
            background: #f5f5f5;
            color: #444444;
            text-align: left;
            padding: 16px;
            font-size: 16px;
        }

        tr {
            height: 57px;
            font-size: 16px;
        }
        td {
            max-width: 400px;
            color: #666666;
            background: #fff;
            text-align: left;
            padding-left: 10px;
            border-radius: 4px;
            div {
                align-self: flex-start;
                display: flex;
                /* background-color: red; */
                justify-content: flex-start;
                align-items: center;

                img {
                    height: 35px;
                    width: 35px;
                    margin-right: 5px;
                    border-radius: 50%;
                }
            }
        }
    }
`;
