import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppointmentDetail from './AppointmentDetail';
import AddAppointmentForm from './AddAppointmentForm';

function Appointments(){
    const history = useHistory()
    const [appointments, setAppointments] = useState([])
   

    //GET appointments
    useEffect(() => {
        fetch('/appointments')
        .then(response => response.json())
        .then(data => setAppointments(data))
    }, [])

    //DELETE appointments
    function handleDeleteAppointment(e){
        fetch(`/appointments/${e.target.value}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        history.go("/appointments")
    }

    return(
        <div className="appointments-div">
            {appointments.map((oneAppointment) => {
                return (
                    <div className="appointment-detail-div" key={oneAppointment.id} style={{backgroundColor: "blue", margin: "10px"}}>
                        <AppointmentDetail oneAppointment={oneAppointment}/>
                        <button>EDIT</button>
                        <button value={oneAppointment.id} onClick={handleDeleteAppointment}>DELETE</button>
                    </div>
                )
            })}
            <AddAppointmentForm setAppointments={setAppointments}/>
        </div>
    )
}

export default Appointments;