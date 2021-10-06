import { Bar } from 'react-chartjs-2'
import { format,  differenceInCalendarMonths } from 'date-fns'
import { useEffect, useState } from 'react'


const ChartAllData = ({eventData}) => {
    const [chartData, setChartData] = useState([])
    const allMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
    let currentMonth=new Date().getMonth()
    let sixMonths = allMonths.slice(0, currentMonth + 1).slice(currentMonth - 5)
    
    useEffect(() => {
        if (eventData.length > 0) {
        let eventsPerMonthOnes = {}
        let eventsPerMonthTwos = {}
        let eventsPerMonthThrees = {}
        let eventsPerMonthFours = {}
        let eventsPerMonthFives = {}

        sixMonths.forEach((month)=>{
            eventsPerMonthOnes[month] = 0
            eventsPerMonthTwos[month] = 0
            eventsPerMonthThrees[month] = 0
            eventsPerMonthFours[month] = 0
            eventsPerMonthFives[month] = 0
        })

        eventData.sort((eventA, eventB) =>{
            if (eventA.event_time > eventB.event_time) {
                return 1 
            } else {
                return -1
            }
        }).forEach((item)=> {
            let eventDate = new Date(item.event_time)
            let today = new Date()
            let month = format(eventDate, 'MMM')

            if (differenceInCalendarMonths(eventDate, today) >= -6) {
                if (item.severity === 1) {
                    eventsPerMonthOnes[month] += 1     
                } else if (item.severity === 2) {
                    eventsPerMonthTwos[month] += 1
                } else if (item.severity === 3) {
                    eventsPerMonthThrees[month] += 1
                } else if (item.severity === 4) {
                    eventsPerMonthFours[month] += 1
                } else if (item.severity === 5) {
                    eventsPerMonthFives[month] += 1
                }
            }
        })

        let dataForSeverityOneEvents = Object.values(eventsPerMonthOnes)
        let dataForSeverityTwoEvents = Object.values(eventsPerMonthTwos)
        let dataForSeverityThreeEvents = Object.values(eventsPerMonthThrees)
        let dataForSeverityFourEvents = Object.values(eventsPerMonthFours)
        let dataForSeverityFiveEvents = Object.values(eventsPerMonthFives)

        setChartData({
            labels: sixMonths,
            datasets: [
                {
                    label: ':D Severity 1',
                    data: dataForSeverityOneEvents, 
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderWidth: 1
                },
                {
                    label: ':) Severity 2',
                    data: dataForSeverityTwoEvents, 
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderWidth: 1
                },
                {
                    label: ':| Severity 3',
                    data: dataForSeverityThreeEvents, 
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderWidth: 1
                },
                {
                    label: ':( Severity 4',
                    data: dataForSeverityFourEvents, 
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderWidth: 1
                },
                {
                    label: '>: Severity 5',
                    data: dataForSeverityFiveEvents, 
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderWidth: 1
                }
            ]
        })
        }
    }, [eventData])

    const options = {
        responsive: true,
        plugins: {
            title: {
                text: "Number of Events by Severity per Month", 
                display: true
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Last 6 Months",
                    fontFamily: 'Quicksand'
                }
            },
            y: {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                    stepSize: 1, 
                    autoSkip: false,
                },
                title: {
                    display: true,
                    text: "# of Events"
                }
            },
        }
    }
    return(
        <div className='chart-all-data'>
            <div style={{ height: '450px', width: '900px'}}>
                <Bar data={chartData} 
                    options={options}
                />
            </div>
        </div>
   
    )
}

export default ChartAllData;