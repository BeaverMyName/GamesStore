import React from 'react';
import { observer } from "mobx-react-lite";
import { useInjection } from "../../ioc/ioc.react";
import ownTypes from "../../ioc/ownTypes";
import { CartPageStore } from "../../stores/pages";
import CartGameCard from '../../components/CartGameCard';
import { useTranslation } from 'react-i18next';
import AuthorizationStore from '../../stores/AuthorizationStore';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Card, Box, CardContent, Typography } from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const CartPage = observer(() => {
    const cartStore = useInjection<CartPageStore>(ownTypes.cartPageStore);
    const authStore = useInjection<AuthorizationStore>(ownTypes.authorizationStore);
    const { t } = useTranslation(['cart'])
    const navigate = useNavigate();

    return (
        <Grid container  columns={18} className='p-2'>
            <Grid item xs={1} md={2} lg={3}/>
            <Grid item xs={16} md={7} lg={6}>
                <h2>{t('yourOrder')}</h2>
                {cartStore.games.map((game, key) => (
                    <CartGameCard key={key} game={game} />
                ))}
            </Grid>
            <Grid item xs={1} md={1} lg={1}/>
            <Grid item xs={1} md={1} lg={1}/>
            <Grid item xs={16} md={5} lg={4}>
                <Grid container>
                    <Grid item xs={18} md={18} lg={18}>
                        <h2>{t('yourPayment')}</h2>
                        <Card>
                            <Box>
                                <CardContent>
                                <Typography variant="h6">
                                    {cartStore.price}$
                                </Typography>
                                <Typography>
                                    <Button
                                        startIcon={<LocalAtmIcon />}
                                        size='large'
                                        variant='outlined'
                                        color='success'
                                        onClick={() => {
                                        authStore.isAuthorized ? 
                                        cartStore.doPayment() :
                                        navigate('/accounts/login');
                                        }}
                                        >
                                            {t('payButton')}
                                        </Button>
                                </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} md={2} lg={3}/>
        </Grid>
    );
});

export default CartPage;