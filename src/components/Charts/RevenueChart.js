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
                    tickFormatter={(value) => {
                        if (value >= 1000000) return `${(value / 1000000).toLocaleString('vi-VN')}M`;
                        if (value >= 1000) return `${(value / 1000).toLocaleString('vi-VN')}K`;
                        return `${value}VND`;
                    }}
                    width={80}
                />
                <Tooltip formatter={(value) => [`${value.toLocaleString('vi-VN')} VND`, 'Doanh thu']} labelFormatter={(label) => `Day: ${label}`} />
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
