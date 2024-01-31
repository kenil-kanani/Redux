import { createStore, bindActionCreators } from 'redux'

function demoReducer(state, action) {
    switch (action.type) {
        case 'add_item':
            return [...state, { name: action.itemName, quentity: action.itemQuentity }]
        default:
            return state
    }
}

const initialState = [
    { name: 'Mango', quentity: 4 },
]

const store = createStore(demoReducer, initialState)

store.subscribe(() => {
    console.log("State might have changed")
})

// store.dispatch(
//     {
//         type: 'add_item',
//         itemName: 'Banana',
//         itemQuentity: 2
//     }
// )

// action creaters
const addItem = (itemName, itemQuentity) => {
    return {
        type: 'add_item',
        itemName,
        itemQuentity: itemQuentity || 1
    }
}



// store.dispatch(addItem('Banana', 2))
// store.dispatch(addItem('Apple'))

// console.log(store.getState()) 

const actions = bindActionCreators({ addItem, }, store.dispatch)

actions.addItem('Banana', 2)
actions.addItem('Apple')

console.log(store.getState())