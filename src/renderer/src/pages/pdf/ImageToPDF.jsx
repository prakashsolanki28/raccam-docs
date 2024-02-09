/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import DropZone from '../../components/dropzone/DropZone'
import { Button, Flex, Divider } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { RxCross2 } from "react-icons/rx";
import { LuArrowUpDown } from "react-icons/lu";
import { PDFDocument } from 'pdf-lib';

function ImageToPDF() {

    const [files, setFiles] = useState([]);
    const [mergedPdfFile, setMergedPdfFile] = useState(null);

    // Drag and Drop
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
        // if (mergedPdfFile) {
        //     handleMergePdf();
        // }
    };

    // Styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
        }
    });

    const fileToArrBuffer = (file) => {
        new Promise((res, rej) => {
            const fileReader = new FileReader();
            fileReader.onload = () => res(fileReader.result);
            fileReader.onerror = () => rej(fileReader.error);
            fileReader.readAsArrayBuffer(file);
        });
    }


    const makeImagesToPDF = async () => {

    };

    // Add More Files 
    const fileInputRef = useRef(null);
    return (
        <>
            {
                files && files.length > 0 ?
                    (
                        <div className='row'>
                            <div className='col-12 col-md-8'>
                                <div className="text-center">
                                    {
                                        mergedPdfFile == null ? (
                                            files.map((file, index) => (
                                                <div className='d-inline-block bg-white p-3 rounded border m-2' key={index} style={{ width: 200, cursor: 'move' }}
                                                    onDragStart={(e) => handleDragStart(e, index)}
                                                    onDragOver={(e) => handleDragOver(e, index)}
                                                    draggable
                                                >
                                                    <img src={URL.createObjectURL(file)} alt={file.name} style={{ aspectRatio: '3/2', objectFit: 'contain' }} className="img-fluid rounded" />
                                                </div>
                                            ))
                                        ) : (
                                            <p>PDf Created</p>
                                        )
                                    }
                                </div>
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
                                                                <span style={{ fontSize: 12, textWrap: 'pretty' }}>{file.name.length > 25 ? file.name.substring(0, 25) + '...' : file.name}</span>
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
                                                <button className='btn btn-primary py-3 w-100' onClick={makeImagesToPDF} >Create PDF</button>
                                                <p>Images to PDF</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <DropZone onFilesSelected={(files) => setFiles(files)} title="Images To PDF" subtitle="Drag and drop images here or click to select images to convert to PDF." accept="image" />
                    )
            }

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    // only Images files
                    const pdfFiles = selectedFiles.filter((file) =>
                        // allow all image files
                        file.type.startsWith('image/')
                    );

                    // Add the images files to the existing list
                    const newFiles = [...files, ...pdfFiles];
                    setFiles(newFiles);

                    e.target.value = null;
                }}
                multiple
                accept='image/*'
            />
        </>
    )
}

export default ImageToPDF