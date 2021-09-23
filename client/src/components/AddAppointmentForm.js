import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

function AddAppointmentForm(){
    const history = useHistory()
    // const [formData, setFormData] = useState({
    //     appointment_time: 4.days.ago, user_id: 1, provider_id: 2, category_id: 2)
    // })

    return(
        <div> i'm form
            {/* <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Appointment Date and Time</label>
                    <input onChange={manageFormData} type="text" name="content" value={formData.content} placeholder="content" />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select onChange={manageFormData} type="select" name="category" value={formData.category} placeholder="category">
                        {eventCategories.map((eventCategory) => {
                            return(
                                <option key={eventCategory.id} name={eventCategory.category_name}>{eventCategory.category_name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="provider">Provider</label>
                    <select onChange={manageFormData} type="select" name="category" value={formData.category} placeholder="category">
                        {eventCategories.map((eventCategory) => {
                            return(
                                <option key={eventCategory.id} name={eventCategory.category_name}>{eventCategory.category_name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <button type="submit">Submit new appointment</button>
                </div>
            </form> */}
        </div>
    )
}

export default AddAppointmentForm;