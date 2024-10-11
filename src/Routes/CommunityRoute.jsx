import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Components/CommonComponent/Layout/Layout';
import DummyPage from '../Pages/Dummy/DummyPage';

const CommunityRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<DummyPage name={"Fake Dashboard"} />} />
            </Route>
            <Route path="dummy" element={<DummyPage name={"fake Page"} />} />
        </Routes>)
}

export default CommunityRoute