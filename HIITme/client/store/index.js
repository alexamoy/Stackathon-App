import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

//STATE
initialState = {
    intervalTime: 30,
    exercises: [],
    sets: 0,
    restTime: 0,
    selectedIndex: 0
}

//ACTION TYPES
const SET_INTERVAL = 'SET_INTERVAL';
const SET_EXERCISES = 'SET_EXERCISES';
const SET_SETS = 'SET_SETS';
const SET_REST = 'SET REST';

//ACTION CREATORS
export function setInterval(interval){
    const action = { type: SET_INTERVAL, intervalTime: interval};
    return action;
};

export function setExercises(exercises) {
    const action = { type: SET_EXERCISES, exercises };
    return action;
};

export function setSets(sets){
    const action = { type: SET_SETS, sets };
    return action;
};

export function setRest(rest){
    const action = { type: SET_REST, restTime: rest };
    return action;
};


function reducer (state = initialState, action){
    switch (action.type){
        case SET_INTERVAL: 
            return {
                ...state,
                intervalTime: action.intervalTime
            };
        case SET_EXERCISES: 
            return {
                ...state,
                exercises: action.exercises
            };
        case SET_SETS: 
            return {
                ...state, 
                sets: action.sets
            };
        case SET_REST:
            return {
                ...state, 
                restTime: action.restTime
            };
        default: 
            return state;
    }
}

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware)

export default store;