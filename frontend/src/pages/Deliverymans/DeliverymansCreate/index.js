import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { FormContent, Header, Container, Button } from './styles';
import history from '~/services/history';
import api from '~/services/api';

import AvatarInput from '~/components/AvatarInput';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um email válido')
        .required('O e-mail é obrigatório'),
    name: Yup.string().required('O nome é obrigatório'),
    avatar_id: Yup.string(),
});
export default function DeliverymansCreate() {
    async function handleSubmit({ email, name, avatar_id }) {
        try {
            await api.post('/deliverymans', {
                email,
                name,
                avatar_id,
            });
            toast.success('Entregador cadastrado com sucesso');
            history.goBack();
        } catch (err) {
            if (err.response.data.error && err.response.status !== 500) {
                toast.error(`${err.response.data.error}`);
            } else {
                toast.error(`Problemas para cadastrar entregador`);
            }
        }
    }
    return (
        <Container>
            <Header>
                <strong>Cadastro de entregadores</strong>
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
                <Form id="my-form" schema={schema} onSubmit={handleSubmit}>
                    <AvatarInput name="avatar_id" />

                    <label htmlFor="name">Nome</label>
                    <Input name="name" placeholder="John Doe" />
                    <label htmlFor="email">Email</label>

                    <Input name="email" placeholder="exemplo@email.com.br" />
                </Form>
            </FormContent>
        </Container>
    );
}
