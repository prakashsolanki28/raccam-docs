/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DropZone from '../../components/dropzone/DropZone'
import { Divider } from 'antd';
import { Button } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { CiImageOn } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { PDFDocument } from 'pdf-lib';

function CompressPDF() {

    const [file, setFile] = useState(null);
    const [compressFile, setCompressFile] = useState(null);
    const [compressionLevel, setCompressionLevel] = useState('good'); // extreme, good, less

    useEffect(() => {
        if (file) {
            compress();
        }
    }, [file, compressionLevel]);

    const compress = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        try {

            // comporess pdf according to compression level
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = async () => {

                const pdfDoc = await PDFDocument.load(reader.result);
                const pages = pdfDoc.getPages();

                if (compressionLevel == 'extreme') {
                    for (let i = 0; i < pages.length; i++) {
                        const page = pages[i];
                        const { width, height } = page.getSize();
                        page.setSize(width / 2, height / 2);
                    }
                } else if (compressionLevel == 'less') {
                    for (let i = 0; i < pages.length; i++) {
                        const page = pages[i];
                        const { width, height } = page.getSize();
                        page.setSize(width * 2, height * 2);
                    }
                }

                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                setCompressFile(URL.createObjectURL(blob));

            }

        } catch (error) {
            console.log('Error in compressing file', error);
        }
    };

    return (
        <>
            {
                file ? (
                    <div className='row'>
                        <div className='col-12 col-md-7'>
                            <div className='card shadow'>
                                <div className='card-body text-center'>
                                    <embed src={URL.createObjectURL(file)} className='w-100' style={{ height: '100vh' }} />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 offset-1 col-md-4'>
                            <div className='bg-white rounded shadow' style={{ position: 'sticky', top: 90 }}>
                                <div className='card'>
                                    <div className='card-header border-bottom d-flex justify-content-between align-items-center'>
                                        <span className='h5'>Compress Image</span>
                                        <Button type="primary" icon={<ReloadOutlined />} onClick={() => setFile(null)} />
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-3 d-flex justify-content-center align-items-center'>
                                                <CiImageOn size={30} className='text-primary' />
                                            </div>
                                            <div className='col-9'>
                                                <p className='mb-0'>{file.name}</p>
                                                <p className='mb-0' style={{ fontSize: '14px' }}>{file.size / 1024} KB</p>
                                            </div>
                                        </div>
                                        <Divider orientation="left" plain>Compression level</Divider>
                                        <div className={`d-flex justify-content-between align-items-center p-3 border-bottom hover-to-gray ${compressionLevel == 'less' && 'bg-gray'} `}
                                            onClick={() => setCompressionLevel('less')}>
                                            <div>
                                                <p className='mb-0 text-danger'>EXTREME COMPRESSION</p>
                                                <p className='mb-0 text-muted'>Low quality, high compression</p>
                                            </div>
                                            <div>{compressionLevel == 'less' ? <FaCheckCircle size={30} color='green' /> : <PlusOutlined size={30} />}</div>
                                        </div>
                                        <div className={`d-flex justify-content-between align-items-center p-3 border-top border-bottom hover-to-gray ${compressionLevel == 'good' && 'bg-gray'} `}
                                            onClick={() => setCompressionLevel('good')}
                                        >
                                            <div>
                                                <p className='mb-0 text-warning'>GOOD COMPRESSION</p>
                                                <p className='mb-0 text-muted'>Good quality, good compression</p>
                                            </div>
                                            <div>{compressionLevel == 'good' ? <FaCheckCircle size={30} color='green' /> : <PlusOutlined size={30} />}</div>
                                        </div>

                                        <div className={`d-flex justify-content-between align-items-center p-3 border-top hover-to-gray ${compressionLevel == 'extreme' && 'bg-gray'} `}
                                            onClick={() => setCompressionLevel('extreme')}
                                        >
                                            <div>
                                                <p className='mb-0 text-primary'>LESS COMPRESSION</p>
                                                <p className='mb-0 text-muted'>High quality, less compression</p>
                                            </div>
                                            <div>{compressionLevel == 'extreme' ? <FaCheckCircle size={30} color='green' /> : <PlusOutlined size={30} />}</div>
                                        </div>
                                        <Divider orientation='left'>Compress</Divider>
                                        <div className='text-center'>
                                            {
                                                compressFile && (
                                                    <>
                                                        <button className='btn btn-primary py-3 w-100'
                                                            onClick={() => {
                                                                const link = document.createElement('a');
                                                                link.href = compressFile;
                                                                link.download = new Date().getTime() + '_compress_' + file.name;
                                                                document.body.appendChild(link);
                                                                link.click();
                                                                document.body.removeChild(link);
                                                            }}>Save Image</button>
                                                        <small className='text-primary'>Download Compress Image<br /><span>(New Size {(compressFile.length * 3 / 4) / 1024 + ' KB'})</span></small>
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
                        <DropZone accept="pdf" maxFiles={1} onFilesSelected={
                            (files) => { setFile(files[0]); }
                        } title="Select A Pdf" subtitle="Drag and drop a Pdf file here or click to select a file to Compress pdf." />
                    </div>
                )
            }
        </>
    )
}

export default CompressPDF