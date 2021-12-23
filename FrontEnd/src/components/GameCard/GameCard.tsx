import { Button, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WindowIcon from '@mui/icons-material/Window';
import AppleIcon from '@mui/icons-material/Apple';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import { GameCardStore } from '../../stores/components';
import { CartPageStore } from '../../stores/pages';
import './GameCard.css';
import CardOfGame from '../../models/CardOfGame';

interface Props {
    game: CardOfGame;
}

const GameCard = observer((props: Props) => {
    const gameStore = useInjection<GameCardStore>(ownTypes.gameCardStore);
    const cartStore = useInjection<CartPageStore>(ownTypes.cartPageStore);
    const isInCart = cartStore.gameIds.includes(props.game.id);
    const { t } = useTranslation(['cart'])
    const navigate = useNavigate();

    useEffect(() => {
        gameStore.setSystems(props.game);
    }, [props.game]);
    
    return (
        <Card 
        key={props.game.id} 
        bg="light" 
        onClick={() => navigate(`/game/${props.game.id}`)}
        >
            <Card.Img variant='top' src={props.game.image}/>
            <Card.Body className='game-card-body'>
                <Card.Title className='game-card-name'>
                    {props.game.name}
                </Card.Title>
                <Grid container className='game-card-description'>
                    <Grid item xs={3} md={3} lg={3} className='game-card-price'>
                        {props.game.price}$
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Button 
                        className='game-cart-button'
                        size='small'
                        variant='outlined'
                        fullWidth
                        color='success'
                        startIcon={ isInCart ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
                        disabled={isInCart}
                        onClick={(ev) => {
                            cartStore.addGame(props.game.id);
                            ev.stopPropagation();
                        }}
                        >
                            {isInCart ? t('inCart') : t('buy')}
                        </Button>
                    </Grid>
                    <Grid xs={1} md={1} lg={1}></Grid>
                    {gameStore.isOnWindows && 
                    <Grid item xs={1} md={1} lg={1}>
                        <WindowIcon />
                    </Grid>}
                    {gameStore.isOnMacOS &&
                    <Grid item xs={1} md={1} lg={1}>
                        <AppleIcon />
                    </Grid>}
                </Grid>
            </Card.Body>
        </Card>
    );
});

export default GameCard;