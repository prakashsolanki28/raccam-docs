import { PDFDocument } from 'pdf-lib';

const SplitPDF = async (pdfFile, pageNumbers) => {

    // split pdf using pdf-lib with page numbers
    const arrayBuffer = await pdfFile.arrayBuffer();
    const loadedPdf = await PDFDocument.load(arrayBuffer);
    const splitPdf = await PDFDocument.create();

    const pages = await splitPdf.copyPages(loadedPdf, pageNumbers);
    pages.forEach((page) => {
        splitPdf.addPage(page);
    });

    const splitPdfBytes = await splitPdf.save();
    const splitPdfBlob = new Blob([splitPdfBytes], { type: 'application/pdf' });
    return splitPdfBlob;

}

export default SplitPDF;