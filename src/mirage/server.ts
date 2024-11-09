// src/mirage/server.ts
import { createServer, Model, Factory, Response } from 'miragejs';
import { faker } from '@faker-js/faker';
import { DataPoint, MetricCardProps } from '../types';

export function makeServer({ environment = 'development' } = {})
{
    const server = createServer({
        environment,

        models: {
            dataPoint: Model.extend<Partial<DataPoint>>({}),
            metric: Model.extend<Partial<MetricCardProps>>({}),
        },

        factories: {
            dataPoint: Factory.extend<Partial<DataPoint>>({
                timestamp()
                {
                    return faker.date.recent({ days: 1 }).toISOString();
                },
                value()
                {
                    return faker.number.float({ min: 100, max: 10000 });
                },
                category()
                {
                    return faker.helpers.arrayElement(['Sales', 'Traffic', 'Conversions', 'Revenue']);
                },
            }),

            metric: Factory.extend<Partial<MetricCardProps>>({
                title(i: number)
                {
                    const titles = ['Total Revenue', 'Active Users', 'Conversion Rate', 'Avg. Order Value'];
                    return titles[i % titles.length];
                },
                value()
                {
                    return faker.number.float({ min: 1000, max: 100000 });
                },
                change()
                {
                    return faker.number.float({ min: -15, max: 15 });
                },
                trend()
                {
                    return faker.helpers.arrayElement(['up', 'down', 'neutral'] as const);
                },
            }),
        },

        seeds(server)
        {
            server.createList('dataPoint', 48); // 2 days of hourly data
            server.createList('metric', 4);
        },

        routes()
        {
            this.namespace = 'api';

            // Add latency to simulate real API
            this.timing = 750;

            this.get('/dashboard-data', (schema) =>
            {
                const data = schema.all('dataPoint').models.map((model: { attrs: unknown; }) => model.attrs);
                const metrics = schema.all('metric').models.map((model: { attrs: unknown; }) => model.attrs);

                return new Response(200, {}, { data, metrics });
            });

            // Historical data endpoint
            this.get('/historical-data', (schema: unknown, request: { queryParams: { days?: 7 | undefined; }; }) =>
            {
                const { days = 7 } = request.queryParams;
                const dataPoints = Array.from({ length: days * 24 }, () => ({
                    timestamp: faker.date.recent({ days: Number(days) }).toISOString(),
                    value: faker.number.float({ min: 100, max: 10000 }),
                    category: faker.helpers.arrayElement(['Sales', 'Traffic', 'Conversions', 'Revenue']),
                }));

                return new Response(200, {}, { data: dataPoints });
            });

            // Categories endpoint
            this.get('/categories', () =>
            {
                return new Response(200, {}, {
                    categories: ['Sales', 'Traffic', 'Conversions', 'Revenue'].map(name => ({
                        name,
                        count: faker.number.int({ min: 100, max: 1000 }),
                        trend: faker.helpers.arrayElement(['up', 'down', 'neutral']),
                    })),
                });
            });

            // Add error simulation endpoint
            this.get('/error-test', () =>
            {
                if (Math.random() > 0.5)
                {
                    return new Response(500, {}, { error: 'Random server error' });
                }
                return new Response(200, {}, { status: 'ok' });
            });
        },
    });

    return server;
}