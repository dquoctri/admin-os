import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppShell } from './components/layout/AppShell';
import { OverviewPage } from './pages/OverviewPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { OrdersPage } from './pages/OrdersPage';
import { UsersPage } from './pages/UsersPage';
import { ProductsPage } from './pages/ProductsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LogsPage } from './pages/LogsPage';
import { PermissionsPage } from './pages/PermissionsPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Navigate to="/overview" replace />} />
            <Route path="overview"    element={<OverviewPage />} />
            <Route path="analytics"   element={<AnalyticsPage />} />
            <Route path="orders"      element={<OrdersPage />} />
            <Route path="users"       element={<UsersPage />} />
            <Route path="products"    element={<ProductsPage />} />
            <Route path="settings"    element={<SettingsPage />} />
            <Route path="logs"        element={<LogsPage />} />
            <Route path="permissions" element={<PermissionsPage />} />
            <Route path="categories"  element={<PlaceholderPage />} />
            <Route path="*"           element={<Navigate to="/overview" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
