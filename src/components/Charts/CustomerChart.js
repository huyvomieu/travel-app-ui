'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: '18-24', value: 15 },
    { name: '25-34', value: 30 },
    { name: '35-44', value: 25 },
    { name: '45-54', value: 18 },
    { name: '55+', value: 12 },
];

const COLORS = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6c757d'];

export function CustomerChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
        </ResponsiveContainer>
    );
}
