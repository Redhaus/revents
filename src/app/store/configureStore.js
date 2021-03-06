import { createStore, applyMiddleware } from "redux";
import rootReducer from '../reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

// Configure Store

export const configureStore = preloadedState => {
  // setup middlewares
  const middlewares = [];
  //   add middlewares array with spread opperator
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  const store = createStore(
      rootReducer, 
      preloadedState, 
      composedEnhancer
    );

    if(process.env.NODE_ENV !== 'production'){
      if(module.hot){
        module.hot.accept('../reducers/rootReducer', () => {
          const newRootReducer = require('../reducers/rootReducer').default;
          store.replaceReducer(newRootReducer)
        })
      }
    }

  return store;
};
