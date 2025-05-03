'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    {
        name: 'Jan',
        bookings: 85,
    },
    {
        name: 'Feb',
        bookings: 95,
    },
    {
        name: 'Mar',
        bookings: 110,
    },
    {
        name: 'Apr',
        bookings: 105,
    },
    {
        name: 'May',
        bookings: 130,
    },
    {
        name: 'Jun',
        bookings: 150,
    },
    {
        name: 'Jul',
        bookings: 165,
    },
    {
        name: 'Aug',
        bookings: 155,
    },
    {
        name: 'Sep',
        bookings: 125,
    },
    {
        name: 'Oct',
        bookings: 110,
    },
    {
        name: 'Nov',
        bookings: 95,
    },
    {
        name: 'Dec',
        bookings: 90,
    },
];

export function BookingsChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    formatter={(value) => [`${value}`, 'Bookings']}
                    labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="bookings" fill="#007bff" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
