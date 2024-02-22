/* eslint-disable no-unused-vars */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import '../../assets/css/dropzone.css';

function DropZone({ onFilesSelected, accept, maxFiles, title, subtitle }) {
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: maxFiles || 10, // Use the provided maxFiles or default to 10
        accept: accept === 'pdf'
            ? { 'application/pdf': ['.pdf'] }
            : accept === 'image'
                ? { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'] }
                : accept === 'jpg'
                    ? { 'image/jpeg': ['.jpg'] }
                    : accept === 'png'
                        ? { 'image/png': ['.png'] }
                        : accept === 'video'
                            ? { 'video/*': ['.mp4', '.webm', '.ogg'] }
                            : { 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'] }
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    React.useEffect(() => {
        if (files.length > 0) {
            onFilesSelected(acceptedFiles);
        }
    }, [acceptedFiles, files, onFilesSelected]);

    return (
        <>
            <div className="drop-container">
                <div {...getRootProps({ className: 'dropzone' })}>
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                    <input {...getInputProps()} />
                    <div className='text-center'>
                        <button className='btn btn-primary px-5 py-4 mb-0' type="button" onClick={open}>
                            Select {accept ? accept : ""} Files
                        </button>
                        <span className='d-block py-0'>Or</span>
                        <p>or drop {accept ? accept : 'PDFs'} here</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DropZone;