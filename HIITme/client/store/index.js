import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

//STATE
initialState = {
    intervalTime: 30,
    exercises: ['pushups'],
    sets: 1,
    restTime: 0,
    selectedIndex: 0,
    newWorkout: {
        intervalTime: 30,
        exercises: ['pushups'],
        sets: 1,
        restTime: 0
    },
    motivations: [
        'Get off your lazy ass', 
        'That donut is not going to work off itself'
    ]
}

//ACTION TYPES
const SET_INTERVAL = 'SET_INTERVAL';
const SET_EXERCISES = 'SET_EXERCISES';
const SET_SETS = 'SET_SETS';
const SET_REST = 'SET REST';
const CREATE_WORKOUT = 'CREATE_WORKOUT';

//ACTION CREATORS
export function setInterval(interval) {
    const action = { type: SET_INTERVAL, intervalTime: interval };
    return action;
};

export function setExercises(exercises) {
    const action = { type: SET_EXERCISES, exercises };
    return action;
};

export function setSets(sets) {
    const action = { type: SET_SETS, sets };
    return action;
};

export function setRest(rest) {
    const action = { type: SET_REST, restTime: rest };
    return action;
};

export function createWorkout(name, number) {
    const action = { type: CREATE_WORKOUT, change: {[name]: number} };
    return action;
}

function reducer(state = initialState, action) {
    let newChange = action.change || ''; 
    let name = Object.keys(newChange)[0];
    switch (action.type) {
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
        case CREATE_WORKOUT:
            console.log('action',action)
            return {
                ...state,
                newWorkout: {
                    ...state.newWorkout,
                    [name]: action.change[name]
                }
            }
        default:
            return state;
    }
}


const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware)

export default store;