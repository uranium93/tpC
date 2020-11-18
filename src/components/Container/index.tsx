// @flow
import React, { ReactNode } from 'react';
import BootstrapContainer from 'react-bootstrap/Container';

type Props = {
    children: ReactNode;
    padding?: string;
};
const Container = ({ children, padding }: Props): JSX.Element => {
    return (
        <BootstrapContainer style={{ maxWidth: '1246px', width: '90vw', paddingTop: 15 }} fluid>
            {children}
        </BootstrapContainer>
    );
};

Container.defaultProps = {
    padding: '2rem',
};

export default Container;
