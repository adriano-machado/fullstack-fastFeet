import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Loading } from './styles';

export default function LoadingView() {
    return (
        <Loading>
            <FaSpinner color="#7d40e7" size={44} />
        </Loading>
    );
}
