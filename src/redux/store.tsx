import { configureStore } from '@reduxjs/toolkit';
import { lastFmApi } from './services/lastFmApi';


const store = configureStore({
    reducer: {
      
        [lastFmApi.reducerPath]: lastFmApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(lastFmApi.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store

