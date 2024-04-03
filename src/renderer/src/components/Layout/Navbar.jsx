/* eslint-disable no-unused-vars */

import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoMdSettings } from 'react-icons/io';
import PoliceLogo from '../../assets/images/logo.png';

function Navbar() {
    return (
        <nav className="navbar navbar-main navbar-expand-lg px-5 shadow-none border-bottom bg-white" style={{ position: 'sticky', top: 0, zIndex: 999 }}>
            <div className="container-fluid py-1 px-2">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-1 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="#">Dashboard</a></li>
                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
                    </ol>
                    <h6 className="font-weight-bold mb-0">Dashboard</h6>
                </nav>
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        <div className="input-group">
                            <span className="input-group-text text-body bg-white border-end-0">
                                <CiSearch size={18} />
                            </span>
                            <input type="text" className="form-control ps-0" placeholder="Search" />
                        </div>
                    </div>
                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                            <a href="#" className="nav-link text-body p-0" id="iconNavbarSidenav">
                                <div className="sidenav-toggler-inner">
                                    {[1, 2, 3].map((line) => (
                                        <i key={line} className="sidenav-toggler-line"></i>
                                    ))}
                                </div>
                            </a>
                        </li>
                        <li className="nav-item px-3 d-flex align-items-center">
                            <a href="#" className="nav-link text-body p-0">
                                <IoMdSettings size={20} />
                            </a>
                        </li>
                        <li className="nav-item ps-2 d-flex align-items-center">
                            <a href="#" className="nav-link text-body p-0">
                                <img src={PoliceLogo} className="avatar avatar-sm" alt="avatar" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
