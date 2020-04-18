import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import InputMask from '~/components/InputMask';
import { FormContent, Header, Container, Button, Row1, Row2 } from './styles';
import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    street: Yup.string().required('A rua é obrigatória'),
    complement: Yup.string(),
    city: Yup.string().required('A cidade é obrigatória'),
    number: Yup.string().required('O número é obrigatório'),
    state: Yup.string().required('O estado é obrigatório'),

    cep: Yup.string().required('O cep é obrigatório'),
});
export default function RecipientsCreate() {
    async function handleSubmit({
        name,
        street,
        cep,
        complement,
        city,
        state,
        number,
    }) {
        try {
            await api.post('/recipients', {
                name,
                street,
                cep,
                complement,
                city,
                state,
                number,
            });
            toast.success('Destinatário cadastrado com sucesso');
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
                <strong>Cadastro de destinatários</strong>
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
                <Form schema={schema} onSubmit={handleSubmit} id="my-form">
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
                            <InputMask name="cep" mask="99999-999" maskChar="">
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
