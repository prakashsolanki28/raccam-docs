/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import DropZone from '../../components/dropzone/DropZone'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { RxCross2 } from "react-icons/rx";
import { LuArrowUpDown } from "react-icons/lu";
import { Button, Flex, notification, Divider } from 'antd';
import { PlusOutlined, DownloadOutlined, ReloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import MergePDF from '../../utils/pdf/merge';
import PdfViewer from '../../components/pdf/PdfViewer';

function Merge() {

    // State
    const [files, setFiles] = React.useState([])
    const [mergedPdfFile, setMergedPdfFile] = React.useState(null);
    // Drag and Drop
    const dragItem = useRef();
    const selectFiles = (files) => {
        setFiles(files)
    }

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

        if (mergedPdfFile) {
            handleMergePdf();
        }

    };

    // Add More Files 
    const fileInputRef = useRef(null);

    // Merge file 
    const handleMergePdf = async () => {
        if (files.length < 2) {
            notification.warning({
                message: 'Merge PDFs',
                description: 'You need at least two files to merge.',
            });
            return;
        }


        MergePDF(files).then((mergedPdfBlob) => {
            setMergedPdfFile(mergedPdfBlob);
        }).catch((error) => {
            console.error(error);
            notification.error({
                message: 'Merge PDFs',
                description: 'An error occurred while merging the PDFs.',
            });
        });

        console.log(mergedPdfFile)
    }

    return (
        <>
            {
                (files && files.length) > 0 ? (
                    <div className='row'>
                        <div className='col-12 col-md-8'>
                            {
                                mergedPdfFile == null ? (
                                    <div className="text-center">
                                        {files.map((file, index) => (
                                            <div
                                                key={index}
                                                className='d-inline-block bg-white m-2 pdf_hide_scroll_card position-relative'
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, index)}
                                                onDragOver={(e) => handleDragOver(e, index)}
                                                style={{ cursor: 'move' }}
                                            >
                                                <PdfViewer file={file} type='small-card' className='shadow-lg' />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='text-center bg-white px-3 py-3 shadow rounded'>
                                        <embed src={URL.createObjectURL(mergedPdfFile)} type="application/pdf" className='w-100' height="650px" />
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
                                            Merge
                                        </Divider>
                                        <div className='text-center'>
                                            <button className='btn btn-primary py-3 w-100' onClick={handleMergePdf} >Merge Pdfs</button>
                                            <p>Combine PDFs in the order you want with the easiest PDF merger available.</p>
                                        </div>
                                        {
                                            mergedPdfFile && (
                                                <>
                                                    <Divider orientation="left" plain>
                                                        Download
                                                    </Divider>
                                                    <div className='d-flex justify-content-center mt-3'>
                                                        <div className='d-flex'>
                                                            <a href={URL.createObjectURL(mergedPdfFile)} download={`${new Date().getTime()}_merged.pdf`} className='btn btn-primary px-5 align-items-center d-flex'>
                                                                <DownloadOutlined style={{ fontSize: '25px' }} /> <span className='mx-2' style={{ fontSize: '18px' }}>Download</span>
                                                            </a>
                                                            <button className='btn btn-primary mx-2' onClick={() => setMergedPdfFile(null)}>
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
                ) : (
                    <DropZone accept="pdf" onFilesSelected={(files) => selectFiles(files)} title="Merge PDF files" subtitle="Combine PDFs in the order you want with the easiest PDF merger available." />
                )
            }

            {/* Add More Files */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    // only PDF files
                    const pdfFiles = selectedFiles.filter((file) =>
                        file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
                    );

                    // Add the PDF files to the existing list
                    const newFiles = [...files, ...pdfFiles];
                    setFiles(newFiles);

                    e.target.value = null;
                }}
                accept=".pdf"
                multiple
            />
        </>
    )
}

export default Merge