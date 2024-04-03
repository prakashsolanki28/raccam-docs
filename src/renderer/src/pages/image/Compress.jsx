/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DropZone from '../../components/dropzone/DropZone'
import { Divider } from 'antd';
import { Button } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { CiImageOn } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";

function Compress() {

    const [file, setFile] = useState(null);
    const [compressFile, setCompressFile] = useState(null);
    const [compressionLevel, setCompressionLevel] = useState('good'); // extreme, good, less

    useEffect(() => {
        if (file) {
            compress();
        }
    }, [file, compressionLevel]);

    const compress = () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const elem = document.createElement('canvas');
                const width = 300;
                let quality = 0.7; // default quality for 'good' compression level

                // Adjust quality based on compression level
                if (compressionLevel === 'extreme') {
                    quality = 0.9;
                } else if (compressionLevel === 'less') {
                    quality = 0.2;
                }

                elem.width = width;
                elem.height = img.height * (width / img.width);
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, width, elem.height);
                // save in same format
                setCompressFile(elem.toDataURL('image/jpeg', quality));
            };
        };
    };

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
                        <DropZone accept="image" maxFiles={1} onFilesSelected={
                            (files) => { setFile(files[0]); }
                        } title="Select A Image" subtitle="Drag and drop a image file here or click to select a file to Compress Image." />
                    </div>
                )
            }
        </>
    )
}

export default Compress


//
//
//
// RECOMMENDED COMPRESSION
// Good quality, good compression
// LESS COMPRESSION
// High quality, less compression