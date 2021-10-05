import { format } from 'date-fns';

import { Card, CardContent, Typography } from '@mui/material';

function AppointmentDetail({ oneAppointment }){
    return(
        <Card>
            <CardContent>
                    <Typography variant='body1' color='text.secondary'>Appointment with:</Typography> 
                    <Typography variant='body2' color='text.secondary'>{oneAppointment.provider.provider_name}</Typography>
                    <Typography variant='body1' color='text.secondary'>When:</Typography>
                    <Typography variant='body2' color='text.secondary'>{format(new Date(oneAppointment.appointment_time), "eee MMM'-'d'-'y h':'mm bbb") }</Typography>
                    <Typography variant='body1' color='text.secondary'>Where:</Typography>
                    <Typography variant='body2' color='text.secondary'>{oneAppointment.provider.address}</Typography>
                    <Typography variant='body1' color='text.secondary'>Category:</Typography> 
                    <Typography variant='body2' color='text.secondary'>{oneAppointment.category.category_name}</Typography>
            </CardContent>
        </Card>
    )
}

export default AppointmentDetail; 