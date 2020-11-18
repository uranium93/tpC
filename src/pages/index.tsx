/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import Container from 'src/components/Container';
import axios from 'axios';
import Router, { useRouter } from 'next/router';

const Home = (): JSX.Element => {
    const [emailForm, setEmailForm] = useState('');
    const [passwordForm, setPasswordForm] = useState('');
    const router = useRouter();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = (await axios.post('api/auth/login', { email: emailForm, password: passwordForm })).data;
            localStorage.setItem('role', res.role);
            if (res.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {}

        console.log(emailForm, passwordForm);
    };
    return (
        <Container>
            <Form>
                <Form.Group
                    controlId="formBasicEmail"
                    onChange={(e) => {
                        setEmailForm(e.target.value);
                    }}
                >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group
                    controlId="formBasicPassword"
                    onChange={(e) => {
                        setPasswordForm(e.target.value);
                    }}
                >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
};
export default Home;
