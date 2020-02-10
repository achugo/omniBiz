export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            return [...state, action.payload]
    
        default:
           return state
    }
}