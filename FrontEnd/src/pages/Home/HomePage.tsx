import { observer } from 'mobx-react'
import React, { Suspense } from 'react'
import { Container, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useInjection } from '../../ioc/ioc.react'
import ownTypes from '../../ioc/ownTypes'
import { useTranslation } from 'react-i18next';

const HomePage = observer(() => {
  
  return (
    <Suspense fallback={<Spinner animation="border" />}>
      <Container className="pt-4 pb-4">
      </Container>
    </Suspense>
  )
});

export default HomePage;
