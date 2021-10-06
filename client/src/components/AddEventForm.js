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
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';

//ICONS for Severity Selection
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
  
function AddEventForm({ universalCategories, formData, setFormData, manageFormData, handleSubmit, eventTimeValue, setEventTimeValue, isEdit}){

    return(
        <Container>  
            <form onSubmit={handleSubmit}>
                <Typography sx={{paddingBottom: '10px'}}><AddBoxSharpIcon />Log Event</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} sx={{minWidth: 200}}/>}
                        label="Date and Time of Event"
                        value={eventTimeValue}
                        onChange={(newEventTimeValue) => {
                            setFormData({...formData, event_time: newEventTimeValue})
                            setEventTimeValue(newEventTimeValue);
                        }}
                    />
                </LocalizationProvider>
                <FormControl style={{minWidth: 200}} margin='dense'>
                    <InputLabel id='category-label'>Category</InputLabel>
                    <Select
                        labelId='category-label'
                        id='category'
                        label="Category"
                        name='category'
                        value={formData.category}
                        onChange={manageFormData}
                        sx={{background: '#9dbbae'}}
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
                <Typography component='legend'>Severity (1-5)</Typography>
                    <Rating
                        onChange={manageFormData}
                        name='severity'
                        defaultValue={3}
                        value={parseInt(formData.severity)}
                        IconContainerComponent={IconContainer}
                        highlightSelectedOnly
                    />
                <TextField
                    multiline
                    rows={6}
                    id='content'
                    label="What Happened?"
                    name='content'
                    value={formData.content}
                    onChange={manageFormData} 
                    sx={{background: '#9dbbae', minWidth: 200}} 
                    margin='dense' 
                /><br />
                <Button style={{minWidth: 200}} type='submit'><AddSharpIcon />{isEdit ? "Edit Event" : "New Event"}</Button>
            </form>
        </Container>
    )
}
export default AddEventForm;