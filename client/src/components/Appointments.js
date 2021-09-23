import { useState, useEffect } from 'react';
import AppointmentDetail from './AppointmentDetail'
import AddAppointmentForm from './AddAppointmentForm'

function Appointments(){
    const [appointments, setAppointments] = useState([])
   

    //GET appointments
    useEffect(() => {
        fetch('/appointments')
        .then(response => response.json())
        .then(data => setAppointments(data))
    }, [])

    return(
        <div className="appointments-div">
            {appointments.map((oneAppointment) => {
                return (
                    <div className="appointment-detail-div" key={oneAppointment.id} style={{backgroundColor: "blue", margin: "10px"}}>
                        <AppointmentDetail oneAppointment={oneAppointment}/>
                        <button>EDIT</button>
                        <button>DELETE</button>
                    </div>
                )
            })}
            <AddAppointmentForm setAppointments={setAppointments}/>
        </div>
    )
}

export default Appointments;