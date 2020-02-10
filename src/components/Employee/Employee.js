import React, { useState, useEffect } from 'react';
import TimeField from 'react-simple-timefield';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { employeeBonus } from '../../actions/employeeBonuses'
import { generatePhoto } from '../../actions/generatePhoto'


const Employee = (props) => {
    const [mondayTime, setMondayTime] = useState('09:00')
    const [tuesdayTime, setTuesdayTime] = useState('09:00')
    const [wednesdayTime, setWednesdayTime] = useState('09:00')
    const [thursdayTime, setThursdayTime] = useState('09:00')
    const [fridayTime, setFridayTime] = useState('09:00')
    const [currentUser, setCurrentUser] = useState('')
    const [bonus, setBonus] = useState('')
    

    useEffect(() => {
        props.generatePhoto()
       setCurrentUser(localStorage.getItem('selectedUser'))
       
    }, [])

    useEffect(() => {
        if(localStorage){
            localStorage.setItem('bonusRecords', JSON.stringify(props.employeesBonus))
        }
    }, [props.employeesBonus])

    const onTimeChangeMonday = ({target}) => {
        setMondayTime(target.value)
        console.log(mondayTime)
    }
    const onTimeChangeTuesday = ({target}) => {
        setTuesdayTime(target.value)
    }
    const onTimeChangeWednesday = ({target}) => {
        setWednesdayTime(target.value)
    }
    const onTimeChangeThursday = ({target}) => {
        setThursdayTime(target.value)
    }
    const onTimeChangeFriday = ({target}) => {
        setFridayTime(target.value)
    }

    function bonusCalculator(arrivalTimeInMins){
        if(arrivalTimeInMins < 540){
            console.log(arrivalTimeInMins)
            const bonusMins = 540 - arrivalTimeInMins
            const calcBonus = Math.floor(bonusMins / 5)
            return calcBonus * 50
        }
        else{
            console.log(arrivalTimeInMins);
            
            return 0
        }
        
    }

    function convertArrivalTimeToBonus(digits){
        //value of 09:00 when passed through this function is 540
        const splitDigits = digits.split(':')
        const totalTimeInsec = (Number(splitDigits[0]) * 60) +  Number(splitDigits[1])
        return bonusCalculator(totalTimeInsec)
    }

   

    const onSubmitEmployeeArrivalTimes = (el) => {
        el.preventDefault();
        const employeeBonus = convertArrivalTimeToBonus(mondayTime) +  convertArrivalTimeToBonus(tuesdayTime) + convertArrivalTimeToBonus(wednesdayTime) + convertArrivalTimeToBonus(thursdayTime) + convertArrivalTimeToBonus(fridayTime)
        const record = props.employeesBonus.filter(employee => employee.name === currentUser)
        if(record.length ==0 ){
            setBonus(employeeBonus)
            props.employeeBonus({name: currentUser, bonus: employeeBonus, photo: props.photo})
            
        }
        else{
            alert('employee bonus record already exists')   
        }
        
    }

    console.log(props.employeesBonus, props.photo)
    return (
       
        <div className="container employee-entry">
            <div className="row">
                <div className="col-3"><img src={props.photo} alt="random image" /></div>
                <div className="col-7">{currentUser}</div>
                <div className="col-2"><Link to="/reports">All reports</Link></div>
            </div>
            <form onSubmit={onSubmitEmployeeArrivalTimes}>
                <div className="">
                    <div className="row">
                        <div className="col">
                        <span>Monday</span>
                        </div>
                        <div className="col">
                        <TimeField value={mondayTime} onChange={onTimeChangeMonday} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                        <span>Tuesday</span>
                        </div>
                        <div className="col">
                        <TimeField value={tuesdayTime} onChange={onTimeChangeTuesday} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                        <span>Wednesday</span>
                        </div>
                        <div className="col">
                        <TimeField value={wednesdayTime} onChange={onTimeChangeWednesday} />
                        </div>
                    </div>
                   
                    <div className="row">
                        <div className="col">
                        <span>Thursday</span>
                        </div>
                        <div className="col">
                        <TimeField value={thursdayTime} onChange={onTimeChangeThursday} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                        <span>Friday</span>
                        </div>
                        <div className="col">
                        <TimeField value={fridayTime} onChange={onTimeChangeFriday} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Calculate Bonus</button>
                </div>
            </form>
            <div className="">
                {currentUser} Bonus is {bonus}
            </div>
        </div>
        
    )
}

const mapStateToProps = ({employee, employeeBonuses, photos}) => {
    console.log(employeeBonuses)
    return {
        employees: employee,
        employeesBonus: employeeBonuses,
        photo: photos
    }
}
export default connect(mapStateToProps, {employeeBonus, generatePhoto})(Employee);