import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';

function AddAppointmentForm({ universalCategories, universalProviders, appointmentCategories, appointmentProviders, formData, setFormData, manageFormData, handleSubmit, setAppointmentTimeValue, appointmentTimeValue}){

    return(
        <div> 
            <form onSubmit={handleSubmit}>
                <FormControl style={{minWidth: 120}}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        label="Category"
                        name="category"
                        value={formData.category.category_name}
                        onChange={manageFormData}
                    >
                        {universalCategories.map((appointmentCategory) => {
                            return(
                                <MenuItem key={appointmentCategory.id} name={appointmentCategory.category_name} value={appointmentCategory.category_name}>
                                    {appointmentCategory.category_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl style={{minWidth: 120}}>
                    <InputLabel id="provider-label">Provider</InputLabel>
                    <Select
                        labelId="provider-label"
                        id="provider"
                        label="Provder"
                        name="provider"
                        value={formData.provider.provider_name}
                        onChange={manageFormData}
                    >
                        {universalProviders.map((appointmentProvider) => {
                            return(
                                <MenuItem key={appointmentProvider.id} name={appointmentProvider.provider_name} value={appointmentProvider.provider_name}>
                                    {appointmentProvider.provider_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <div><br />
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
                    <Button type="submit"><AddSharpIcon />New Appointment</Button>
                </div>
            </form>
        </div>
    )
}

export default AddAppointmentForm;