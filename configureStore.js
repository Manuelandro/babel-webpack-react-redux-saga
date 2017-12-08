import { connectRoutes } from 'redux-first-router'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import * as ReselectTools from 'reselect-tools'
import { customerMiddlw } from 'Modules/middlewares'
import * as reducers from './reducers'
import rootSaga from './sagas'
import routesMap from './routesMap'
import * as selectors from './selectors'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function (history, initialState) {
    const sagaMiddleware = createSagaMiddleware()
    const { reducer, middleware, enhancer } = connectRoutes(history, routesMap)

    const rootReducer = combineReducers({
        ...reducers,
        location: reducer,
    })

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            autoRehydrate(),
            enhancer,
            applyMiddleware(
                middleware,
                sagaMiddleware,
                customMiddlw,
                thunk
            )
        )
    )
    
    sagaMiddleware.run(rootSaga)

    return store
}
