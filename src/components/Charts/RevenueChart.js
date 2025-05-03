'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    {
        name: 'Jan',
        revenue: 18000,
    },
    {
        name: 'Feb',
        revenue: 20500,
    },
    {
        name: 'Mar',
        revenue: 25000,
    },
    {
        name: 'Apr',
        revenue: 22000,
    },
    {
        name: 'May',
        revenue: 29000,
    },
    {
        name: 'Jun',
        revenue: 35000,
    },
    {
        name: 'Jul',
        revenue: 39000,
    },
    {
        name: 'Aug',
        revenue: 36500,
    },
    {
        name: 'Sep',
        revenue: 28000,
    },
    {
        name: 'Oct',
        revenue: 24500,
    },
    {
        name: 'Nov',
        revenue: 21000,
    },
    {
        name: 'Dec',
        revenue: 19000,
    },
];

export function RevenueChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelFormatter={(label) => `Month: ${label}`}
                />
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
