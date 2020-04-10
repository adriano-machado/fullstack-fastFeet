import React, { useState } from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import InputMask from '../../components/InputMask';
import { FormContent, Header, Container, Button, Row1, Row2 } from './styles';
import history from '../../services/history';

const schema = Yup.object().shape({
    name: Yup.string().required('O e-mail é obrigatório'),
    street: Yup.string().required('testa'),
    complement: Yup.string().required('testei'),
    city: Yup.string().required('testei'),
    number: Yup.string().required('testei'),
    state: Yup.string().required('testei'),

    cep: Yup.string().required('testei'),
});
export default function RecipientsEdit() {
    function handleSubmit({ name, street, cep, complement }) {
        console.log({ name, street, cep, complement });
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
                    <Button form="my-form" type="submit" onClick={handleSubmit}>
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
                            <InputMask
                                name="cep"
                                placeholder="09960-580"
                                mask="99999-99"
                                maskChar=""
                            >
                                {() => <Input name="cep" />}
                            </InputMask>
                        </div>
                    </Row2>
                </Form>
            </FormContent>
        </Container>
    );
}
