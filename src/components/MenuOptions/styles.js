import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    position: relative;
`;

export const OptionsList = styled.div`
    z-index: 10000;

    box-shadow: 0px 0px 2px #00000026;
    display: ${props => (props.visible ? 'block' : 'none')};
    position: absolute;
    width: 150px;
    left: calc(50% - 75px);
    background: #ffffff;
    border-radius: 4px;
    padding: 10px;

    &::before {
        content: '';
        position: absolute;
        left: calc(50% - 5px);
        top: -5px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #0000001a;
    }
`;

export const Option = styled.div`
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
        font-size: 16px;
    }
`;
