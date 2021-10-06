import { Bar } from 'react-chartjs-2'
import { format,  differenceInCalendarMonths } from 'date-fns'
import { useEffect, useState } from 'react'

const ChartDistribution = ({eventData, sortEventCategory}) => {
    const [chartData, setChartData] = useState([])
    
    useEffect(() => {
        let filteredEventData = eventData.filter((event) => {
            if (sortEventCategory === "All") {
                return true
            } else if (event.category.category_name.toLowerCase() === sortEventCategory.toLowerCase()) {
                return true
            } else {
                return false
            }
        })
        if (eventData.length >0){
            let severityCounts = {"1": 0, "2": 0, "3": 0, "4": 0, "5":0}
            filteredEventData.forEach(event=>{
                let stringSeverity = event.severity.toString()
                severityCounts[stringSeverity] += 1
            })
            let severityData = Object.values(severityCounts)

            setChartData({
                labels: ['1 :D', '2 :)', '3 :|', '4 :(', '5 >:'],
                datasets: [
                    {
                        label: 'Events',
                        data: severityData,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderWidth: 1
                    }
                ]
                })
        }
    }, [eventData, sortEventCategory])

    const options = {
        responsive: true,
        plugins: {
            title: {
                text: `Number of Events for Category: ${sortEventCategory} by Severity`, 
                display: true
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Degree of Severity",
                    fontFamily: "Quicksand"
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
        <div className="chart-distribution">
            <div style={{ height: "450px", width: "900px"}}>
                <Bar 
                data={chartData} 
                    options={options}
                />
            </div>
        </div>
   
    )
}

export default ChartDistribution;