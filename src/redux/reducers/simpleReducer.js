import Raven from 'raven-js'
import { createReducer } from 'reduxsauce'
import T from 'Types'
import update from 'react-addons-update'
import INITIAL_STATE from './initialState/cart'

const reducer = (state, action) => {
    try {
        if (action.error) {
            return state
        }

        const newState = { ...state }
        return update(newState, {
            key: { $set: action.payload },
        })
    } catch (err) {
        Raven.captureException(err)
        console.log(err)
        return state
    }
}

const returnInitial = () => INITIAL_STATE

const HANDLERS = {
    [T.ACTION_END]: reducer,
    [T.RESET]: returnInitial,
}

export default createReducer(INITIAL_STATE, HANDLERS)
