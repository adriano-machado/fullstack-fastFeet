import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from './styles';

export default function Dialog({ open, children, toggleModal }) {
    return (
        <Modal onClick={toggleModal} visible={open}>
            <ModalBody>{children}</ModalBody>
        </Modal>
    );
}

Dialog.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
    toggleModal: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
    open: false,
};
