import React from 'react'
import { Button } from 'antd';
import { Input } from 'antd';
import { HomeOutlined, HistoryOutlined, MoreOutlined } from '@ant-design/icons';
import { MdDashboard, MdSearch } from "react-icons/md";
import { Link } from 'react-router-dom';

function Example() {
    return (
        <>
            <webview src="https://google.com" style={{ width: '100%', height: '100vh' }}></webview>
        </>
    )
}

export default Example