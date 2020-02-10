import React from 'react';
import { Link } from 'react-router-dom';


const EmployeeListing = ({name}) => {

    const storeSelectedUser = () => {
        if(localStorage){
            localStorage.setItem('selectedUser', name)
        }
    }
    return (
        <div className="list-employees">
            <span>{name}</span>
            <Link to="/employee" onClick={storeSelectedUser} >Enter details</Link>
        </div>
    )
}

export default EmployeeListing;