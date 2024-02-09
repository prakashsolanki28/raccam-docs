/* eslint-disable no-unused-vars */
import React from 'react';
import { PrinterOutlined } from '@ant-design/icons';
const PDFPrinter = ({ file }) => {
    const print = () => {
        const pdfFrame = document.createElement('iframe');
        pdfFrame.style.visibility = 'hidden';
        pdfFrame.src = URL.createObjectURL(file);
        document.body.appendChild(pdfFrame);
        pdfFrame.contentWindow.focus();
        pdfFrame.contentWindow.print();
    };
    return (
        <PrinterOutlined onClick={print} />
    );
};

export default PDFPrinter;
