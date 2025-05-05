'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function RevenueChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <XAxis dataKey="key" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}VND`}
                />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} labelFormatter={(label) => `Day: ${label}`} />
                <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#007bff"
                    strokeWidth={2}
                    dot={{ strokeWidth: 4, fill: '#007bff' }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
