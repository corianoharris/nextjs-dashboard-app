// MetricCard Component

import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';
import { MetricCardProps as MetricCardType, DataPoint } from '../types';

const MetricCard = ({ title, value, change, trend }: MetricCardType) =>
{
    const getTrendIcon = () =>
    {
        switch (trend)
        {
            case 'up':
                return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
            case 'down':
                return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
            default:
                return <MinusIcon className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="stat-card">
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <div className="mt-2 flex items-baseline justify-between">
                <div className="text-3xl font-semibold">{value.toLocaleString()}</div>
                <div className="flex items-center space-x-1">
                    {getTrendIcon()}
                    <span className={`text-sm ${trend === 'up' ? 'text-green-500' :
                            trend === 'down' ? 'text-red-500' :
                                'text-gray-500'
                        }`}>
                        {Math.abs(change)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

// Chart Component
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const Chart = ({ data }: { data: DataPoint[] }) =>
{
    const formattedData = data.map(point => ({
        ...point,
        formattedTime: format(new Date(point.timestamp), 'HH:mm'),
    }));

    return (
        <div className="card h-96">
            <h2>Trends Over Time</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="formattedTime" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3B82F6"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// FilterBar Component
const FilterBar = () =>
{
    return (
        <div className="flex space-x-4 mb-6">
            <input
                type="text"
                placeholder="Search..."
                className="input"
            />
            <select className="input bg-white">
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
            </select>
            <button className="btn-primary">Apply</button>
        </div>
    );
};

export { MetricCard, Chart, FilterBar };