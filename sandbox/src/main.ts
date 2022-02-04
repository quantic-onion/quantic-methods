import { createApp } from 'vue'
import App from './App.vue'

import { qmStr } from 'quantic-methods';

const name = '      Matías            Dañiel Bonthuís';
console.log(name);
console.log(qmStr.cleanStr(name));

createApp(App).mount('#app')
