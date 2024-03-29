/** @format */

//  import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//   Import Duet Date Picker
import { defineCustomElements } from "@duetds/date-picker/dist/loader";
import App from "./components/App";
import reducers from "./reducers";
import "./assets/styles/_styles.scss";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers); // new added line

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
); // added line
const persistor = persistStore(store); // added line

// Register Duet Date Picker
defineCustomElements(window);

// const store = createStore(
//     reducers,
//     composeEnhancers( applyMiddleware( reduxThunk ) ),
//     );
const rootElement = document.querySelector("#root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
