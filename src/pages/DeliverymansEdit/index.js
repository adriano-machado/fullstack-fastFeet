import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { FormContent, Header, Container, Button } from './styles';
import history from '../../services/history';
import AvatarInput from '../../components/AvatarInput';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um email válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

const deliveryman = {};
export default function DeliverymansEdit() {
    function handleSubmit({ email, password }) {
        console.log('clicquei');
    }
    return (
        <Container>
            <Header>
                <strong>Edição de entregadores</strong>
                <div>
                    <Button type="button" onClick={() => history.goBack()} grey>
                        <FaChevronLeft size={16} />
                        VOLTAR
                    </Button>
                    <Button form="my-form" type="button" onClick={handleSubmit}>
                        <FaCheck size={16} />
                        SALVAR
                    </Button>
                </div>
            </Header>
            <FormContent>
                <Form
                    id="my-form"
                    schema={schema}
                    onSubmit={handleSubmit}
                    initialData={deliveryman}
                >
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
