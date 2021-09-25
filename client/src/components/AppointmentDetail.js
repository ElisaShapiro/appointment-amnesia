import { format } from 'date-fns';

function AppointmentDetail({ oneAppointment }){
    return(
        <div>
            <p>Appointment with: {oneAppointment.provider.provider_name}</p>
            <p>When: {format(new Date(oneAppointment.appointment_time), "eee MMM'-'d'-'y h':'mm bbb") }</p>
            <p>Where: {oneAppointment.provider.address}</p>    
            <p>Category: {oneAppointment.category.category_name}</p>  
        </div>
    )
}

export default AppointmentDetail; 