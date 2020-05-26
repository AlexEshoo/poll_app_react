import React from 'react';
import {ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip} from 'recharts';

function PollChart(props) {
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
                props.data.map((choice, index) => {
                    const strokeColor = winners.includes(choice.text) ? "#00FF00" : null
                    return <Cell key={index} className={`poll-chart-bar-${index % 2}`} stroke={strokeColor}
                                 strokeWidth={5}/>
                })
            }
        </Bar>
    }
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={props.data} layout="vertical">
                <Tooltip formatter={(value, name, props) => [value, "Votes"]} cursor={false} isAnimationActive={true}/>
                <YAxis stroke="#eff1f3ff" type="category" dataKey="text"/>
                <XAxis stroke="#eff1f3ff" type="number" allowDecimals={false}/>
                {bar}
            </BarChart>
        </ResponsiveContainer>
    );
}

export default PollChart;