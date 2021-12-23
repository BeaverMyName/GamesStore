import { Grid, Button, Box, Tab } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import { CartPageStore, GamePageStore } from '../../stores/pages';
import './GamePage.css';
import { TabContext, TabList, TabPanel } from '@mui/lab';

interface DetailsProps {
    title: string,
    text?: string
}

const GamePage = observer(() => {
    const { t } = useTranslation(['gamePage']);
    const store = useInjection<GamePageStore>(ownTypes.gamePageStore);
    const cartStore = useInjection<CartPageStore>(ownTypes.cartPageStore);
    const params = useParams();
    const isInCart = cartStore.gameIds.includes(store.game?.id ?? 0);
    const youtubeUrl = "https://www.youtube.com/embed/";
    //const youtubeUrl = process.env.YOUTUBE_URL;

    useEffect(() => {
        const id = Number(params.id);

        const initGame = async () => {
            await store.init(id);
        }

        initGame();
    }, [store]);

    return (
        <Grid container className='p-2' columns={24}>
            <Grid item xs={2} md={2} lg={4}></Grid>
            <Grid paddingTop={3} item xs={20} md={10} lg={8}>
                <h2>{store.game?.name}</h2>
            </Grid>
            <Grid item xs={2} md={1} lg={1}></Grid>
            <Grid item xs={2} md={1} lg={1}></Grid>
            <Grid paddingTop={3} item xs={20} md={8} lg={6}>
                <Button 
                    className='game-cart-button'
                    size='large'
                    variant='outlined'
                    fullWidth
                    color='success'
                    startIcon={ isInCart ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
                    disabled={isInCart}
                    onClick={(ev) => {
                        cartStore.addGame(store.game?.id ?? 0);
                        ev.stopPropagation();
                    }}
                    >
                        {isInCart ? t('inCart') : t('buy')}
                </Button>
            </Grid>
            <Grid item xs={2} md={2} lg={4}></Grid>
            <Grid item xs={2} md={2} lg={4}></Grid>
            <Grid paddingTop={3} item xs={20} md={10} lg={8}>
                <div className="video-responsive">
                    <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${store.game?.youtubeTrailer}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                    />
                </div>
                <TabContext value={'1'}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList>
                            <Tab disableRipple sx={{ fontWeight: 700 }} label={t('description')} value="1" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">{store.game?.description}</TabPanel>
                </TabContext>
            </Grid>
            <Grid item xs={2} md={1} lg={1}></Grid>
            <Grid item xs={2} md={1} lg={1}></Grid>
            <Grid paddingTop={3} item xs={20} md={8} lg={6}>
                <TabContext value={'1'}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList>
                            <Tab disableRipple sx={{ fontWeight: 700 }} label={t('gameDetails')} value="1" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <GameDetailsGrid title={t('genre')} text={store.game?.gameDetails.genres.toString()} />
                        <GameDetailsGrid title={t('system')} text={store.game?.gameDetails.systems.toString()} />
                        <GameDetailsGrid title={t('company')} text={store.game?.gameDetails.company} />
                        <GameDetailsGrid title={t('releaseDate')} text={store.game?.gameDetails.releaseDate} />
                        <GameDetailsGrid title={t('languages')} text={store.game?.gameDetails.languages.toString()} />
                    </TabPanel>
                </TabContext>
                <TabContext value={'1'}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList>
                            <Tab disableRipple sx={{ fontWeight: 700 }} label={t('gameFeatures')} value="1" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {store.game?.gameDetails.features.map((val, idx) => (
                            <p key={idx}>{val}</p>
                        ))}
                    </TabPanel>
                </TabContext>
            </Grid>
            <Grid item xs={2} md={2} lg={4}></Grid>
        </Grid>
    );
});

const GameDetailsGrid = (props: DetailsProps) => {
    return (
        <Grid container>
            <Grid item xs={8} md={8} lg={8}>
                <p className='game-details-title'>{props.title}:</p>
            </Grid>
            <Grid item xs={16} md={16} lg={16}>
                <p>{props.text}</p>
            </Grid>
        </Grid>
    );
}

export default GamePage;