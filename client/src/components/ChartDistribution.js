// import { Bar } from 'react-chartjs-2'
// import { format,  differenceInCalendarMonths } from 'date-fns'
// import { useEffect, useState } from 'react'

// const ChartDistribution = ({eventData}) => {
//     const [chartData, setChartData] = useState([])

//     useEffect(() => {
//         if (eventData.length >0){

//         }
//     })
//     setChartData({
//         labels: ['1', '2', '3', '4', '5'],
//         datasets: [
//             {
//                 label: ':D Severity 1',
//                 data: [], 
//                 backgroundColor: [
//                     'rgba(75, 192, 192, 0.2)'
//                 ],
//                 borderWidth: 1
//             }
//         ]
//         }, [eventData])

//     const options = {
//         responsive: true,
//         plugins: {
//             title: {
//                 text: 'Number of Events by Severity per Category', 
//                 display: true
//             }
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: "Degree of Severity",
//                     fontFamily: "Quicksand"
//                 }
//             },
//             y: {
//                 type: 'linear',
//                 ticks: {
//                     beginAtZero: true,
//                     stepSize: 1, 
//                     autoSkip: false,
//                 },
//                 title: {
//                     display: true,
//                     text: "# of Events"
//                 }
//             },
//         }
//     }

//     return(
//         <div className="chart2">
//             <div style={{ height: "375px", width: "650px"}}>
//                 <Bar 
//                 // data={chartData} 
//                 //     options={options}
//                 />
//             </div>
//         </div>
   
//     )
// }

// export default ChartDistribution;