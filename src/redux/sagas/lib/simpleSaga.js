import Raven from 'raven-js'
import { takeLatest, select, put, take } from 'redux-saga/effects'
import T from 'Types'
import { mk$Selector } from 'Selectors'

function* simpleTask() {
    try {
  
        const fromRedux = yield select(mk$VersionAval())

        yield put({ type: T.ACTION, payload: fromRedux })
        yield take(T.ACTION_END)

        return yield put({ type: T.ACTION2 })
    } catch (err) {
        yield Raven.captureException(err)
        console.log(err)
        return yield put({ type: T.ACTION_ERROR, error: err })
    }
}


export default function* saga() {
    try {
        yield takeLatest(T.START_TASK, simpleTask)
    } catch (e) {
        yield Raven.captureException(e)
        console.log(e)
    }
}
