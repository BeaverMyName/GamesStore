import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { useInjection } from '../../ioc/ioc.react';
import { OwnProfilePageStore } from '../../stores/pages/profile';
import ownTypes from '../../ioc/ownTypes';
import { Box, Grid, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTranslation } from 'react-i18next';

const OwnProfilePage = observer(() => {
    const store = useInjection<OwnProfilePageStore>(ownTypes.ownProfilePageStore);
    const { t } = useTranslation(['profilePage']);
 
    return (
        <Grid container columns={18}>
            <Grid item xs={1} md={2} lg={3} />
            <Grid className='p-2' item xs={17} md={16} lg={15}>
                <h2>{store.user?.username}</h2>
            </Grid>
            <Grid item xs={1} md={2} lg={3} />
            <Grid item xs={16} md={14} lg={12}>
                <TabContext value={store.tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(ev, value) => {store.setTab(value)}}>
                            <Tab sx={{ fontWeight: 700 }} label={t('activityFeed')} value='1' />
                            <Tab sx={{ fontWeight: 700 }} label={t('profile')} value='2' />
                            <Tab sx={{ fontWeight: 700 }} label={t('games')} value='3' />
                            <Tab sx={{ fontWeight: 700 }} label={t('friends')} value='4' />
                        </TabList>
                    </Box>
                    <TabPanel value='1'>Feed</TabPanel>
                    <TabPanel value='2'>Profile</TabPanel>
                    <TabPanel value='3'>Games</TabPanel>
                    <TabPanel value='4'>Friends</TabPanel>
                </TabContext>
            </Grid>
            <Grid item xs={1} md={2} lg={3} />
        </Grid>
    );
});

export default OwnProfilePage;