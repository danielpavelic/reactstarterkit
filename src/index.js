import './index.css';

import numeral from 'numeral';

const value = numeral(1000).format('0.00,00');

/* eslint-disable no-console */
console.log(value);
