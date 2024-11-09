// src/app/RootClientLayout.tsx
'use client' // This file is explicitly a client component

import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default function RootClientLayout({ children }: { children: React.ReactNode })
{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
