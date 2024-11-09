
'use client'

import { JSX, Key, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { fetchDashboardData } from '../redux/dashboardSlice';
import { MetricCard, Chart, FilterBar } from '../components';
import { MetricCardProps } from '@/types';

export default function Dashboard()
{
    const dispatch = useDispatch<AppDispatch>();
    const { data, metrics, isLoading, error } = useSelector(
        (state: RootState) => state.dashboard
    );

    useEffect(() =>
    {
        dispatch(fetchDashboardData());
        const interval = setInterval(() =>
        {
            dispatch(fetchDashboardData());
        }, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, [dispatch]);

    if (isLoading && !data.length)
    {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error)
    {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8 w-full">
                <h1>Dashboard</h1>
                <button className="btn-primary">Export Data</button>
            </div>

            <FilterBar />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {metrics.map((metric: JSX.IntrinsicAttributes & MetricCardProps, index: Key | null | undefined) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>

            <Chart data={data} />
        </div>
    );
}