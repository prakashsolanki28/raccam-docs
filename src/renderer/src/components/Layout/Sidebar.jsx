// eslint-disable-next-line no-unused-vars
import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaFilePdf } from "react-icons/fa6";
import { BsBrowserChrome } from "react-icons/bs";



function Sidebar() {
    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 bg-slate-900 fixed-start hidden-scroll" id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"></i>
                <Link to="/" className="navbar-brand d-flex align-items-center m-0">
                    <span className="font-weight-bold text-lg">PHQ Docs</span>
                </Link>
            </div>
            <div className="collapse navbar-collapse px-4 w-auto" id="sidenav-collapse-main" style={{ height: '100vh' }}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link active">
                            <div className="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">
                                <MdDashboard />
                            </div>
                            <span className="nav-link-text ms-1">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard/pdf" className="nav-link">
                            <div className="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">
                                <FaFilePdf />
                            </div>
                            <span className="nav-link-text ms-1">PDF</span>
                        </Link>
                    </li>
                    <li className="nav-item border-start my-0 pt-2 w-75">
                        <Link className="nav-link position-relative ms-0 ps-2 py-2" to="/dashboard/pdf/merge">
                            <span className="nav-link-text ms-1">Merge PDF</span>
                        </Link>
                    </li>
                    <li className="nav-item border-start my-0 pt-2 w-75">
                        <Link className="nav-link position-relative ms-0 ps-2 py-2" to="/dashboard/pdf/split">
                            <span className="nav-link-text ms-1">Split PDF</span>
                        </Link>
                    </li>
                    <li className="nav-item border-start my-0 pt-2 w-75">
                        <Link className="nav-link position-relative ms-0 ps-2 py-2" to="/dashboard/pdf/merge">
                            <span className="nav-link-text ms-1">Rotate PDF</span>
                        </Link>
                    </li>
                    <li className="nav-item border-start my-0 pt-2 w-75">
                        <Link className="nav-link position-relative ms-0 ps-2 py-2" to="/dashboard/pdf/image_to_pdf">
                            <span className="nav-link-text ms-1">Image To PDF</span>
                        </Link>
                    </li>
                    <li className="nav-item border-start my-0 pt-2 w-75">
                        <Link className="nav-link position-relative ms-0 ps-2 py-2" to="/dashboard/pdf/compress">
                            <span className="nav-link-text ms-1">Compress PDF</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/web" className="nav-link">
                            <div className="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">
                                <BsBrowserChrome />
                            </div>
                            <span className="nav-link-text ms-1">Browser</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard/pdf" className="nav-link">
                            <div className="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">
                                <FaFilePdf />
                            </div>
                            <span className="nav-link-text ms-1">Image</span>
                        </Link>
                    </li>
                    <li className="nav-item border-start my-0 pt-2 w-75">
                        <Link className="nav-link position-relative ms-0 ps-2 py-2" to="/dashboard/jpg/to_png">
                            <span className="nav-link-text ms-1">Jpg to Png</span>
                        </Link>
                    </li>
                    <li className="nav-item border-start my-0 pt-2 w-75">
                        <Link className="nav-link position-relative ms-0 ps-2 py-2" to="/dashboard/png/to_jpg">
                            <span className="nav-link-text ms-1">Png to Png</span>
                        </Link>
                    </li>
                    <li className="nav-item border-start my-0 pt-2 w-75">
                        <Link className="nav-link position-relative ms-0 ps-2 py-2" to="/dashboard/image/compress">
                            <span className="nav-link-text ms-1">Compress Image</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard/video" className="nav-link">
                            <div className="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">
                                <FaFilePdf />
                            </div>
                            <span className="nav-link-text ms-1">Video</span>
                        </Link>
                    </li>
                    <li className="nav-item border-start my-0 pt-2 w-75">
                        <Link className="nav-link position-relative ms-0 ps-2 py-2" to="/dashboard/video/crop">
                            <span className="nav-link-text ms-1">Crop Video</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
