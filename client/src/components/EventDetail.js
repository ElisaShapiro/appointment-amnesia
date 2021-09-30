import { format } from 'date-fns';

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material';

function EventDetail({ oneEvent }){

    return(
        <Card>
            <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Category: {oneEvent.category.category_name} <br />
                        What happened? {oneEvent.content} <br />
                        Severity: {oneEvent.severity} <br />
                        Occurred: {format(new Date(oneEvent.event_time), "eee MMM'-'d'-'y h':'mm bbb") }       
                    </Typography>
            </CardContent>
        </Card>
    )
}

export default EventDetail;