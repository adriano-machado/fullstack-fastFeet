import React, { useState, useEffect } from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import InputMask from '../../../components/InputMask';
import { FormContent, Header, Container, Button, Row1, Row2 } from './styles';
import history from '../../../services/history';
import api from '../../../services/api';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    street: Yup.string().required('A rua é obrigatória'),
    complement: Yup.string(),
    city: Yup.string().required('A cidade é obrigatória'),
    number: Yup.string().required('O número é obrigatório'),
    state: Yup.string().required('O estado é obrigatório'),

    cep: Yup.string()
        .min(9, 'Parece que o cep está incompleto')
        .required('O cep é obrigatório'),
});
export default function RecipientsEdit({ match }) {
    const [recipient, setRecipient] = useState({});
    const [cep, setCep] = useState(null);

    useEffect(() => {
        async function getRecipient() {
            try {
                const response = await api.get(
                    `/recipients/${match.params.recipientId}`
                );
                setRecipient(response.data);
                setCep(response.data.cep);
            } catch (err) {
                toast.error(
                    'Problemas para buscar informações do destinatário'
                );
            }
        }

        getRecipient();
    }, [match.params.recipientId]);
    async function handleSubmit({
        name,
        street,
        cep, //eslint-disable-line
        complement,
        city,
        state,
        number,
    }) {
        try {
            await api.put(`/recipients/${match.params.recipientId}`, {
                name,
                street,
                cep,
                complement,
                city,
                state,
                number,
            });
            toast.success('Destinatário editado com sucesso');
            history.goBack();
        } catch (err) {
            if (err.response.data.error && err.response.status !== 500) {
                toast.error(`${err.response.data.error}`);
            } else {
                toast.error(`Problemas para cadastrar destinatário`);
            }
        }
    }

    return (
        <Container>
            <Header>
                <strong>Edição de destinatários</strong>
                <div>
                    <Button type="button" onClick={() => history.goBack()} grey>
                        <FaChevronLeft size={16} />
                        VOLTAR
                    </Button>
                    <Button form="my-form" type="submit">
                        <FaCheck size={16} />
                        SALVAR
                    </Button>
                </div>
            </Header>
            <FormContent>
                <Form
                    schema={schema}
                    onSubmit={handleSubmit}
                    id="my-form"
                    initialData={recipient}
                >
                    <label htmlFor="name">Nome</label>
                    <Input name="name" placeholder="Ludwig van Beethoven" />

                    <Row1>
                        <div>
                            <label htmlFor="street">Rua</label>
                            <Input name="street" placeholder="Rua Beethoven" />
                        </div>
                        <div>
                            <label htmlFor="number">Número</label>
                            <Input name="number" placeholder="1729" />
                        </div>
                        <div>
                            <label htmlFor="complement">Complemento</label>
                            <Input name="complement" />
                        </div>
                    </Row1>
                    <Row2>
                        <div>
                            <label htmlFor="city">Cidade</label>
                            <Input name="city" placeholder="Diadema" />
                        </div>
                        <div>
                            <label htmlFor="state">Estado</label>
                            <Input name="state" placeholder="São paulo" />
                        </div>
                        <div>
                            <label htmlFor="cep">Cep</label>
                            <InputMask
                                name="cep"
                                mask="99999-999"
                                maskChar=""
                                value={cep}
                                onChange={e => setCep(e.target.value)}
                            >
                                {() => (
                                    <Input placeholder="09960-580" name="cep" />
                                )}
                            </InputMask>
                        </div>
                    </Row2>
                </Form>
            </FormContent>
        </Container>
    );
}

RecipientsEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            recipientId: PropTypes.string,
        }),
    }).isRequired,
};
