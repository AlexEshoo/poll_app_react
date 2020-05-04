import React from 'react';
import {ResponsiveContainer, BarChart, Bar, CartesianGrid, Cell, XAxis, YAxis, Tooltip} from 'recharts';

function PollChart(props) {
    const colors = ["#214391", "#621C91", "#17A630"];
    return (
        <ResponsiveContainer width="50%" height={500}>
            <BarChart width="100%" height="100%" data={props.data} layout="vertical">
                <Tooltip formatter={(value, name, props) => [value, "Votes"]} cursor={false} isAnimationActive={true}/>
                <YAxis type="category" dataKey="optionText"/>
                <XAxis type="number" allowDecimals={false}/>
                {/*<CartesianGrid/>*/}
                <Bar dataKey="voteCount" fill="#8884d8">
                    {
                        props.data.map((entry, index) => {
                            const color = colors[index % 3]
                            return <Cell fill={color}/>
                        })
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default PollChart;