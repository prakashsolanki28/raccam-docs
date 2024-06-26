/* eslint-disable no-unused-vars */

import React, { useEffect, useRef } from 'react'
import DropZone from '../../components/dropzone/DropZone'
import { Button, Flex, notification, Divider } from 'antd';
import { PlusOutlined, DownloadOutlined, ReloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { RxCross2 } from "react-icons/rx";
import { LuArrowUpDown } from "react-icons/lu";
import { PDFDocument } from 'pdf-lib';

function ImageToPDF() {

    const [files, setFiles] = React.useState([])
    const [pdfFile, setPdfFile] = React.useState(null);
    const selectFiles = (files) => {
        setFiles(files)
    }

    const dragItem = useRef();

    const handleDragStart = (e, index) => {
        dragItem.current = index;
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        const draggedOverItem = index;

        if (dragItem.current !== draggedOverItem) {
            const items = Array.from(files);
            const [draggedItem] = items.splice(dragItem.current, 1);
            items.splice(draggedOverItem, 0, draggedItem);

            setFiles(items);
            dragItem.current = draggedOverItem;
        }
        if (pdfFile) {
            convertPngToPDF();
        }
    };

    const fileInputRef = useRef(null);

    const convertPngToPDF = async () => {
        const pdfDoc = await PDFDocument.create();
        
        for (const file of files) {
            const img = await pdfDoc.embedPng(await file.arrayBuffer());
            const page = pdfDoc.addPage([img.width, img.height]);
            page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setPdfFile(blob);
    };

    useEffect(() => {
        if (pdfFile) {
            convertPngToPDF();
        }
    }, [files])


  return (
    <>
            {
                files.length > 0 ? (
                    <div className='row'>
                        <div className='col-12 col-md-8'>
                            {
                                pdfFile == null ? (
                                    <div className='text-center'>
                                        {
                                            files.map((file, index) => (
                                                <div key={index}
                                                className='d-inline-block bg-white m-2 pdf_hide_scroll_card position-relative w-25'
                                                draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={(e) => handleDragOver(e, index)} style={{ cursor: 'move' }}>
                                                    <img src={URL.createObjectURL(file)} alt={file.name} className='img-fluid' />
                                                </div>
                                            ))    
                                        }
                                    </div>
                                ):(
                                    <div className='text-center'>
                                        <embed src={URL.createObjectURL(pdfFile)} type="application/pdf" width="100%" height="850px" />
                                    </div>
                                )
                            }
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='bg-white rounded shadow' style={{ position: 'sticky', top: 90 }}>
                                <div className='card'>
                                    <div className='card-header d-flex justify-content-between align-items-center'>
                                        <span className='h5'>Merge PDFs</span>
                                        <Flex gap="small" align="flex-end" wrap="wrap" >
                                            <Button type="primary" icon={<PlusOutlined />} onClick={() => fileInputRef.current.click()} />
                                            <Button type="primary" icon={<ReloadOutlined />} onClick={() => setFiles([])} />
                                        </Flex>
                                    </div>
                                    <div className='card-body'>
                                        {
                                            files.map((file, index) => {
                                                return (
                                                    <div key={index} className='p-2 border my-2 rounded' draggable
                                                        onDragStart={(e) => handleDragStart(e, index)}
                                                        onDragOver={(e) => handleDragOver(e, index)}>
                                                        <div className='d-flex align-items-center justify-content-between' key={index}>
                                                            <LuArrowUpDown size={20} className='me-3 ms-2 text-primary' style={{ cursor: 'move' }} />
                                                            <span style={{ fontSize: 12, textWrap: 'pretty' }}>{file.name}</span>
                                                            <RxCross2 size={25} color='red' onClick={() => {
                                                                const newFiles = files.filter((f, i) => i !== index)
                                                                setFiles(newFiles)
                                                            }}
                                                                className='mx-3' style={{ cursor: 'pointer' }} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <Divider orientation="left" plain>
                                            Png Image To Pdf
                                        </Divider>
                                        <div className='text-center'>
                                            <button className='btn btn-primary py-3 w-100' onClick={convertPngToPDF} >Convert To Pdf</button>
                                            <p>
                                                <small>Click on the button to convert images to pdf.</small>
                                            </p>
                                        </div>
                                        {
                                            pdfFile && (
                                                <>
                                                    <Divider orientation="left" plain>
                                                        Download
                                                    </Divider>
                                                    <div className='d-flex justify-content-center mt-3'>
                                                        <div className='d-flex w-100'>
                                                            <a href={URL.createObjectURL(pdfFile)} download={`${new Date().getTime()}_merged.pdf`} className='btn btn-primary px-5 w-100'>
                                                                <DownloadOutlined style={{ fontSize: '25px' }} /> <span className='mx-2' style={{ fontSize: '18px' }}>Download</span>
                                                            </a>
                                                            <button className='btn btn-primary mx-2' onClick={() => setPdfFile(null)}>
                                                                <ArrowLeftOutlined style={{ fontSize: '20px' }} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ):( 
                    <DropZone accept="png" onFilesSelected={(files) => selectFiles(files)} title="Png Image to Pdf" subtitle="Drop your png images here or click to browse files." />
                )
            }

             {/* Add More Files */}
             <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                multiple
                accept="image/png"
                onChange={(e) => {selectFiles([...files, ...e.target.files]);}}
            />
    </>
  )
}

export default ImageToPDF

// import React, { useState } from 'react';
// import { PDFDocument } from 'pdf-lib';

// function ImageToPDF() {
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [convertedFile, selectConvertedFile] = useState(null);

//     const handleFileSelect = (e) => {
//         setSelectedFiles([...e.target.files]);
//     };

//     const convertPngToPDF = async () => {
//         const pdfDoc = await PDFDocument.create();
        
//         for (const file of selectedFiles) {
//             const img = await pdfDoc.embedPng(await file.arrayBuffer());
//             const page = pdfDoc.addPage([img.width, img.height]);
//             page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
//         }

//         const pdfBytes = await pdfDoc.save();
//         const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'converted-images.pdf';
//         link.click();
//     };

//     return (
//         <div>
//             <label>Select Png Images</label>
//             <input type="file" className="form-control" multiple onChange={handleFileSelect} />
//             {
//                 selectedFiles && selectedFiles.length > 0 ? (
//                     <button onClick={convertPngToPDF} className="btn btn-primary mt-3">Download Pdf</button>
//                 ):(
//                     ""
//                 )
//             }
//         </div>
//     );
// }

// export default ImageToPDF;
