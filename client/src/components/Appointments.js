import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppointmentDetail from './AppointmentDetail';
import AddAppointmentForm from './AddAppointmentForm';
import SearchBar from './SearchBar';

import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Divider, Drawer, Grid, TextField, Toolbar, Typography } from '@mui/material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import SouthWestSharpIcon from '@mui/icons-material/SouthWestSharp';

function Appointments({ user, universalCategories, universalProviders }){
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

    useEffect(()=>{
        if (user && user.user_categories.length > 0) {
            setAppointmentCategories(user.user_categories)
        }
        if (user && user.user_providers.length > 0) {
            setAppointmentProviders(user.user_providers)
        }
    }, [user])


    //Appointments CU
    function handleClickAppointment(appointmentId){
        const editedAppointment = appointments.filter((appointment) => appointment.id == appointmentId)[0]
        let formDataAppointment = {...editedAppointment, category: editedAppointment.category.category_name, provider: editedAppointment.provider.provider_name}
        debugger
        setIsEdit(!isEdit)
        setFormData(formDataAppointment)
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
        const selectedCategory = universalCategories.filter((category) => {
            if (typeof formData.category == 'string') {
                return category.category_name == formData.category
            } else {
                return category.category_name == formData.category.category_name
            }
        })[0]
        const selectedProvider = universalProviders.filter((provider) => {
            if (typeof formData.provider == 'string') {
                return provider.provider_name == formData.provider
            } else {
                return provider.provider_name == formData.provider.provider_name
            }
        })[0]
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

    //GET appointments
    useEffect(() => {
        fetch('/appointments')
        .then(response => response.json())
        .then(data => setAppointments(data))
    }, [])

    //DELETE appointments
    function handleDeleteAppointment(appointmentId){
        fetch(`/appointments/${appointmentId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        history.go("/appointments")
    }

    const [sortAppointmentCategory, setSortAppointmentCategory] = useState("All")
    const [sortAppointmentProvider, setSortAppointmentProvider] = useState("All")
    const filteredAppointments = appointments.filter(appointment => {
        if (sortAppointmentCategory === "All") {
            return true
        } else if (appointment.category.category_name.toLowerCase() === sortAppointmentCategory.toLowerCase()) {
            return true
        } else {
            return false
        }
    }).filter((appointment) => {    
        if (sortAppointmentProvider ==="All") {
            return true
        } else if (appointment.provider.provider_name === sortAppointmentProvider) {
            return true
        } else {
            return false
        }
    })

    return(
        <Box sx={{display: 'flex'}}>
            <Drawer
                variant="permanent"
                sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar /> 
                <Box sx={{ overflow: 'auto'}} > <br />
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: 200 }}
                    >
                        <SearchBar
                            sortOther={appointmentProviders} setSortOther={setSortAppointmentProvider} 
                            categories={appointmentCategories} 
                            sortCategory={sortAppointmentCategory} setSortCategory={setSortAppointmentCategory} 
                        />
                    </Grid>
                    <Divider />
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <AddAppointmentForm 
                            setAppointmentTimeValue={setAppointmentTimeValue}
                            appointmentTimeValue={appointmentTimeValue}
                            universalCategories={universalCategories}
                            universalProviders={universalProviders} 
                            formData={formData} 
                            setFormData={setFormData}
                            manageFormData={manageFormData} 
                            handleSubmit={handleSubmit}
                        />
                    </Grid>
                </Box>
            </Drawer>
            <Container>
                <Typography variant="h2" color="text.secondary">               
                    Upcoming Appointments:
                </Typography>   
                { filteredAppointments.length > 0 ?  
                <Grid container spacing={4} padding={3}>
                    {filteredAppointments.map((oneAppointment) => {
                        return (
                            <Grid item xs={4} spacing={2}>
                                <Card key={oneAppointment.id}>
                                    <AppointmentDetail oneAppointment={oneAppointment}/>
                                    <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                                        <Button size="small" color="primary" value={oneAppointment.id} onClick={()=>handleClickAppointment(oneAppointment.id)}><EditSharpIcon /></Button>
                                        <Button size="small" color="primary" value={oneAppointment.id} onClick={()=>handleDeleteAppointment(oneAppointment.id)}><DeleteSharpIcon /></Button>
                                    </div>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                :
                <Typography variant="h5" color="text.secondary"><SouthWestSharpIcon /> Log Your First Appointment</Typography>
                }
            </Container>
        </Box>
    )
}

export default Appointments;