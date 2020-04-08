import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    min-height: 100vh;
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
`;
