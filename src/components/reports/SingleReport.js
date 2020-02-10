import React, { useEffect, useState } from 'react'

const SingleReport = (props) => {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('bonusRecords')))
    }, []);

    console.log(userData)

    const theChosenOne = localStorage.getItem('single_report')

    const selectedRecord = userData && userData.find((user) => {
        return user.name == theChosenOne
    })
    
    if (selectedRecord) {
        return (
            <div className="container">
    
                <div className="row">
                    <div className="col-3"><img src={selectedRecord.photo} alt="single report photo" /></div>
                    <div className="col-5">{selectedRecord.name}</div>
                    <div className="col-4">{selectedRecord.bonus}</div>
                </div>
                
            </div>
        )
    }
    else{
        return (<div>No records available</div>)
    }

    
}

export default SingleReport;