// src/redux/dashboardSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DataPoint, MetricCardProps } from '../types';

interface DashboardState
{
    data: DataPoint[];
    metrics: MetricCardProps[];
    isLoading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    data: [],
    metrics: [],
    isLoading: false,
    error: null,
};

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchData',
    async () =>
    {
        const response = await axios.get('/api/dashboard-data');
        return response.data;
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder
            .addCase(fetchDashboardData.pending, (state) =>
            {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) =>
            {
                state.isLoading = false;
                state.data = action.payload.data;
                state.metrics = action.payload.metrics;
            })
            .addCase(fetchDashboardData.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
});

export default dashboardSlice.reducer;
