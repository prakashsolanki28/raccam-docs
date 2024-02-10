/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DropZone from '../../../components/dropzone/DropZone'
import { Divider } from 'antd';
import { Button, Flex } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { CiImageOn } from "react-icons/ci";

function ToPng() {

    const [file, setFile] = useState(null);
    const [pngFile, setPngFile] = useState(null);

    const convertPng = () => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const png = canvas.toDataURL('image/png');
            setPngFile(png);
        }
    }

    return (
        <>
            {
                file ? (
                    <div className='row'>
                        <div className='col-12 col-md-8'>
                            <div className='card shadow py-5'>
                                <div className='card-body'>
                                    <img src={URL.createObjectURL(file)} alt='Jpg' className='img-fluid' style={{ aspectRatio: '3/2', objectFit: 'contain' }} />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='bg-white rounded shadow' style={{ position: 'sticky', top: 90 }}>
                                <div className='card'>
                                    <div className='card-header d-flex justify-content-between align-items-center'>
                                        <span className='h5'>Merge PDFs</span>
                                        <Flex gap="small" align="flex-end" wrap="wrap" >
                                            <Button type="primary" icon={<ReloadOutlined />} onClick={() => setFile(null)} />
                                        </Flex>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-3 d-flex justify-content-center align-items-center'>
                                                <CiImageOn size={30} className='text-primary' />
                                            </div>
                                            <div className='col-9'>
                                                <p className='mb-0'>{file.name}</p>
                                            </div>
                                        </div>
                                        <Divider />
                                        <div className='row'>
                                            <div className='col-3'><p style={{ fontSize: '12px' }}>Type Of File</p></div>
                                            <div className='col-9'><p className='mb-0' style={{ fontSize: '14px' }}>.Jpg</p></div>
                                            <div className='col-3'><p style={{ fontSize: '12px' }}>Size</p></div>
                                            <div className='col-9'><p className='mb-0' style={{ fontSize: '14px' }}>{file.size / 1024} KB</p></div>
                                        </div>
                                        <Divider orientation="left" plain>Merge</Divider>
                                        <div className='text-center'>
                                            {
                                                pngFile ? (
                                                    <>
                                                        <button className='btn btn-primary py-3 w-100'
                                                            onClick={() => {
                                                                const link = document.createElement('a');
                                                                link.href = pngFile;
                                                                link.download = file.name.replace('.jpg', '.png');
                                                                document.body.appendChild(link);
                                                                link.click();
                                                                document.body.removeChild(link);
                                                            }}>Save Png Image</button>
                                                        <p><small>Download Png Image</small></p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className='btn btn-primary py-3 w-100' onClick={convertPng}>Convert</button>
                                                        <p>
                                                            <small>Convert <span className='text-primary'>Jpg</span> to Png</small>
                                                        </p>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                ) : (
                    <div>
                        <DropZone accept="jpg" maxFiles={1} onFilesSelected={
                            (files) => { setFile(files[0]); }
                        } title="Jpg To Png" subtitle="Drag and drop a .Jpg file here or click to select a file to Convert Png." />
                    </div>
                )
            }
        </>
    )
}

export default ToPng