import React, { useState } from 'react'
import DropZone from '../../components/dropzone/DropZone'
import { Document, Page, pdfjs } from 'react-pdf';
import ControlPanel from '../../components/pdf/render/ControlPanel';
import { Button, Flex, Divider, notification } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { FaArrowsAltH } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import SplitPDF from '../../utils/pdf/split';
import { PDFDocument } from 'pdf-lib';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Split() {


    const [range, setRange] = useState([0, 0]);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [splitPdfFile, setSplitPdfFile] = useState(null);

    const [files, setFiles] = React.useState([])
    const [filePagesCount, setFilePagesCount] = useState(0);
    const selectFiles = async (files) => {
        setFiles(files);
        // get page count of the pdf
        const arrayBuffer = await files[0].arrayBuffer();
        const loadedPdf = await PDFDocument.load(arrayBuffer);
        const pageCount = loadedPdf.getPageCount();
        setFilePagesCount(pageCount);
    }

    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    // menus state
    const [current, setCurrent] = useState('1');

    // Split PDF
    const splitPdf = async () => {

        const getPagesArray = [];

        if (current === '1') {

            if (range[0] === 0 || range[1] === 0) {
                notification.error({
                    message: 'Split PDF',
                    description: 'Please enter a valid range.',
                    placement: 'topRight'
                })
                return;
            }

            if (parseInt(range[0]) > parseInt(range[1])) {
                notification.error({
                    message: 'Split PDF',
                    description: 'Invalid range. The start range should be less than the end range.',
                    placement: 'topRight'
                })
                return;
            }

            const rangeArray = Array.from({ length: parseInt(range[1]) - parseInt(range[0]) + 1 }, (_, i) => i + parseInt(range[0]));
            // cange rangeArray to accept 0 based index
            const rangeArrayZeroBased = rangeArray.map((item) => item - 1);
            console.log(rangeArrayZeroBased);
            getPagesArray.push(...rangeArrayZeroBased);
        }
        else {

            if (pageNumbers.length === 0) {
                notification.error({
                    message: 'Split PDF',
                    description: 'Please enter a valid page number.',
                    placement: 'topRight'
                })
                return;
            }

            const InvalidPageNumbers = pageNumbers.filter((item) => parseInt(item) > filePagesCount || parseInt(item) < 1);
            if (InvalidPageNumbers.length > 0) {
                notification.error({
                    message: 'Split PDF',
                    description: 'Invalid page numbers. Please enter valid page numbers.',
                    placement: 'topRight'
                })
                return;
            }

            const pageNumbersArray = pageNumbers.map((item) => parseInt(item) - 1);
            getPagesArray.push(...pageNumbersArray);
        }

        // Split PDF
        SplitPDF(files[0], getPagesArray).then((blob) => {
            setSplitPdfFile(blob);
            console.log(blob);
        }).catch((error) => {
            console.log(error);
            notification.error({
                message: 'Split PDF',
                description: 'An error occurred while splitting the PDF. Please try again.',
                placement: 'topRight'
            })
        });

    }

    return (
        <>
            {
                files && files.length > 0 ? (
                    <div className='row'>
                        <div className='col-12 col-md-7 bg-white p-2'>
                            <section className="w-100 control-panel d-flex flex-column align-items-center">
                                {
                                    isLoading ? 'Loading...' : ''
                                }
                                <ControlPanel
                                    scale={scale}
                                    setScale={setScale}
                                    numPages={numPages}
                                    pageNumber={pageNumber}
                                    setPageNumber={setPageNumber}
                                    file={splitPdfFile ? splitPdfFile : files[0]}
                                />
                                <Divider className='mt-0 mb-2 p-0' />
                                <Document
                                    file={splitPdfFile ? splitPdfFile : files[0]}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    style={{ width: '100%', height: '50vh', overflow: 'auto' }}
                                    className="pt-2 pb-4"
                                >
                                    <Page
                                        pageNumber={pageNumber}
                                        scale={scale}
                                        loading="Loading..."
                                        className="shadow-sm bg-white border w-100"
                                    />
                                </Document>
                            </section>
                        </div>
                        {/* Show Card */}
                        <div className='col-12 col-md-4 offset-1'>
                            <div className='bg-white rounded shadow' style={{ position: 'sticky', top: 90 }}>
                                <div className='card'>
                                    <div className='card-header d-flex justify-content-between align-items-center'>
                                        <span className='h5'>Merge PDFs</span>
                                        <Flex gap="small" align="flex-end" wrap="wrap" >
                                            <Button type="primary" icon={<ReloadOutlined />} onClick={() => setFiles([])} />
                                        </Flex>
                                    </div>
                                    <div className='card-body'>
                                        <Menu mode="horizontal" style={{ width: '100%' }}>
                                            <Menu.Item key="1" icon={<FaArrowsAltH />}
                                                onClick={(e) => setCurrent(e.key)}
                                                className={current === '1' ? 'ant-menu-item-selected' : ''}
                                            >
                                                <span>Using Range</span>
                                            </Menu.Item>
                                            <Menu.Item key="2" icon={<GoNumber />}
                                                onClick={(e) => setCurrent(e.key)}>
                                                <span>Custom Page Number</span>
                                            </Menu.Item>
                                        </Menu>
                                        {
                                            current === '1' ? (
                                                <>
                                                    <Divider orientation="left" plain>Using Range</Divider>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <input type="text" className="form-control me-2" placeholder="From"
                                                            onChange={(e) => setRange([e.target.value, range[1]])}
                                                            value={range[0]}
                                                            min={1}
                                                            max={filePagesCount}
                                                        />
                                                        <input type="text" className="form-control ms-2" placeholder="To"
                                                            onChange={(e) => setRange([range[0], e.target.value])}
                                                            value={range[1]}
                                                            min={1}
                                                            max={filePagesCount}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <Divider orientation="left" plain>Custom Page Number</Divider>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <input type="text" className="form-control" placeholder="Commas separated page numbers. Ex: 1,2,4,5
                                                        "
                                                            onChange={(e) => setPageNumbers(e.target.value.split(','))}
                                                            value={pageNumbers.join(',')}
                                                        />
                                                    </div>
                                                </>
                                            )
                                        }
                                        <Divider orientation="left" plain>Split</Divider>
                                        <div className='my-2'>
                                            <button className='btn btn-primary w-100 py-3' onClick={splitPdf} >Split</button>
                                        </div>
                                        <Divider orientation="left" plain>Download</Divider>
                                        <div className='my-2'>
                                            {
                                                splitPdfFile && (
                                                    <a href={URL.createObjectURL(splitPdfFile)} download={`${new Date().getTime()}_split.pdf`} className='btn btn-primary w-100 py-3' >Download</a>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <DropZone accept="pdf" maxFiles={1} onFilesSelected={(files) => selectFiles(files)} title="Split PDF file" subtitle="Drag and drop a PDF file here or click to select a file to split." />
                )
            }
        </>
    )
}

export default Split