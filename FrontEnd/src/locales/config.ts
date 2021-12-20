import i18n from 'i18next';
import app from './en/app.json';
import header from './en/header.json';
import authorization from './en/authorization.json';
import gamePage from './en/gamePage.json';
import cart from './en/cart.json';
import storePage from './en/storePage.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    app,
    header,
    authorization,
    gamePage,
    cart,
    storePage,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['app', 'header', 'authorization', 'gamePage', 'cart', 'storePage'],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});


export default i18n;