import React, { useState } from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import InputMask from '../../components/InputMask';
import { FormContent, Header, Container, Button, Row1 } from './styles';
import history from '../../services/history';

const schema = Yup.object().shape({
    recipient: Yup.string().required('O e-mail é obrigatório'),
    deliveryman: Yup.string().required('testa'),
    product: Yup.string().required('testa'),
});
export default function Deliveriesreate() {
    function handleSubmit({ recipient_id, deliveryman_id, product }) {
        console.log({ recipient_id, deliveryman_id, product });
    }

    return (
        <Container>
            <Header>
                <strong>Cadastro de encomendas</strong>
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
                    <Row1>
                        <div>
                            <label htmlFor="street">Rua</label>
                            <Input name="street" placeholder="Rua Beethoven" />
                        </div>
                        <div>
                            <label htmlFor="number">Número</label>
                            <Input name="number" placeholder="1729" />
                        </div>
                    </Row1>
                    <label htmlFor="product">Nome do produto</label>

                    <Input name="product" placeholder="Yamaha SX7" />
                </Form>
            </FormContent>
        </Container>
    );
}
