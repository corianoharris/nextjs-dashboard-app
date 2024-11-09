// src/types/index.ts
export interface DataPoint
{
    timestamp: string;
    value: number;
    category: string;
}

export interface MetricCardProps
{
    title: string;
    value: number;
    change: number;
    trend: 'up' | 'down' | 'neutral';
}

export interface ChartData
{
    name: string;
    value: number;
}

export interface RootState
{
    dashboard: {
        data: DataPoint[];
        metrics: MetricCardProps[];
        isLoading: boolean;
        error: string | null;
    };
}