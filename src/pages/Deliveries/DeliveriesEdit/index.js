import React, { useState, useEffect } from 'react';

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

export default function DeliveriesEdit({ match }) {
    const [deliverymanOption, setDeliverymanOption] = useState({});
    const [recipientOption, setRecipientOption] = useState({});
    const [product, setProduct] = useState('');
    useEffect(() => {
        async function loadDelivery() {
            try {
                const response = await api.get(
                    `/deliveries/${match.params.deliveryId}`
                );
                const { deliveryman, recipient } = response.data;
                setDeliverymanOption({
                    label: deliveryman.name,
                    value: deliveryman.id,
                });
                setRecipientOption({
                    label: recipient.name,
                    value: recipient.id,
                });
                setProduct(response.data.product);
            } catch (err) {
                toast.error('Problemas para buscar informações da encomenda');
            }
        }

        loadDelivery();
    }, [match.params.deliveryId]);
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
            await api.put(`/deliveries/${match.params.deliveryId}`, {
                deliveryman_id: deliverymanOption.value,
                recipient_id: recipientOption.value,
                product,
            });
            toast.success('Encomenda editada com sucesso');
            return history.goBack();
        } catch (err) {
            return toast.error(
                'Problemas para editar encomenda\nVerifique o status, apenas encomendas "pendentes" podem ser editadas'
            );
        }
    }

    return (
        <Container>
            <Header>
                <strong>Edição de encomendas</strong>
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
                                value={deliverymanOption}
                                URLtoFetch="/deliverymans"
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
