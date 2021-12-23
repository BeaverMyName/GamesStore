import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import StorePageStore from '../../stores/pages/StorePageStore';
import './SidebarFilter.css';

interface Props {
    filterItems?: string[];
    filterName: string;
    store: StorePageStore;
}
  
const SidebarFilter = (props: Props) => {
    const { t } = useTranslation(['storePage']);

    return (
        <FormControl fullWidth>
            <FormLabel>
                <p className='filter-label'>
                    {t(props.filterName)}
                </p>
            </FormLabel>
            <FormGroup>
                {props.filterItems?.map((value, idx) => (
                <FormControlLabel
                    key={idx}
                    control={
                    <Checkbox onChange={(ev) => {props.store.setFilterByItem(value, props.filterName, ev.target.checked)}} />
                    }
                    label={value}
                />
                ))}
            </FormGroup>
        </FormControl>
    );
}

export default SidebarFilter;