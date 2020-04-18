import styled from 'styled-components';

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

    td:first-child {
        border-left-style: solid;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    td:last-child {
        border-right-style: solid;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
    }

    th:last-child {
        text-align: center;
    }
    table {
        font-size: 16px;
        width: 100%;

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
            padding: 0 10px;

            span {
                white-space: nowrap;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
`;
