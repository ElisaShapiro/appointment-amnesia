import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function AddAppointmentForm({ universalCategories, universalProviders, appointmentCategories, appointmentProviders, formData, setFormData, manageFormData, handleSubmit, setAppointmentTimeValue, appointmentTimeValue}){

    return(
        <div> 
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select onChange={manageFormData} type="select" 
                        name="category" value={formData.category.category_name}>
                        {universalCategories.map((appointmentCategory) => {
                            return(
                                <option key={appointmentCategory.id} name={appointmentCategory.category_name}>
                                    {appointmentCategory.category_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="provider">Provider:</label>
                    <select onChange={manageFormData} type="select" name="provider" 
                        value={formData.provider.provider_name}>
                        {universalProviders.map((appointmentProvider) => {
                            return(
                                <option key={appointmentProvider.id} name={appointmentProvider.provider_name}>
                                    {appointmentProvider.provider_name}
                                </option>
                            )
                        })}
                    </select>
                </div><br />
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
                    <button type="submit">Add New Appointment</button>
                </div>
            </form>
        </div>
    )
}

export default AddAppointmentForm;