import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '../../assets/fastfeet-logo.png';

import { signInRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um email válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});
export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }
    return (
        <>
            <img src={logo} alt="GoBarber" />
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
                <button type="submit">
                    {loading ? 'Carregando...' : 'Entrar no sistema'}
                </button>
            </Form>
        </>
    );
}
