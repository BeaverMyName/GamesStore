import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import { GamePageStore } from '../../stores/pages';

interface DetailsProps {
    title: string,
    text?: string
}

const GamePage = observer(() => {
    const { t } = useTranslation(['gamePage']);
    const store = useInjection<GamePageStore>(ownTypes.gamePageStore);
    const params = useParams();
    const youtubeUrl = "https://www.youtube.com/embed/";

    useEffect(() => {
        const id = Number(params.id);

        const initGame = async () => {
            await store.init(id);
        }

        initGame();
    }, [store]);

    return (
        <Container className='p-2'>
            <Row>
                <h2>{store.game?.name}</h2>
            </Row>
            <Row md={2}>
                <Col>
                    <h5>{t('description')}</h5>
                    <p>{store.game?.description}</p>
                    <iframe width='640px' height='360px' src={`${youtubeUrl}${store.game?.youtubeTrailer}`}/>
                </Col>
                <Col>
                    <h5>{t('gameDetails')}</h5>
                    <GameDetailsGrid title={t('genre')} text={store.game?.gameDetails.genres.toString()} />
                    <GameDetailsGrid title={t('system')} text={store.game?.gameDetails.systems.toString()} />
                    <GameDetailsGrid title={t('company')} text={store.game?.gameDetails.company} />
                    <GameDetailsGrid title={t('releaseDate')} text={store.game?.gameDetails.releaseDate} />
                    <GameDetailsGrid title={t('languages')} text={store.game?.gameDetails.languages.toString()} />
                </Col>
            </Row>
        </Container>
    );
});

const GameDetailsGrid = (props: DetailsProps) => {
    return (
        <Row>
            <Col sm={4}>
                <p>{props.title}:</p>
            </Col>
            <Col sm={8}>
                <p>{props.text}</p>
            </Col>
        </Row>
    );
}

export default GamePage;