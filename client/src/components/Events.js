import { useState, useEffect } from 'react';
import EventDetail from './EventDetail';
import AddEventForm from './AddEventForm';
import SearchBar from './SearchBar';
import ChartAllData from './ChartAllData';
import ChartDistribution from './ChartDistribution';

import { Box, Button, Card, Container, Divider, Drawer, Grid, Toolbar, Typography } from '@mui/material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import SouthWestSharpIcon from '@mui/icons-material/SouthWestSharp';

function Events({ user, universalCategories, events, hasUpdate, setHasUpdate }){
    const [showCharts, setShowCharts] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [eventCategories, setEventCategories] = useState([])
    const [eventTimeValue, setEventTimeValue] = useState(new Date())
    const [formData, setFormData] = useState({
        category: "",
        content: "",
        severity: "",
        event_time: new Date()
    })

    //GET user's categories
    useEffect(()=>{
        if (user && user.user_categories && user.user_categories.length > 0) {
            setEventCategories(user.user_categories)
        }
    }, [user])


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
            if (typeof formData.category == "string") {
                return category.category_name == formData.category
            } else {
                return category.category_name == formData.category.category_name
            }
        })[0]
        if (!selectedCategory || !formData.severity || !formData.content) {
            alert("Please complete the form before submitting!")
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
                    setHasUpdate(!hasUpdate)
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
                    setHasUpdate(!hasUpdate)
                })
            }
            setFormData({
                content: "",
                severity: "",
            })
        }
    } 

    //DELETE events
    function handleDeleteEvent(eventId){
        fetch(`/events/${eventId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        setHasUpdate(!hasUpdate)
    }

    //SEARCH and SORT events
    const [searchEvents, setSearchEvents] = useState("")
    const [sortEventCategory, setSortEventCategory] = useState("All")
    const [sortEventSeverity, setSortEventSeverity] = useState("All")
    const filteredEvents = Array.isArray(events) ? events.filter(event => {
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
    }) : [];

   
    
    return(
        <Box sx={{display: 'flex'}}>
            <Drawer
                variant='permanent'
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
                        direction='column'
                        alignItems='center'
                        justify='center'
                        style={{ minHeight: 225 }}
                    >
                        <SearchBar search={searchEvents} setSearch={setSearchEvents} type={'events'} 
                            categories={eventCategories} setSortOther={setSortEventSeverity} 
                            sortCategory={sortEventCategory} setSortCategory={setSortEventCategory}
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
                <div style={{display: 'flex', alignItems: 'center', paddingTop: '20px', paddingLeft: '24px'}}>
                    <Typography variant='h3' color='#FFF'>               
                        Charts:  
                    </Typography>
                    {events.length > 0 ? 
                    <Button size='small' color='secondary' variant='contained' onClick={()=>setShowCharts(!showCharts)}>
                        {showCharts ? "HIDE CHARTS" : "SHOW CHARTS"}
                    </Button> 
                    : <Typography variant='h4' color='#FFF' sx={{paddingLeft: "6px"}}>
                        No Charts Created Yet
                    </Typography>}
                </div>
                {showCharts ?
                    <Container>
                        {events.length > 0 ?
                            <Container>
                                <Box 
                                    sx={{backgroundColor: '#bce2d7', height: '450px', marginTop: '16px',  maxWidth: "910px" }}
                                >
                                    <ChartAllData eventData={events} />
                                </Box>
                                {filteredEvents.length > 0 ?
                                <Box 
                                    sx={{backgroundColor: '#bce2d7', height: '450px', marginTop: '16px', maxWidth: "910px"}}
                                >
                                    <ChartDistribution eventData={events} sortEventCategory={sortEventCategory} />
                                </Box>
                                : null}
                            </Container>
                        : null }
                    </Container>
                : null}
            <Container>
            <Grid>
                <Typography variant='h3' color='#FFF' paddingTop='20px'>               
                    Event Log: 
                </Typography>
                {filteredEvents.length > 0 ? 
                <Grid container spacing={3} sx={{flexWrap: 'wrap'}}> 
                    {filteredEvents.map((oneEvent) => {
                        return (
                            <Grid item xs={6} key={oneEvent.id}>
                                <Card key={oneEvent.id}>
                                    <EventDetail oneEvent={oneEvent}/>
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Button size='small' color='primary' value={oneEvent.id} onClick={()=>handleClickEdit(oneEvent.id)}><EditSharpIcon /></Button>
                                        <Button size='small' color='primary' value={oneEvent.id} onClick={()=>handleDeleteEvent(oneEvent.id)}><DeleteSharpIcon/></Button>
                                    </div>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                :
                <Typography variant='h5' color='#FFF'><SouthWestSharpIcon /> Log Your First Event</Typography>
                }
            </Grid>
            </Container>
            </Container>

            
        </Box>
    )
}

export default Events;