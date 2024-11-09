// src/utils/mockData.ts
import { faker } from '@faker-js/faker';
import { DataPoint, MetricCardProps } from '../types';

export const generateTimeSeriesData = (
    days: number = 7,
    interval: 'hour' | 'day' = 'hour'
): DataPoint[] =>
{
    const points = interval === 'hour' ? days * 24 : days;
    const data: DataPoint[] = [];

    for (let i = 0; i < points; i++)
    {
        const timestamp = faker.date.recent({ days }).toISOString();
        data.push({
            timestamp,
            value: faker.number.float({ min: 100, max: 10000 }),
            category: faker.helpers.arrayElement(['Sales', 'Traffic', 'Conversions', 'Revenue']),
        });
    }

    return data.sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
};

export const generateMetricCards = (): MetricCardProps[] =>
{
    return [
        {
            title: 'Total Revenue',
            value: faker.number.float({ min: 10000, max: 100000 }),
            change: faker.number.float({ min: -15, max: 15}),
            trend: faker.helpers.arrayElement(['up', 'down', 'neutral'] as const),
        },
        {
            title: 'Active Users',
            value: faker.number.int({ min: 1000, max: 10000 }),
            change: faker.number.float({ min: -15, max: 15}),
            trend: faker.helpers.arrayElement(['up', 'down', 'neutral'] as const),
        },
        {
            title: 'Conversion Rate',
            value: faker.number.float({ min: 1, max: 5 }),
            change: faker.number.float({ min: -2, max: 2}),
            trend: faker.helpers.arrayElement(['up', 'down', 'neutral'] as const),
        },
        {
            title: 'Avg. Order Value',
            value: faker.number.float({ min: 50, max: 200 }),
            change: faker.number.float({ min: -10, max: 10}),
            trend: faker.helpers.arrayElement(['up', 'down', 'neutral'] as const),
        },
    ];
};

export const generateCategoryData = () =>
{
    return ['Sales', 'Traffic', 'Conversions', 'Revenue'].map(category => ({
        name: category,
        total: faker.number.float({ min: 10000, max: 100000 }),
        count: faker.number.int({ min: 100, max: 1000 }),
        average: faker.number.float({ min: 50, max: 500 }),
        trend: faker.helpers.arrayElement(['up', 'down', 'neutral'] as const),
    }));
}; 