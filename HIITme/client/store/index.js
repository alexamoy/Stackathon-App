import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

//STATE
initialState = {
    intervalTime: 30,
    exercises: ['SQUATS','PUSH UPS','CRUNCHES'],
    sets: 1,
    restTime: 0,
    selectedIndex: 0,
    newWorkout: {
        intervalTime: 30,
        exercises: ['SQUATS','PUSH UPS','CRUNCHES'],
        sets: 1,
        restTime: 0
    },
    motivations: [
        'Get off your lazy ass',
        'That donut is not going to work off itself',
        'You look like the Incredible Hulk’s wife.',
        'You’re one of those packages at Christmas time where you say, Can I give it back?',
        'Completely and utterly horrific.'
    ],
    finalWords: [
        'Did you even try?', 
        'That was a mediocre workout', 
        'You could have done better', 
        'Just awful', 
        'I think you need to do another workout after that performance'
    ],
    motivationalMemes: [
        'https://www.askideas.com/media/36/Oh-You-Sore-From-Working-Out-But-Did-You-Die-Funny-Exercise-Meme-Image.jpg',
        'http://www.vitamin-ha.com/wp-content/uploads/2015/09/Funny-Workout-Motivation-17.jpg',
        'https://i.pinimg.com/originals/b7/05/cb/b705cbc3042a2946ff2a8cfb3efa2c97.jpg',
        'http://www.bajiroo.com/wp-content/uploads/2015/10/funny-fun-lol-gym-workout-memes-pics-images-photos-pictures-bajiroo-20.png',
        'https://i.pinimg.com/originals/d5/fc/7f/d5fc7f9cf9389c2e771a3c4f2cb56250.jpg',
        'https://i.pinimg.com/736x/03/3e/c7/033ec7ab33fd12637980340282d72e26--workout-memes-funny-gym-humor-memes.jpg',
        'https://i.pinimg.com/originals/36/29/0d/36290d9e73db6e947302858728fdb55a.jpg'
    ]
}

//ACTION TYPES
const CREATE_WORKOUT = 'CREATE_WORKOUT';
const SET_WORKOUT = 'SET_WORKOUT';

//ACTION CREATORS

export function setWorkout(workout) {
    const action = { type: SET_WORKOUT, workout };
    return action;
}
export function createWorkout(name, edit) {
    const action = { type: CREATE_WORKOUT, change: { [name]: edit } };
    return action;
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_WORKOUT:
            let newChange = action.change || '';
            let name = Object.keys(newChange)[0];
            return {
                ...state,
                newWorkout: {
                    ...state.newWorkout,
                    [name]: action.change[name]
                }
            }
        case SET_WORKOUT:
            return {
                ...state,
                intervalTime: action.workout.intervalTime,
                exercises: action.workout.exercises,
                sets: action.workout.sets,
                restTime: action.workout.restTime
            }
        default:
            return state;
    }
}


const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware)

export default store;