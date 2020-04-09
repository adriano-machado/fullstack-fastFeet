import React, { useState, useEffect, useMemo } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdVisibility, MdEdit, MdDeleteForever } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from './styles';
import history from '../../services/history';

export default function Dialog({ open }) {
    const [visible, setVisible] = useState(true);

    function handleToggleVisible() {
        setVisible(!visible);
    }

    function handleEditActon() {}

    return (
        <Modal onClick={handleToggleVisible} visible={visible}>
            <ModalBody>
                <h1>TITLE</h1>
                <p>MEU GRANDE PÁGRAFO</p>
            </ModalBody>
        </Modal>
    );
}

Dialog.propTypes = {
    showVisibilityOption: PropTypes.bool,
    showEditOption: PropTypes.bool,
    editOptionRedirectTo: PropTypes.string,
    deleteText: PropTypes.string,
};

Dialog.defaultProps = {
    showVisibilityOption: true,
    showEditOption: true,
    editOptionRedirectTo: '',
    deleteText: 'Excluir',
};
