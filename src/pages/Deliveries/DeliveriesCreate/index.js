import React, { useState } from 'react';

import { Form } from '@rocketseat/unform';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
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
import api from '../../../services/api';

export default function DeliveriesCreate() {
    const [deliverymanOption, setDeliverymanOption] = useState(null);
    const [recipientOption, setRecipientOption] = useState(null);
    const [product, setProduct] = useState('');

    function handleDeliverymanSelect(value) {
        setDeliverymanOption(value);
    }
    function handleRecipientSelect(value) {
        setRecipientOption(value);
    }
    async function handleSubmit() {
        if (!deliverymanOption || !recipientOption || !product) {
            return toast.error('Todos os campos precisam estar preenchidos');
        }
        try {
            await api.post('/deliveries', {
                deliveryman_id: deliverymanOption.value,
                recipient_id: recipientOption.value,
                product,
            });
            toast.success('Encomenda cadastrada com sucesso');
            return history.goBack();
        } catch (err) {
            return toast.error('Problemas para cadastrar encomenda');
        }
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
                    <Button form="my-form" type="submit">
                        <FaCheck size={16} />
                        SALVAR
                    </Button>
                </div>
            </Header>
            <FormContent>
                <Form onSubmit={handleSubmit} id="my-form">
                    <Row1>
                        <div style={{ width: '420px', marginRight: '18px' }}>
                            <label htmlFor="recipient_id">Destinatário</label>
                            <SelectAsync
                                URLtoFetch="/recipients"
                                value={recipientOption}
                                placeholder="Escolha o destinatário"
                                onChange={handleRecipientSelect}
                                name="recipient_id"
                            />
                        </div>
                        <div style={{ width: '420px' }}>
                            <label htmlFor="deliveryman_id">Entregador</label>
                            <SelectAsync
                                URLtoFetch="/deliverymans"
                                value={deliverymanOption}
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
