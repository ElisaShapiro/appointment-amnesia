import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';


const customIcons = {
    1: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Great',
    },
    2: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Pretty Good',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'OK',
    },
    4: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Not great',
    },
    5: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Bad',
    },
  };
  
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };
  
function AddEventForm({ universalCategories, formData, setFormData, manageFormData, handleSubmit, setEventTimeValue, eventTimeValue}){

    
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
                        {universalCategories.map((eventCategory) => {
                            return(
                                <MenuItem key={eventCategory.id} name={eventCategory.category_name} value={eventCategory.category_name}>
                                    {eventCategory.category_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <div>
                <Typography component="legend">Severity</Typography>
                    <Rating
                        onChange={manageFormData}
                        name="severity"
                        defaultValue={3}
                        value={parseInt(formData.severity)}
                        IconContainerComponent={IconContainer}
                        highlightSelectedOnly
                    />
                </div>
                <div>
                <TextField
                    multiline
                    rows={5}
                    id="content"
                    label="What Happened?"
                    name="content"
                    value={formData.content}
                    onChange={manageFormData}    
                />
                </div>
                <div><br />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date and Time of Event"
                            value={eventTimeValue}
                            onChange={(newEventTimeValue) => {
                                setFormData({...formData, event_time: newEventTimeValue})
                                setEventTimeValue(newEventTimeValue);
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <Button type="submit">Add New Event</Button>
                </div>
            </form>
        </div>
    )
}
export default AddEventForm;