import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import customMiddleware from './middleware';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducer';

const middlewares = [customMiddleware];
middlewares.push(thunkMiddleware);
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware);
}

export function configureAppStore(preloadedState: any) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });

  const persistor = persistStore(store);
  return { store, persistor };
}
const { store, persistor } = configureAppStore({});
export { persistor, store };

// infer the `RootState` type from the store
export type RootState = ReturnType<typeof store.getState>;

// infer the `AppDispatch` type from the store so thunk actions can return promises
export type AppDispatch = typeof store.dispatch;
