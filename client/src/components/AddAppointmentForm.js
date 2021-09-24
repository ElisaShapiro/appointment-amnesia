import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function AddAppointmentForm({ appointmentCategories, appointmentProviders, formData, setFormData, manageFormData, handleSubmit, setAppointmentTimeValue, appointmentTimeValue}){
    // const history = useHistory()
    // const [appointmentCategories, setAppointmentCategories] = useState([])
    // const [appointmentProviders, setAppointmentProviders] = useState([])
    // const [formData, setFormData] = useState({
    //     category: "",
    //     provider: "", 
    //     appointment_time: ""
    // })
    // const [appointmentTimeValue, setAppointmentTimeValue] = useState(new Date())

    // function manageFormData(e) {
    //     let key = e.target.name
    //     let value = e.target.value
   
    //     setFormData({
    //       ...formData,
    //       [key]: value
    //     })
    // }
    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     const selectedCategory = appointmentCategories.filter((category) => category.category_name == formData.category)[0]
    //     const selectedProvider = appointmentProviders.filter((provider) => provider.provider_name == formData.provider)[0]
    //     debugger
    //     const newFormData = {...formData, category_id: selectedCategory.id, provider_id: selectedProvider.id}
    //     await fetch(`/appointments`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newFormData)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         history.go("/appointments")
    //     })
    // }
    

    // useEffect(() => {
    //     fetch('/categories')
    //     .then(response => response.json())
    //     .then(dataCategories => setAppointmentCategories(dataCategories))
    // }, [])
    // useEffect(() => {
    //     fetch('/providers')
    //     .then(response => response.json())
    //     .then(dataProviders => setAppointmentProviders(dataProviders))
    // }, [])

    return(
        <div> 
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category">Category</label>
                    <select onChange={manageFormData} type="select" name="category" value={formData.category.category_name}>
                        {appointmentCategories.map((appointmentCategory) => {
                            return(
                                <option key={appointmentCategory.id} name={appointmentCategory.category_name}>{appointmentCategory.category_name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="provider">Provider</label>
                    <select onChange={manageFormData} type="select" name="provider" value={formData.provider.provider_name}>
                        {appointmentProviders.map((appointmentProvider) => {
                            return(
                                <option key={appointmentProvider.id} name={appointmentProvider.provider_name}>{appointmentProvider.provider_name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date and Time of Appointment"
                            value={appointmentTimeValue}
                            onChange={(newAppointmentTimeValue) => {
                                setFormData({...formData, appointment_time: newAppointmentTimeValue})
                                setAppointmentTimeValue(newAppointmentTimeValue);
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <button type="submit">Submit new appointment</button>
                </div>
            </form>
        </div>
    )
}

export default AddAppointmentForm;