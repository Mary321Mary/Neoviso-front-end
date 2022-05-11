import { createStore } from 'vuex';
import Results from './results.js';

const store = createStore({
    modules: {
        Results
    }
})

export default store;
