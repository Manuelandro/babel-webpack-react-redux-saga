import { spawn, call, delay } from 'redux-saga/effects'
import saga1 from './saga1'
import saga2 from './saga2'
import saga3 from './saga3'


/* eslint-disable */
// https://github.com/redux-saga/redux-saga/issues/760#issuecomment-273737022
const makeRestartable = saga =>
    function*() {
        yield spawn(function*() {
            while (true) {
                try {
                    yield call(saga)
                    console.error(
                        'unexpected root saga termination. The root sagas are supposed to live during the whole app lifetime!',
                        saga
                    )
                } catch (e) {
                    console.error('Saga error, the saga will be restarted', e)
                }
                yield delay(1000) // Avoid infinite failures blocking app TODO use backoff retry policy...
            }
        })
    }
const rootSagas = [
  saga1,
  saga2,
  saga3
].map(makeRestartable)

export default function* root() {
    yield rootSagas.map(saga => call(saga))
}
