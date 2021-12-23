import { observer } from 'mobx-react'
import React, { Suspense, useEffect } from 'react'
import { Container, Row, Spinner, Col, Form } from 'react-bootstrap'
import GamesGrid from '../../components/GamesGrid';
import { useTranslation } from 'react-i18next';
import { useInjection } from '../../ioc/ioc.react';
import StorePageStore from '../../stores/pages/StorePageStore';
import ownTypes from '../../ioc/ownTypes';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import SidebarFilter from '../../components/SidebarFilter';

const StorePage = observer(() => {
  const { t } = useTranslation(['storePage']);
  const store = useInjection<StorePageStore>(ownTypes.storePageStore);

  useEffect(() => {
    store.setFilters();
  }, [store.filters]);

  return (
    <Suspense fallback={<Spinner animation='border' />}>
      <Container className='pt-4 pb-4'>
          <Form className='p-4'>
            <Form.Group as={Row}>
              <Col md={{ span: 2, offset: 2 }}>
                <FormControl fullWidth size='small'>
                  <InputLabel>{t('genre')}</InputLabel>
                  <Select
                    value={store.genre}
                    onChange={(ev) => {store.setGenre(ev.target.value)}}
                  >
                    {store.filters?.genres.map((value, idx) => (
                      <MenuItem key={idx} value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
              <Col md={{ span: 6}}>
                <Form.Control type='text' placeholder={t('searchPlaceholder')} onChange={(ev) => store.setFilterByName(ev.target.value)}/>
              </Col>
            </Form.Group>
          </Form>
        <Grid container>
          <Grid item xs={2} md={2} lg={2}>
            <SidebarFilter filterItems={store.filters?.systems} filterName='systems' store={store}/>
            <hr/>
            <SidebarFilter filterItems={store.filters?.languages} filterName='languages' store={store}/>
            <hr/>
            <SidebarFilter filterItems={store.filters?.features} filterName='features' store={store}/>
          </Grid>
          <Grid item xs={10} md={10} lg={10}>
            <GamesGrid filter={store.filter} />
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  )
});

export default StorePage;
