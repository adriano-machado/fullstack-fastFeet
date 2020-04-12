import React, { useState, Fragment } from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import SelectAsync from '../../../components/SelectAsync';
import {
    FormContent,
    Header,
    Container,
    Button,
    Row1,
    CustomInput,
} from './styles';
import history from '../../../services/history';

const schema = Yup.object().shape({
    recipient_id: Yup.string().required('O e-mail é obrigatório'),
    deliveryman_id: Yup.string().required('testa'),
    product: Yup.string().required('testa'),
});
export default function Deliveriesreate() {
    const [deliveryman_id, setDeliveryman] = useState('');
    const [recipient_id, setRecipient] = useState('');
    const [product, setProduct] = useState('');

    function handleDeliverymanSelect(value) {
        console.log(value);
        setDeliveryman(value);
    }
    function handleRecipientSelect(value) {
        console.log(value);

        setRecipient(value);
    }
    function handleSubmit() {
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
                        <div style={{ width: '420px', marginRight: '18px' }}>
                            <label htmlFor="recipient_id">Destinatário</label>
                            <SelectAsync
                                placeholder="Escolha o destinatário"
                                onChange={handleRecipientSelect}
                                name="recipient_id"
                            />
                        </div>
                        <div style={{ width: '420px' }}>
                            <label htmlFor="deliveryman_id">Entregador</label>
                            <SelectAsync
                                placeholder="Escolha o entregador"
                                onChange={handleDeliverymanSelect}
                                name="deliveryman_id"
                            />
                        </div>
                    </Row1>

                    <label htmlFor="product">Nome do produto</label>
                    <CustomInput>
                        <input
                            name="product"
                            placeholder="Yamaha SX7"
                            value={product}
                            onChange={e => setProduct(e.target.value)}
                        />
                    </CustomInput>
                </Form>
            </FormContent>
        </Container>
    );
}
