import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Components/CommonComponent/Layout/Layout';
import DummyPage from '../Pages/Dummy/DummyPage';
import PageNotFound from '../Components/CommonComponent/PageNotFound/PageNotFound';
const UserRoute = () => {
    return (
        <Routes>
            {/* Routes with Layout */}
            <Route path="/" element={<Layout />}>
                {/* <Route index element={<Navigate to="dashboard" replace={true} />} /> // It redirects index to desired routing like dashboard or  landing page of modules . Use only if index is not in use. */}
                <Route path="dashboard" element={<DummyPage name={"User Dashboard"} />} />

                {/* Catch-All Route for Nested Paths */}
                <Route path="*" element={<PageNotFound />} />
            </Route>
            {/* Global Catch-All Route */}
            <Route path="*" element={<PageNotFound />} />
            <Route path="dummy" element={<DummyPage name={"fake Page"} />} />
        </Routes>
    )
}

export default UserRoute