import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { FormContent, Header, Container, Button } from './styles';
import history from '../../services/history';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um email válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});
export default function DeliverymansCreate() {
    function handleSubmit({ email, password }) {
        console.log('clicquei');
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
                    <Button type="button" onClick={handleSubmit}>
                        <FaCheck size={16} />
                        SALVAR
                    </Button>
                </div>
            </Header>
            <FormContent>
                <Form schema={schema} onSubmit={handleSubmit}>
                    <label htmlFor="email">SEU E-MAIL</label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="exemplo@email.com"
                    />
                    <label htmlFor="password">SUA SENHA</label>

                    <Input
                        name="password"
                        type="password"
                        placeholder="Sua senha secreta"
                    />
                </Form>
            </FormContent>
        </Container>
    );
}
