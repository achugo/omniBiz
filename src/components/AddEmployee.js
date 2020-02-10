import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addEmployee } from '../actions/addEmployee'

import Employeelisting from './EmployeeListing'

const AddEmployee = (props) => {
    const [empInput, setEmpInput] = useState('')
    const [storedUsers, setStoredUsers] = useState([])

    const trackEmployeeInput = (val) => {
        setEmpInput(val.target.value)

    }
    useEffect(() => {
        if (localStorage.getItem('employees')) {
            setStoredUsers(localStorage.getItem('employees'))
        }
        
    },[])

    useEffect(() => {
        if(!localStorage.getItem('employees')){
            localStorage.setItem('employees', JSON.stringify(props.employees))
        }
        
    }, [props.employees])

    const submitEmployee = (e) => {
        e.preventDefault()
        if(props.employees.length < 10 && empInput.length > 3) {
            props.addEmployee(empInput)
            console.log(props.employees)
            localStorage.setItem('employees', JSON.stringify(props.employees))
        }
        else if(empInput.length <= 3 ){
            alert('input value must be more than 3 letters')
        }
        else{
            alert("maximum number of employee added")
        }
        
        setEmpInput('')
    }
   
   const employees = props.employees ? props.employees.map(emp => {
       return(
           <Employeelisting name={emp} key={emp} />
       )
   }) : storedUsers.map(emp => {
    return(
        <Employeelisting name={emp} key={emp} />
    )
   })

   console.log(storedUsers, employees)
    return (
        <div className="container employee-listing">
            <div className="">
                <span className="title">Add Employee Record</span>
            </div>
            <div className="row center-form">
                <div className="form-wrapper">
                    <form className="form-inline" onSubmit={submitEmployee}>
                        <div className="form-group">
                            <input type="text" value={empInput} className="form-control" onChange={trackEmployeeInput} placeholder="Enter employee name" />
                        </div>
                        
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </form>
                </div>
          
                
            </div>
            {employees}
        </div>
    )
}

const mapStateToProps = ({employee}) => {
    return {
        employees: employee
    }
}

export default connect(mapStateToProps, {addEmployee})(AddEmployee);