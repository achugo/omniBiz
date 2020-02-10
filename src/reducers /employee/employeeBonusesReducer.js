export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_BONUS':
            //debugger
            return [...state, action.payload]
    
        default:
            return state;
    }
}