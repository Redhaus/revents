import { combineReducers } from 'redux';
import testReducer from '../../features/textArea/testReducer';

const rootReducer = combineReducers({
    test: testReducer
})

export default rootReducer;