import React from 'react';
import PDFPrinter from './PDFPrinter';
import {
    FastBackwardOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
    FastForwardOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
    DownloadOutlined,
} from '@ant-design/icons';

const ControlPanel = (props) => {
    const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === numPages;

    const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
    const lastPageClass = isLastPage ? 'disabled' : 'clickable';

    const goToFirstPage = () => {
        if (!isFirstPage) setPageNumber(1);
    };
    const goToPreviousPage = () => {
        if (!isFirstPage) setPageNumber(pageNumber - 1);
    };
    const goToNextPage = () => {
        if (!isLastPage) setPageNumber(pageNumber + 1);
    };
    const goToLastPage = () => {
        if (!isLastPage) setPageNumber(numPages);
    };

    const onPageChange = (e) => {
        const { value } = e.target;
        setPageNumber(Number(value));
    };

    const isMinZoom = scale < 0.6;
    const isMaxZoom = scale >= 2.0;

    const zoomOutClass = isMinZoom ? 'disabled' : 'clickable';
    const zoomInClass = isMaxZoom ? 'disabled' : 'clickable';

    const zoomOut = () => {
        if (!isMinZoom) setScale(scale - 0.1);
    };

    const zoomIn = () => {
        if (!isMaxZoom) setScale(scale + 0.1);
    };

    return (
        <div className="rounded mb-2 p-3 d-flex align-items-baseline justify-content-between">
            <div className="d-flex justify-content-between align-items-baseline">
                <FastBackwardOutlined className={`mx-3 ${firstPageClass}`} onClick={goToFirstPage} />
                <StepBackwardOutlined className={`mx-3 ${firstPageClass}`} onClick={goToPreviousPage} />
                <span>
                    Page{' '}
                    <input
                        name="pageNumber"
                        type="number"
                        min={1}
                        max={numPages || 1}
                        className="p-0 pl-1 mx-2 text-center w-16 border rounded"
                        value={pageNumber}
                        onChange={onPageChange}
                    />{' '}
                    of {numPages}
                </span>
                <StepForwardOutlined className={`mx-3 ${lastPageClass}`} onClick={goToNextPage} />
                <FastForwardOutlined className={`mx-3 ${lastPageClass}`} onClick={goToLastPage} />
            </div>
            <div className="d-flex justify-content-between align-items-baseline">
                <ZoomOutOutlined className={`mx-3 ${zoomOutClass}`} onClick={zoomOut} />
                <span>{(scale * 100).toFixed()}%</span>
                <ZoomInOutlined className={`mx-3 ${zoomInClass}`} onClick={zoomIn} />
            </div>
            <div className="mx-3">
                <a href={URL.createObjectURL(file)} download={true} title="download">
                    <DownloadOutlined />
                </a>
            </div>
            <div className="mx-3">
                <PDFPrinter file={file} />
            </div>
        </div>
    );
};

export default ControlPanel;
