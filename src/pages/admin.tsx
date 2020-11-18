/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import Container from 'src/components/Container';
import axios from 'axios';
import Router, { useRouter } from 'next/router';

const Home = (): JSX.Element => {
    const [emailForm, setEmailForm] = useState('');
    const [passwordForm, setPasswordForm] = useState('');
    const [roleForm, setroleForm] = useState('');
    const [firstnameForm, setfirstnameForm] = useState('');
    const [lastNameForm, setlastNameForm] = useState('');
    const router = useRouter();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = (
                await axios.post('api/user/addUser', {
                    userEmail: emailForm,
                    password: passwordForm,
                    role: roleForm,
                    firstName: firstnameForm,
                    lastName: lastNameForm,
                })
            ).data;
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
                <Form.Group
                    controlId="Role"
                    onChange={(e) => {
                        setroleForm(e.target.value);
                    }}
                >
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" placeholder="Role" />
                </Form.Group>
                <Form.Group
                    controlId="formBasicPassword"
                    onChange={(e) => {
                        setfirstnameForm(e.target.value);
                    }}
                >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group
                    controlId="formBasicPassword"
                    onChange={(e) => {
                        setlastNameForm(e.target.value);
                    }}
                >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onSubmit}>
                    Add User
                </Button>
            </Form>
        </Container>
    );
};
export default Home;
