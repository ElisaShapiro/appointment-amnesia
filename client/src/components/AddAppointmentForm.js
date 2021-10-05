import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';

function AddAppointmentForm({ universalCategories, universalProviders, formData, setFormData, manageFormData, handleSubmit, appointmentTimeValue, setAppointmentTimeValue, isEdit }){

    return(
        <Container> 
            <form onSubmit={handleSubmit}>
                <Typography sx={{paddingBottom: '10px'}}><AddBoxSharpIcon />Add Appointment</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} sx={{minWidth: 200}}/>}
                            label="Date and Time"
                            value={appointmentTimeValue}
                            onChange={(newAppointmentTimeValue) => {
                                setFormData({...formData, appointment_time: newAppointmentTimeValue})
                                setAppointmentTimeValue(newAppointmentTimeValue);
                            }}   
                        />
                    </LocalizationProvider>
                <FormControl style={{minWidth: 200}} margin='dense'>
                    <InputLabel id='category-label'>Category</InputLabel>
                    <Select
                        labelId='category-label'
                        id='category'
                        label='Category'
                        name='category'
                        value={formData.category}
                        onChange={manageFormData}
                        sx={{background: '#9dbbae'}}
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
                <FormControl style={{minWidth: 200}} margin='dense'>
                    <InputLabel id='provider-label'>Provider</InputLabel>
                    <Select
                        labelId='provider-label'
                        id='provider'
                        label='Provder'
                        name='provider'
                        value={formData.provider}
                        onChange={manageFormData}
                        sx={{background: '#9dbbae'}}
                    >
                        {universalProviders.map((appointmentProvider) => {
                            return(
                                <MenuItem key={appointmentProvider.id} name={appointmentProvider.provider_name} value={appointmentProvider.provider_name}>
                                    {appointmentProvider.provider_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl><br />
                <Button type='submit'><AddSharpIcon /> {isEdit ? "Edit Appointment" : "New Appointment"} </Button>              
            </form>
        </Container>
    )
}

export default AddAppointmentForm;