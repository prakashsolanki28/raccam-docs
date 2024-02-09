import { PDFDocument } from 'pdf-lib';

const MergePDF = async (pdfFiles) => {

    console.log(pdfFiles);
    // Load all PDF files
    const loadedPdfFiles = await Promise.all(pdfFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return await PDFDocument.load(arrayBuffer);
    }));

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    // Iterate through each loaded PDF and append its pages to the merged PDF
    for (const pdf of loadedPdfFiles) {
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => {
            mergedPdf.addPage(page);
        });
    }

    // Save the merged PDF to a new Blob
    const mergedPdfBytes = await mergedPdf.save();
    const mergedPdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    return mergedPdfBlob;
}

export default MergePDF;