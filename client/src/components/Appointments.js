import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppointmentDetail from './AppointmentDetail';
import AddAppointmentForm from './AddAppointmentForm';

function Appointments(){
    const history = useHistory()
    const [appointments, setAppointments] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    const [appointmentCategories, setAppointmentCategories] = useState([])
    const [appointmentProviders, setAppointmentProviders] = useState([])
    const [formData, setFormData] = useState({
        category: "",
        provider: "", 
        appointment_time: ""
    })
    const [appointmentTimeValue, setAppointmentTimeValue] = useState(new Date())

    function handleClickAppointment(e){
        const editedAppointment = appointments.filter((appointment) => appointment.id == e.target.value)[0]
        setIsEdit(!isEdit)
        setFormData(editedAppointment)
        setAppointmentTimeValue(editedAppointment.appointment_time)
    }
    function manageFormData(e) {
        let key = e.target.name
        let value = e.target.value
        if (isEdit) {
            setFormData({
                ...formData,
                [key]: value,
                id: formData.id
            })
        } else {
            setFormData({
                ...formData,
                [key]: value
            })
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const selectedCategory = appointmentCategories.filter((category) => category.category_name == formData.category)[0]
        const selectedProvider = appointmentProviders.filter((provider) => provider.provider_name == formData.provider)[0]
        const newFormData = {...formData, category_id: selectedCategory.id, provider_id: selectedProvider.id}
        if (isEdit) {
            fetch(`/appointments/${formData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFormData)
            })
            .then(response=>response.json())
            .then(data => {
                setIsEdit(false)
                history.go('/appointments')
            })
        } else {
            await fetch(`/appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFormData)
            })
            .then(response => response.json())
            .then(data => {
                history.go("/appointments")
            })
        }
    }

    useEffect(() => {
        fetch('/categories')
        .then(response => response.json())
        .then(dataCategories => setAppointmentCategories(dataCategories))
    }, [])
    useEffect(() => {
        fetch('/providers')
        .then(response => response.json())
        .then(dataProviders => setAppointmentProviders(dataProviders))
    }, [])

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
                        <button value={oneAppointment.id} onClick={handleClickAppointment}>EDIT</button>
                        <button value={oneAppointment.id} onClick={handleDeleteAppointment}>DELETE</button>
                    </div>
                )
            })}
            <AddAppointmentForm 
            setAppointmentTimeValue={setAppointmentTimeValue}
            appointmentTimeValue={appointmentTimeValue}
            appointmentCategories={appointmentCategories}
            appointmentProviders={appointmentProviders}
            formData={formData} setFormData={setFormData}
            manageFormData={manageFormData} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default Appointments;