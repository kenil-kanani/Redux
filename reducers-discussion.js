import { createStore, combineReducers } from "redux"

const state = {
    users: [
        {
            id: 1,
            name: "Kenil",
            todos: [
                { id: 1, name: 'Learn Redux' },
                { id: 2, name: 'Learn React' }
            ]
        },
        {
            id: 2,
            name: "Raj",
            todos: [
                { id: 1, name: 'Learn Js' },
                { id: 2, name: 'Learn Java' }
            ]
        },
        {
            id: 3,
            name: "Ravi",
            todos: [
                { id: 1, name: 'Learn Python' },
                { id: 2, name: 'Learn C' }
            ]
        }
    ]
}


// Bad Code
function reducer(state, action) {
    if (action.type === 'EDIT_TODO') {
        let newTodoData = action.name
        const newState = state.users.map(user => {
            if (user.id === action.id) {
                let newTodo = user.todos.map(todo => {
                    if (todo.id === action.todoId) {
                        todo.name = newTodoData
                    }
                    return todo
                })
                user.todos = newTodo
            }
            return user
        })
    }
}




const state2 = {
    users: [
        {
            id: 1,
            name: "Kenil",
        },
        {
            id: 2,
            name: "Raj",
        },
        {
            id: 3,
            name: "Ravi",
        }
    ],
    todos: [
        { userId: 1, todoId: 1, name: 'Learn Redux' },
        { userId: 1, todoId: 2, name: 'Learn React' },
        { userId: 2, todoId: 1, name: 'Learn Js' },
        { userId: 2, todoId: 2, name: 'Learn Java' },
        { userId: 3, todoId: 1, name: 'Learn Python' },
        { userId: 3, todoId: 2, name: 'Learn C' }
    ]
}

/*
const reducer = (state, action) => {
    if (action.type === 'EDIT_TODO') {
        const newTodoData = action.name
        const newState = state.todos.map(todo => {
            if (todo.todoId === action.todoId) {
                todo.name = newTodoData
            }
            return todo
        })
        return {
            ...state,
            todos: newState
        }
    }
    if (action.type === 'ADD_USER') {
        const newUser = {
            id: action.id,
            name: action.name
        }
        return {
            ...state,
            users: [...state.users, newUser]
        }
    }
    return state
}

*/

// we can write separate reducer for users and todos

function userReducer(users = state2.users, action) {
    if (action.type === 'ADD_USER') {
        const newUser = {
            id: action.id,
            name: action.name
        }
        return [...users, newUser]
    }
    return users
}

function todoReducer(todos = state2.todos, action) {
    if (action.type === 'EDIT_TODO') {
        const newTodoData = action.name
        const newState = todos.map(todo => {
            if (todo.todoId === action.todoId) {
                todo.name = newTodoData
            }
            return todo
        })
        return newState
    }
    return todos
}


const combineRed = combineReducers({
    users: userReducer,
    todos: todoReducer
})

const store = createStore(combineRed)

console.log(store.getState())
store.dispatch({
    type: 'ADD_USER',
    id: 1,
    name: "Kenil"
})
console.log(store.getState())