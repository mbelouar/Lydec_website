import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { getStats } from '../Controllers/getData';

Chart.register(CategoryScale);

const Stats = () => {
    const [stats,setStats]=useState({total:'',recent:[{mois:'',conso:''}]});
    const [chartData,setChartData]=useState({labels:[], datasets:[]});
      
    useEffect(()=>{
        getStats(setStats);
    },[])
    useEffect(()=>{
        setChartData({
            labels:stats.recent.map((data) => data.mois).reverse(),
            datasets: [
              {
                label: "Consommations: ",
                data: stats.recent.map((data) => data.conso).reverse(),
                backgroundColor: [
                  "rgb(41, 41, 41)",
                ],
                borderColor: "black",
                borderWidth: 0
              }
            ]
          })
    },[stats])

  return (
    <div className='stats'>
        <div className='diagramme'>
                <h2 style={{ textAlign: "center" }}>6 Dernier Mois</h2>
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                            display: true,
                            title:'6 Dernier Mois'
                            },
                            legend: {
                            display: false
                            }
                        }
                    }}
                />
        </div>
        <div className='total'>
            <h1>Total Non Payee : <span>{parseFloat(stats.total).toFixed(2)} DH</span></h1>
        </div>
    </div>
  )
}

export default Stats