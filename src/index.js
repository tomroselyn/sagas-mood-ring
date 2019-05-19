import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_IMAGES', fetchImages);
    yield takeEvery('FETCH_TAGS', fetchTags);
    yield takeEvery('ADD_TAG', addTag);
} //end rootSaga

//fetchImages saga -- requests image data from /api/images
function* fetchImages(action) {
    try {
        const imagesResponse = yield axios.get('/api/images');
        yield put({ type: 'SET_IMAGES', payload: imagesResponse.data });
    } catch(err) {
        console.log('error from fetchImages saga:', err);
    }
} //end fetchImages saga

//fetchTags saga -- requests tag data from /api/tags
function* fetchTags(action) {
    try {
        const tagsResponse = yield axios.get('/api/tags');
        yield put({ type: 'SET_TAGS', payload: tagsResponse.data });
    } catch(err) {
        console.log('error from fetchTags saga:', err);
    }
} //end fetchTags saga

//addTag saga -- requires payload to have img_id and tag_id
//calls FETCH_IMAGES after post to refresh image list with new data
function* addTag(action) {
    try {
        let q = action.payload;
        yield axios.post(`api/images/addtag?image_id=${q.img_id}&tag_id=${q.tag_id}`);
        yield put({ type: 'FETCH_IMAGES' });
    } catch(err) {
        console.log('error from addTag saga:', err);
    }
} //end addTag saga

// images reducer
const images = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
} //end images reducer

// tags reducer
const tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
} //end tags reducer

// position reducer stores current position in image "carousel" (array)
const position = (state = 0, action) => {
    switch (action.type) {
        case 'CHANGE_POSITION':
            return action.payload;
        default:
            return state;
    }
} //end position reducer

// store
const storeInstance = createStore(
    combineReducers({
        images,
        tags,
        position
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
