# Redux

- Redux as a library, has a for-five majour functions:
    - compose
    - combineReducers
    - createStore
    - applyMiddleware
    - bindActionCreators
    - Redux help us to add middlewares

1. compose
    - This is very simple utility function.
    - Let's say we have a string, we have to do the following transformation on the string:
        - remove all the spaces
        - concatinate the strig with it self
        - make all characters uppercase
        - make it italic
    - We can do this in the following way:
        ```javascript
        const str = 'Hello World';
        const removeSpaces = (str) => str.replace(' ', '');
        const repeatString = (str) => str.repeat(2);
        const makeUpperCase = (str) => str.toUpperCase();
        const result1 = makeItalic(makeUpperCase(repeatString(removeSpaces(str))));
        console.log(result1); // <i>HELLOHELLO</i>
        ```
    - Alternatively, we can do the same thing in the following way:
        ```javascript
        const fuctionsArr = [str, removeSpaces, repeatString, makeUpperCase, makeItalic];
        const result2 = fuctionsArr.reduce((currentValue, currentFunction) => {
        return currentFunction(currentValue);
        });
        console.log(result2); // <i>HELLOHELLO</i>
        ```
    - The above code is not very readable. We can use compose to make it more readable:
        ```javascript
        import { compose } from 'redux';

        const removeSpaces = (str) => str.replace(' ', '');
        const repeatString = (str) => str.repeat(2);
        const makeUpperCase = (str) => str.toUpperCase();
        const makeItalic = (str) => str.italics();
        
        const str = 'hello there how are you?';
        
        let composedFunctions = compose(makeItalic, makeUpperCase, repeatString, removeSpaces);
        // compose method takes bunch of functions and compose them to one chain of functions
        
        console.log(composedFunctions(str)); // <i>HELLOTHEREHOWAREYOU?HELLOTHEREHOWAREYOU?</i>
        ```

2. createStore
    #### Reducer 
    - Reducer is a simple function that takes two arguments:
    - Arguments:
        - state -> simple javascript object
        - action
    - Reducer returns only one output:
        - state object, that may or may be not updated
    - Reducer takes state as input, type of action and return a new state(or the same state)
    - createStore function takes reducer and initial state as input and returns a object with following methods:
        - getState
        - dispatch
        - subscribe
        - replaceReducer
    - Example:
        ```javascript
        import { createStore } from 'redux'

        function demoReducer(state, action) {
            switch (action.type) {
                case 'add_item':
                    return [...state, { name: action.itemName }]
                default:
                    return state
            }
        }
        
        const initialState = [
            { name: 'item1' },
            { name: 'item2' },
            { name: 'item3' }
        ]
        
        const response = createStore(demoReducer, initialState)
        
        console.log(response)

        //output
        /*
        {
          dispatch: [Function: dispatch],
          subscribe: [Function: subscribe],
          getState: [Function: getState],
          replaceReducer: [Function: replaceReducer],
          '@@observable': [Function: observable]
        }
        */
        ```
        - store -> a blackbox that has your state of the application and some utility methods, like dispatch, subscribe, getState, replaceReducer etc to manage
        - The only way to change the state is by dispatching an action
        ```javascript
        // action creaters
        const addItem = (itemName, itemQuentity) => {
            return {
                type: 'add_item',
                itemName,
                itemQuentity: itemQuentity || 1
            }
        }
        ```
        - dispatch method takes action as input and dispatches the action to the reducer
        - action is a simple javascript object with a type property
        - we can directly pass the action object to the dispatch method
        - but it is a good practice to create a action creator function that returns the action object
        - because, action creator function can be reused and we can write some logic inside the action creator function
3. subscribe
    - we can subscribe to the store to get notified whenever the state changes
    - subscribe method takes a callback function as input
    - subscribe method returns a function
    - subscribe method calls the callback function whenever the state changes
    - Example:
        ```javascript
        response.subscribe(() => {
            console.log('state changed');
        });
        ```
4. bindActionCreators
    - bindActionCreators takes two arguments:
        - action creators (simple javascript object containing action creator functions)
        - dispatch method
    - bindActionCreators returns a object with same keys as the action creators object
    - now we can call the action creators directly without dispatching the action
    - Example:
        ```javascript
        const actions = bindActionCreators({ addItem, }, store.dispatch)

        actions.addItem('Banana', 2)
        actions.addItem('Apple')
        ```
    - Why we need bindActionCreators?
        - Because, we don't want to dispatch the action manually every time
        - We want to call the action creator function directly
        - bindActionCreators does this for us
        - Also, when u have to pass the action creators to the child components, at that time, we don't want to pass the dispatch method to the child components
        - bindActionCreators does this for us
        - we can bind the action creators to the dispatch method and pass the bound action creators to the child components
5. combineReducers
    - write all the reducers logic in a single reducer function is not a good practice
    - we should write the reducers logic in different reducer functions
    - after that, we can combine all the reducers into a single reducer function and pass it to the createStore method
    - combineReducers takes a object as input
    - the object has key-value pairs
    - key is same as the key of the state object
    - value is a reducer function
    - combineReducers returns a reducer function
        Example:
        ```javascript
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
        ```
