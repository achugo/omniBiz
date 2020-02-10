import React, { Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Allreport extends Component {
    constructor(props){
        super(props)

        this.state = {savedEmployees: []}
    }

    saveSingleReportToLocalStorage = (payload) => {
        if(localStorage){
            localStorage.setItem('single_report', payload)
        }
    }

    componentDidMount(){
     
     this.setState({savedEmployees: JSON.parse(localStorage.getItem('bonusRecords'))})
       
    }

    renderAllEmployees(){
       return this.state.savedEmployees !== [] ? this.state.savedEmployees.map(employee => {
            return (
            <div className="row">
                <div className="col-3"><img src={employee.photo} alt="profile photo" /></div>
                <div className="col-5">{employee.name}</div>
                <div className="col-1">{employee.bonus}</div>
                <div className="col-2"><Link to={`/report/${employee.name}`} onClick={this.saveSingleReportToLocalStorage(employee.name)}>View Report</Link></div>
            </div>
            
            )
        })
        :
        <div>No employees available</div>
    }
    render(){
        console.log("this is the saved emplyees", this.state.savedEmployees)
        return(
            <div className="container">
                {this.renderAllEmployees()}
            </div>
        )
    }
}

const mapStateToProps = ({employeeBonuses}) => {
    return {
        allEmployees: employeeBonuses
    }
}

export default connect(mapStateToProps)(Allreport)