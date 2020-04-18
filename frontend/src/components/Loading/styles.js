import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg)
    }
`;
export const Loading = styled.div`
    color: #7d40e7;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 65vh;

    svg {
        animation: ${rotate} 2s linear infinite;
    }
`;
