function EventDetail({ oneEvent }){
    return(
        <div>
            {oneEvent.severity}
            {oneEvent.event_time}
            {oneEvent.content}
        </div>
    )
}

export default EventDetail;