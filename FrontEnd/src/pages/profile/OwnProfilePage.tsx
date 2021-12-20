import React from 'react';
import { observer } from "mobx-react";
import { Col, Container, Row } from "react-bootstrap";
import { useInjection } from '../../ioc/ioc.react';
import { OwnProfilePageStore } from '../../stores/pages/profile';
import ownTypes from '../../ioc/ownTypes';

const OwnProfilePage = observer(() => {
    const store = useInjection<OwnProfilePageStore>(ownTypes.ownProfilePageStore);
 
    return (
        <Container className='p-2'>
            <Row>
                <Col>
                    <h3>{store.user?.username}</h3>
                </Col>
            </Row>
        </Container>
    );
});

export default OwnProfilePage;