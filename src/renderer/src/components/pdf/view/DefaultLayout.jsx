/* eslint-disable no-unused-vars */
import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './view.css'


const DefaultLayout = ({ fileUrl }) => {
    return <Viewer fileUrl={fileUrl} />;
};

export default DefaultLayout;