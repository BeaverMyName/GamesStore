import { Box, Card, CardMedia, Button, CardContent, Typography, IconButton } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import GameCardDto from "../../dtos/GameCardDto";
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import { CartPageStore } from '../../stores/pages';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

interface Props {
    game: GameCardDto;
}

const CartGameCard = (props: Props) => {
    const { t } = useTranslation(['cart']);
    const store = useInjection<CartPageStore>(ownTypes.cartPageStore);

    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={props.game.image}
            />
            <CardContent>
                <Typography variant="h6">
                    {props.game.name}
                </Typography>
                <Typography>
                    {props.game.price}$
                    <Button 
                        startIcon={<RemoveShoppingCartIcon />}
                        size='small' 
                        onClick={() => store.removeGame(props.game.id)}
                        variant='outlined'
                    >
                            {t('remove')}
                    </Button>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CartGameCard;