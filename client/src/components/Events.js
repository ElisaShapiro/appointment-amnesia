import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EventDetail from './EventDetail';
import AddEventForm from './AddEventForm';
import SearchBar from './SearchBar';
import ChartAllData from './ChartAllData';

import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Divider, Drawer, Grid, TextField, Toolbar, Typography } from '@mui/material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import SouthWestSharpIcon from '@mui/icons-material/SouthWestSharp';

function Events({ user, universalCategories }){
    const history = useHistory()
    const [events, setEvents] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [eventCategories, setEventCategories] = useState([])
    const [formData, setFormData] = useState({
        category: "",
        content: "",
        severity: "",
        event_time: new Date()
    })
    useEffect(()=>{
        if (user && user.user_categories.length > 0) {
            setEventCategories(user.user_categories)
        }
    }, [user])

    const [eventTimeValue, setEventTimeValue] = useState(new Date())

    function handleClickEdit(eventId){
        const editedEvent = events.filter((event) => event.id == eventId)[0]
        let formDataEvent = {...editedEvent, category: editedEvent.category.category_name}
        setIsEdit(!isEdit)
        setFormData(formDataEvent)
        setEventTimeValue(editedEvent.event_time)
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
        if (!selectedCategory || !formData.severity || !formData.content) {
            alert('Please complete the form before submitting!')
        }
        else {
            const newFormData = {...formData, category_id: selectedCategory.id}
            if (isEdit) {
                fetch(`/events/${formData.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newFormData)
                })
                .then(response=>response.json())
                .then(data => {
                    setIsEdit(false)
                    history.go('/events')
                })
            } else {
                await fetch(`/events`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                body: JSON.stringify(newFormData)
                })
                .then(response => response.json())
                .then(data => {
                    history.go("/events")
                })
                setFormData({
                    content: "",
                    severity: "",
                })
            }
        }
    } 

    //GET events
    useEffect(() => {
        fetch('/events')
        .then(response => response.json())
        .then(data => setEvents(data))
    }, [])

    //DELETE events
    function handleDeleteEvent(eventId){
        fetch(`/events/${eventId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        history.go("/events")
    }

    //SEARCH and SORT events
    const [searchEvents, setSearchEvents] = useState("")
    const [sortEventCategory, setSortEventCategory] = useState("All")
    const [sortEventSeverity, setSortEventSeverity] = useState("All")
    const filteredEvents = events.filter(event => {
        if (searchEvents.length > 0) {
            return event.content.toLowerCase().includes(searchEvents.toLowerCase())
        } else {
            return true
        }
    }).filter((event) => {
        if (sortEventCategory === "All") {
            return true
        } else if (event.category.category_name.toLowerCase() === sortEventCategory.toLowerCase()) {
            return true
        } else {
            return false
        }
    }).filter((event) => {
        if (sortEventSeverity ==="All") {
            return true
        } else if (event.severity === parseInt(sortEventSeverity)) {
            return true
        } else {
            return false
        }
    }).sort((eventA, eventB) =>{
        if (eventA.event_time < eventB.event_time) {
            return 1 
        } else {
            return -1
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
                <Box sx={{ overflow: 'auto' }}> <br />
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: 225 }}
                    >
                        <SearchBar search={searchEvents} setSearch={setSearchEvents}
                            type={"events"} setSortOther={setSortEventSeverity} 
                            categories={eventCategories} sortCategory={sortEventCategory} setSortCategory={setSortEventCategory}
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
                        <AddEventForm 
                            setEventTimeValue={setEventTimeValue}
                            eventTimeValue={eventTimeValue}
                            universalCategories={universalCategories}
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
                <Typography variant="h3" color="text.secondary" paddingTop="20px">               
                    Event Log: 
                </Typography>
                {filteredEvents.length > 0 ? 
                <Grid container spacing={4}> 
                    {filteredEvents.map((oneEvent) => {
                        return (
                            <Grid item xs={8} spacing={2}>
                                <Card key={oneEvent.id}>
                                    <EventDetail oneEvent={oneEvent}/>
                                    <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                                        <Button size="small" color="primary" value={oneEvent.id} onClick={()=>handleClickEdit(oneEvent.id)}><EditSharpIcon /></Button>
                                        <Button size="small" color="primary" value={oneEvent.id} onClick={()=>handleDeleteEvent(oneEvent.id)}><DeleteSharpIcon/></Button>
                                    </div>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                :
                <Typography variant="h5" color="text.secondary"><SouthWestSharpIcon /> Log Your First Event</Typography>
                }
                <Grid container
                    sx={{backgroundColor: "#FFFFFF", height: "400px", width: "700px"}}
                >
                    <ChartAllData eventData={events} />
                </Grid>
            </Container>
        </Box>
    )
}

export default Events;