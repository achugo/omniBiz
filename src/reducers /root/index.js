import { combineReducers } from 'redux';
import addEmployeeReducer  from '../employee/addEmployeeReducer'
import employeeBonusesReducer from '../employee/employeeBonusesReducer';
import generatePhotoReducer from '../employee/generatePhotoReducer';

export default combineReducers({
    employee: addEmployeeReducer, 
    employeeBonuses: employeeBonusesReducer,
    photos: generatePhotoReducer
})