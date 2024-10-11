import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SalesRoute from './SalesRoute';
import FinanceRoute from './FinanceRoute';
import Login from '../Pages/Login/Login';
import ProtectedRoute from './ProtectedRoute';
import DummyRoute from './DummyRoute';
import UserRoute from './UserRoute';
import SarcasmRoute from './SarcasmRoute';
import OperationRoute from './OperationRoute';
import InventoryRoute from './InventoryRoute';
import ExecutionRoute from './ExecutionRoute';
import CommunityRoute from './CommunityRoute';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <DummyRoute />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="sales/*" // This is a wildcard route
                    element={
                        <ProtectedRoute>
                            <SalesRoute />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="finance/*"
                    element={
                        <ProtectedRoute>
                            <FinanceRoute />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="user/*"
                    element={
                        <ProtectedRoute>
                            <UserRoute />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="sarcasm/*"
                    element={
                        <ProtectedRoute>
                            <SarcasmRoute />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="operation/*"
                    element={
                        <ProtectedRoute>
                            <OperationRoute />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="inventory/*"
                    element={
                        <ProtectedRoute>
                            <InventoryRoute />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="finaexecutionnce/*"
                    element={
                        <ProtectedRoute>
                            <ExecutionRoute />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="community/*"
                    element={
                        <ProtectedRoute>
                            <CommunityRoute />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
