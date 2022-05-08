require('@babel/register');
// import router from '../src/pages';
// import Sitemap from 'react-router-sitemap';

const router = require('../src/pages').default;
const Sitemap = require('react-router-sitemap').default;

new Sitemap(router).build('https://pool.btc.com').save('./public/sitemap.xml');
