import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
  }
   
  const persistedReducer = persistReducer(persistConfig, reducers); // new added line

  const store = createStore(
        persistedReducer,
        composeEnhancers( applyMiddleware( reduxThunk ) ),
    ); // new added line
  const persistor = persistStore(store); // new added line
  
// const store = createStore(
//     reducers,
//     composeEnhancers( applyMiddleware( reduxThunk ) ),
//     );
ReactDOM.render(
            <Provider store={ store }>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
                ,
                 document.querySelector('#root') 
            );