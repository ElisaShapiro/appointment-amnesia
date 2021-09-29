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
  
function AddEventForm({ universalCategories, eventCategories, formData, setFormData, manageFormData, handleSubmit, setEventTimeValue, eventTimeValue}){

    
    return(
        <div>
              
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category">Category</label>
                    <select onChange={manageFormData} type="select" name="category" 
                        value={formData.category.category_name} placeholder="category">
                        {universalCategories.map((eventCategory) => {
                            return(
                                <option key={eventCategory.id} name={eventCategory.category_name}>
                                    {eventCategory.category_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="severity"> Severity</label>
                    {/* <input onChange={manageFormData} type="number" name="severity" 
                        value={formData.severity} placeholder="#" min="1" max="5"/> */}
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
                    <label htmlFor="content">What Happened?</label>
                    <textarea onChange={manageFormData} name="content" rows="5" cols="50" 
                        style={{ width: "400px", height: "100px" }}
                        value={formData.content} placeholder="Describe Event Here..." />
                </div><br />
                <div>
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
                    <button type="submit">Add New Event</button>
                </div>
            </form>
        </div>
    )
}
export default AddEventForm;