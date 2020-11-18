/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import Container from 'src/components/Container';
import axios from 'axios';
import Router, { useRouter } from 'next/router';

const Home = (): JSX.Element => {
    const [role, setRole] = useState('');
    useEffect(() => {
        setRole(localStorage.getItem('role'));
    });
    const router = useRouter();
    return <Container>Role : {role}</Container>;
};
export default Home;
