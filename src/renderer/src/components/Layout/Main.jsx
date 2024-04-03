/* eslint-disable no-unused-vars */
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import '../../assets/css/dashboard.min.css';

function Main() {
    return (
        <>
            <Sidebar />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                <Navbar />
                <div className="container-fluid py-4 px-5">
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default Main;
