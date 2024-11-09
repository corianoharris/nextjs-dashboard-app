// src/pages/api/dashboard-data.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { DataPoint, MetricCardProps } from '../../types';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ data: DataPoint[]; metrics: MetricCardProps[] }>
)
{
    // Mock data generation
    const data: DataPoint[] = Array.from({ length: 24 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        value: Math.floor(Math.random() * 1000),
        category: ['Sales', 'Traffic', 'Conversions'][Math.floor(Math.random() * 3)],
    }));

    const metrics: MetricCardProps[] = [
        {
            title: 'Total Sales',
            value: 54232,
            change: 12.5,
            trend: 'up',
        },
        {
            title: 'Visitors',
            value: 21234,
            change: -5.2,
            trend: 'down',
        },
        {
            title: 'Conversion Rate',
            value: 3.2,
            change: 0.8,
            trend: 'up',
        },
        {
            title: 'Average Order',
            value: 89,
            change: 0,
            trend: 'neutral',
        },
    ];

    res.status(200).json({ data, metrics });
}