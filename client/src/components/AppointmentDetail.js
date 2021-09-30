import { format } from 'date-fns';

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material';

function AppointmentDetail({ oneAppointment }){
    return(
        <Card>
            <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Appointment with: {oneAppointment.provider.provider_name} <br />
                        When: {format(new Date(oneAppointment.appointment_time), "eee MMM'-'d'-'y h':'mm bbb") }<br />
                        Where: {oneAppointment.provider.address}<br />
                        Category: {oneAppointment.category.category_name}       
                    </Typography>
            </CardContent>
        </Card>
    )
}

export default AppointmentDetail; 