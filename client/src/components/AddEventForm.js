import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function AddEventForm({ eventCategories, formData, setFormData, manageFormData, handleSubmit, setEventTimeValue, eventTimeValue}){
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category">Category</label>
                    <select onChange={manageFormData} type="select" name="category" 
                        value={formData.category.category_name} placeholder="category">
                        {eventCategories.map((eventCategory) => {
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
                    <input onChange={manageFormData} type="number" name="severity" 
                        value={formData.severity} placeholder="#" min="1" max="5"/>
                </div>
                <div>
                    <label htmlFor="content">What Happened?</label>
                    <textarea onChange={manageFormData} name="content" rows="5" cols="50" 
                        style={{ width: "400px", height: "100px" }}
                        value={formData.content} placeholder="Describe Event Here..." />
                </div>
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