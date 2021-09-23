function AppointmentDetail({ oneAppointment }){
    return(
        <div>
            <p>Appointment with: {oneAppointment.provider.provider_name}</p>
            <p>When: {oneAppointment.appointment_time}</p>
            <p>Where: {oneAppointment.provider.address}</p>      
            
        </div>
    )
}

export default AppointmentDetail;