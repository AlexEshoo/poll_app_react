import React from 'react';
import {ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip} from 'recharts';

function PollChart(props) {
    let winner = null;
    let sorted_scores = [];
    if (props.highlightWinner) {
        for (let category of props.data) {
            sorted_scores.push(category)
        }
        sorted_scores.sort((a, b) => b.voteCount - a.voteCount)
        winner = sorted_scores[0];
    }

    const colors = ["#214391", "#621C91", "#d49b00"];
    let bar = null;
    if (props.showResults) {
        bar = <Bar dataKey="voteCount">
            {
                props.data.map((entry, index) => {
                    const color = colors[index % 3]
                    const strokeColor = entry.optionText === winner["optionText"] ? "#00FF00" : null
                    return <Cell key={index} fill={color} stroke={strokeColor} strokeWidth={5}/>
                })
            }
        </Bar>
    }
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={props.data} layout="vertical">
                <Tooltip formatter={(value, name, props) => [value, "Votes"]} cursor={false} isAnimationActive={true}/>
                <YAxis type="category" dataKey="optionText"/>
                <XAxis type="number" allowDecimals={false}/>
                {bar}
            </BarChart>
        </ResponsiveContainer>
    );
}

export default PollChart;