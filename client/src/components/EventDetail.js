import { format } from 'date-fns';

import { Card, CardContent, Typography } from '@mui/material';

function EventDetail({ oneEvent }){

    return(
        <Card>
            <CardContent>
                <Typography variant='body1' color='text.primary'>Category: </Typography>
                <Typography variant='body2' color='text.secondary'>{oneEvent.category.category_name} </Typography> 
                <Typography variant='body1' color='text.primary'>What happened?</Typography> 
                <Typography variant='body2' color='text.secondary'>{oneEvent.content} </Typography>
                <Typography variant='body1' color='text.primary'>Severity: </Typography>
                <Typography variant='body2' color='text.secondary'>{oneEvent.severity} </Typography>
                <Typography variant='body1' color='text.primary'>Occurred: </Typography>
                <Typography variant='body2' color='text.secondary'>{format(new Date(oneEvent.event_time), "eee MMM'-'d'-'y h':'mm bbb") }</Typography>    
            </CardContent>
        </Card>
    )
}

export default EventDetail;