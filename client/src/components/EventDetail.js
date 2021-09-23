function EventDetail({ oneEvent }){
    return(
        <div>
            <p>Category: {oneEvent.category.category_name}</p>
            <p>What happened? {oneEvent.content}</p>
            <p>Severity: {oneEvent.severity}</p>
            <p>Time: {oneEvent.event_time}</p>
            
            
        </div>
    )
}

export default EventDetail;