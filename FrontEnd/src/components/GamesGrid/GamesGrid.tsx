import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import GameCard from '../GameCard';
import { useInjection } from '../../ioc/ioc.react';
import { GamesGridStore } from '../../stores/components';
import ownTypes from '../../ioc/ownTypes';
import Pagination from '../Pagination';

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
            <Row md='3' className='g-4'>
                { store.games?.map((game, key) => (
                    <Col key={key}>
                        <GameCard 
                        key={key}
                        game={game}
                        />
                    </Col>
                )) }
            </Row>
            <Pagination total={store.totalPages} active={store.currentPage} onChange={(value) => {store.changePage(value, props.filter)}} />
        </Container>
    )
})

export default GamesGrid;