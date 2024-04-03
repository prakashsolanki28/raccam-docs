/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { Spin } from 'antd';


function Example() {
    const { url } = useParams();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <>
            <div className='position-fixed mt-5 pb-0 d-flex align-items-center shadow border-top border-end border-bottom border-white'>
                <Link to='/'>
                    <button className='btn btn-danger rounded-0 mb-0'><MdDashboard /></button>
                </Link>
                <Link to='/web'>
                    <button className='btn btn-dark rounded-0 mb-0'><IoMdArrowBack /></button>
                </Link>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><Spin size="large" /></div>
            ) : null}
            <webview src={`https://${url}`} style={{ width: '100%', height: '100vh' }} />
        </>
    )
}

export default Example