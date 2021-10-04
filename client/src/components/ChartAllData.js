import { Bar } from 'react-chartjs-2'
import { addDays, startOfDay, format, getMonth } from 'date-fns'
import { useEffect, useState } from 'react'


const ChartAllData = ({eventData}) => {
    const [chartData, setChartData] = useState([])
    const [chartLabels, setChartLabels] = useState([])


    useEffect(() => {
        if (eventData.length > 0) {
        let eventsPerMonthOnes = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov':0, 'Dec': 0}
        let eventsPerMonthTwos = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov':0, 'Dec': 0}
        let eventsPerMonthThrees = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov':0, 'Dec': 0}
        let eventsPerMonthFours = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov':0, 'Dec': 0}
        let eventsPerMonthFives = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov':0, 'Dec': 0}
        let labels = []

        eventData.
        sort((eventA, eventB) =>{
            if (eventA.event_time > eventB.event_time) {
                return 1 
            } else {
                return -1
            }
        }).
        forEach((item)=> {
            let month = format(new Date(item.event_time), 'MMM')
            // debugger
            if (item.severity === 1) {
                eventsPerMonthOnes[month] += 1     
            } else if (item.severity === 2) {
                eventsPerMonthTwos[month] += 1
            } else if (item.severity === 3) {
                eventsPerMonthTwos[month] += 1
            } else if (item.severity === 4) {
                eventsPerMonthTwos[month] += 1
            } else if (item.severity === 5) {
                eventsPerMonthTwos[month] += 1
            }
        })
        let dataForSeverityOneEvents = Object.values(eventsPerMonthOnes)
        let dataForSeverityTwoEvents = Object.values(eventsPerMonthTwos)
        let dataForSeverityThreeEvents = Object.values(eventsPerMonthThrees)
        let dataForSeverityFourEvents = Object.values(eventsPerMonthFours)
        let dataForSeverityFiveEvents = Object.values(eventsPerMonthFives)
        // debugger
        setChartData({
            labels: [
                // "Jan",
                // "Feb",
                // "Mar",
                // "Apr",
                // "May",
                // "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            datasets: [
                {
                    label: ':D Severity 1',
                    data: dataForSeverityOneEvents, 
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderWidth: 4
                },
                {
                    label: ':) Severity 2',
                    data: dataForSeverityTwoEvents, 
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderWidth: 4
                },
                {
                    label: ':| Severity 3',
                    data: dataForSeverityThreeEvents, 
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderWidth: 4
                },
                {
                    label: ':( Severity 4',
                    data: dataForSeverityFourEvents, 
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderWidth: 4
                },
                {
                    label: '>: Severity 5',
                    data: dataForSeverityFiveEvents, 
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderWidth: 4
                }
            ]
        })
        }
    }, [eventData])

    return(
        <div className="chart1">
            <div style={{height: "700px", width: "700px"}}>
                <Bar data={chartData} 
                    options={{
                        responsive: true,
                        plugins: {
                            title: {
                                text: 'Number of Events by Severity per Month', 
                                display: true
                            }
                        },
                        scales: {
                            y: [
                                {
                                    ticks: {
                                        autoskip: true,
                                        // maxTicksLimit: 10,
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: 0
                                    }
                                }
                            ],
                            x: [
                                {
                                    // gridLines: {
                                    //     display: false
                                    // }
                                    type: 'time',
                                    time: {
                                        unit: 'month',
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        </div>
   
    )
}

export default ChartAllData;