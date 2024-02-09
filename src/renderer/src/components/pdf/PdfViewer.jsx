/* eslint-disable no-unused-vars */
import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '../../assets/css/hide_scroll.css'

function PdfViewer({ file, type }) {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <>
            {
                type == 'small-card' && (
                    <>
                        <div style={{ height: 250, width: 180 }}>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                <Viewer fileUrl={URL.createObjectURL(file)}
                                    defaultScale={0.3}
                                    initialPage={0}
                                    initialRotation={0}
                                />
                            </Worker>
                        </div>
                        <span style={{ fontSize: 10, textWrap: 'pretty' }}>{
                            file.name.length > 20 ? file.name.substring(0, 15) + '...' : file.name
                        }</span>
                    </>
                )
            }
        </>
    )
}

export default PdfViewer