import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { MdVisibility, MdEdit, MdDeleteForever } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, OptionsList, Option } from './styles';

export default function MenuOptions({
    deleteText,
    visibilityAction,
    deleteButtonAction,
    handleEditAction,
}) {
    const [visible, setVisible] = useState(false);

    function handleToggleVisible() {
        setVisible(!visible);
    }

    return (
        <Container onClick={handleToggleVisible}>
            <FaEllipsisH color="#C6C6C6" size={18} />
            <OptionsList visible={visible}>
                {visibilityAction && (
                    <Option onClick={visibilityAction}>
                        <MdVisibility color="#8E5BE8" size={18} />

                        <span>Visualizar</span>
                    </Option>
                )}

                {handleEditAction && (
                    <Option onClick={handleEditAction}>
                        <MdEdit color="#4D85EE" size={18} />

                        <span>Editar</span>
                    </Option>
                )}
                <Option onClick={deleteButtonAction}>
                    <MdDeleteForever color="#DE3B3B" size={18} />

                    <span>{deleteText}</span>
                </Option>
            </OptionsList>
        </Container>
    );
}

MenuOptions.propTypes = {
    handleEditAction: PropTypes.func,
    deleteText: PropTypes.string,
    visibilityAction: PropTypes.func,
    deleteButtonAction: PropTypes.func,
};

MenuOptions.defaultProps = {
    handleEditAction: null,
    deleteText: 'Excluir',
    visibilityAction: null,
    deleteButtonAction: null,
};
