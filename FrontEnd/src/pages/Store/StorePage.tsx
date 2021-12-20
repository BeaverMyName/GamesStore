import { observer } from 'mobx-react'
import React, { Suspense } from 'react'
import { Container, Row, Spinner, Col, Form, Button, ButtonToolbar, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import GamesGrid from '../../components/GamesGrid';
import { useTranslation } from 'react-i18next';
import { useInjection } from '../../ioc/ioc.react';
import StorePageStore from '../../stores/pages/StorePageStore';
import ownTypes from '../../ioc/ownTypes';
import { GenreType } from '../../enums';

const StorePage = observer(() => {
  const { t } = useTranslation(['storePage']);
  const store = useInjection<StorePageStore>(ownTypes.storePageStore);

  return (
    <Suspense fallback={<Spinner animation='border' />}>
      <Container className='pt-4 pb-4'>
          <Form className='p-4'>
            <Form.Group as={Row}>
              <Col md={{ span: 6, offset: 3}}>
                <Form.Control type='text' onChange={(ev) => store.setFilterByName(ev.target.value)}/>
              </Col>
              <Col>
                <Button>
                  {t('search')}
                </Button>
              </Col>
            </Form.Group>
          </Form>
        <Row>
          <Col xs='2'>
            <ButtonToolbar>
              <ToggleButtonGroup vertical type='radio' name='options' defaultValue={1}>
                {Array.from(Array(Object.keys(GenreType).length / 2).keys()).map((value, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type='radio'
                    variant='outline-secondary'
                    name='radio'
                    value={GenreType[value]}
                    onClick={(ev) => store.setFilterByGenre(GenreType[value])}
                  >
                    {GenreType[value]}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </ButtonToolbar>
            
          </Col>
          <Col xs='10'>
            <GamesGrid filter={store.filter} />
          </Col>
        </Row>
      </Container>
    </Suspense>
  )
});

export default StorePage;
