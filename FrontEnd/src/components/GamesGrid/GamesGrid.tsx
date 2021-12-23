import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import GameCard from '../GameCard';
import { useInjection } from '../../ioc/ioc.react';
import { GamesGridStore } from '../../stores/components';
import ownTypes from '../../ioc/ownTypes';
import { Grid, Pagination } from '@mui/material';

interface Props {
    filter: string;
}

const GamesGrid = observer((props: Props) => {
    const store = useInjection<GamesGridStore>(ownTypes.gamesGridStore);

    useEffect(() => {
      const getGames = async () => {
        await store.init(props.filter);
      }
      getGames();
    }, [store, props.filter]);

    return (
        <Container>
            <Grid container spacing={3}>
                { store.games?.map((game, key) => (
                    <Grid item key={key} lg={4} md={6} xs={12}>
                        <GameCard 
                        key={key}
                        game={game}
                        />
                    </Grid>
                )) }
            </Grid>
            <Grid container justifyContent='center'>
                <Grid item>
                    <Pagination className='p-4' color='secondary' count={store.totalPages} page={store.currentPage} onChange={(ev, value) => {store.changePage(value, props.filter)}} />
                </Grid>
            </Grid>
        </Container>
    )
})

export default GamesGrid;