import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppointmentDetail from './AppointmentDetail';
import AddAppointmentForm from './AddAppointmentForm';
import SearchBar from './SearchBar';
import { isPast } from 'date-fns';
import { Box, Button, Card, Container, Divider, Drawer, Grid, Toolbar, Typography } from '@mui/material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import SouthWestSharpIcon from '@mui/icons-material/SouthWestSharp';

function Appointments({ user, universalCategories, universalProviders, appointments, setAppointments, hasUpdate, setHasUpdate }){
    const history = useHistory()
    // const [appointments, setAppointments] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [appointmentCategories, setAppointmentCategories] = useState([])
    const [appointmentProviders, setAppointmentProviders] = useState([])
    const [formData, setFormData] = useState({
        category: "",
        provider: "", 
        appointment_time: new Date()
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
            if (typeof formData.category == "string") {
                return category.category_name == formData.category
            } else {
                return category.category_name == formData.category.category_name
            }
        })[0]
        const selectedProvider = universalProviders.filter((provider) => {
            if (typeof formData.provider == "string") {
                return provider.provider_name == formData.provider
            } else {
                return provider.provider_name == formData.provider.provider_name
            }
        })[0]
        if (!selectedCategory || !selectedProvider) {
            alert("Please complete the form before submitting!")
        }
        else {
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
                    setHasUpdate(!hasUpdate)
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
                    setHasUpdate(!hasUpdate)
                })
            }
            setFormData({
                category: "", 
                provider: "", 
                appointment_time: new Date()
            })
        }
    }

    //DELETE appointments
    function handleDeleteAppointment(appointmentId){
        fetch(`/appointments/${appointmentId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        setHasUpdate(!hasUpdate)
    }

    //SEARCH and SORT appointments
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

    const pastAppointments = filteredAppointments.filter(oneAppointment=> {
        let date = new Date(oneAppointment.appointment_time)
        return isPast(date)
    })

    const futureAppointments = filteredAppointments.filter(oneAppointment=> {
        let date = new Date(oneAppointment.appointment_time)
        return !isPast(date)
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
                        direction='column'
                        alignItems='center'
                        justify='center'
                        style={{ minHeight: 225 }}
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
                        direction='column'
                        alignItems='center'
                        justify='center'
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
                            isEdit={isEdit}
                        />
                    </Grid>
                    <Divider />
                </Box>
            </Drawer>
            <Container>
                <Typography variant='h3' color='text.secondary' paddingTop='20px'>               
                    Upcoming Appointments:
                </Typography>   
                { futureAppointments.length > 0 ?  
                <Grid container spacing={4} >
                    {futureAppointments.map((oneAppointment) => {
                        return (
                            <Grid item xs={4} spacing={2}>
                                <Card key={oneAppointment.id}>
                                    <AppointmentDetail oneAppointment={oneAppointment}/>
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Button size='small' color='primary' value={oneAppointment.id} onClick={()=>handleClickAppointment(oneAppointment.id)}><EditSharpIcon /></Button>
                                        <Button size='small' color='primary' value={oneAppointment.id} onClick={()=>handleDeleteAppointment(oneAppointment.id)}><DeleteSharpIcon /></Button>
                                    </div>
                                </Card>
                            </Grid>
                        )}
                    )}
                </Grid>
                :
                <Typography variant='h5' color='text.secondary'><SouthWestSharpIcon /> Log an Upcoming Appointment</Typography>
                }
            {/* </Container>
            <Container> */}
                <Typography variant='h3' color='text.secondary' paddingTop='20px'>               
                    Past Appointments:
                </Typography>   
                { pastAppointments.length > 0 ?  
                <Grid container spacing={4} >
                    {pastAppointments.map((oneAppointment) => {
                        return (
                            <Grid item xs={4} spacing={2}>
                                <Card key={oneAppointment.id}>
                                    <AppointmentDetail oneAppointment={oneAppointment}/>
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Button size='small' color='primary' value={oneAppointment.id} onClick={()=>handleDeleteAppointment(oneAppointment.id)}><DeleteSharpIcon /></Button>
                                    </div>
                                </Card>
                            </Grid>
                        )}
                    )}
                </Grid>
                :
                <Typography variant='h5' color='text.secondary'><SouthWestSharpIcon /> You Have No Past Appointments</Typography>
                }
            </Container>
        </Box>
    )
}

export default Appointments;