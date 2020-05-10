import React from 'react';
import {ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip} from 'recharts';

function PollChart(props) {
    const colors = ["#214391", "#621C91", "#d49b00"];

    let winners = [];
    if (props.highlightWinner) {
        const sorted_scores = [].concat(props.data).sort((a, b) => b.voteCount - a.voteCount)
        let index = 0;
        while (sorted_scores[index].voteCount === sorted_scores[0].voteCount) {
            winners.push(sorted_scores[index].choiceText)
            index++
        }
    }

    console.log(winners)
    let bar;
    if (props.showResults) {
        bar = <Bar dataKey="voteCount">
            {
                props.data.map((entry, index) => {
                    const color = colors[index % 3]
                    const strokeColor = winners.includes(entry.choiceText) ? "#00FF00" : null
                    return <Cell key={index} fill={color} stroke={strokeColor} strokeWidth={5}/>
                })
            }
        </Bar>
    }
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={props.data} layout="vertical">
                <Tooltip formatter={(value, name, props) => [value, "Votes"]} cursor={false} isAnimationActive={true}/>
                <YAxis type="category" dataKey="choiceText"/>
                <XAxis type="number" allowDecimals={false}/>
                {bar}
            </BarChart>
        </ResponsiveContainer>
    );
}

export default PollChart;