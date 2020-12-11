import React from 'react';
import {Line} from 'react-chartjs-2';

export default function Analytics(props){
    const data = {
        labels: props.label1,
        datasets: [
          {
            label: '',
            data: props.label2,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          }
        ]
      };
      if(props.label1.length===0 && props.label2.length===0){
          return <h2>Please make sure the starting date is lesser than the ending date, and you are not putting any future time span</h2>;
      }
    return <Line options={{responsive:true}} data={data}/>;
    
}