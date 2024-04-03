import { HashRouter, Route, Routes } from 'react-router-dom'
import Main from '../components/Layout/Main'
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Merge from '../pages/pdf/Merge';
import Split from '../pages/pdf/Split';
import PDFDashboard from '../pages/pdf/PDFDashboard';
import ImageToPDF from '../pages/pdf/ImageToPDF';
import JpgToPdf from '../pages/pdf/JpgToPdf';
import WebView from '../pages/webview/WebView';
import Example from '../pages/webview/Example';
import ToPng from '../pages/image/jpg/ToPng';
import ToJpg from '../pages/image/png/ToJpg';
import Compress from '../pages/image/Compress';
import CompressPDF from '../pages/pdf/Compress';
import Crop from '../pages/video/Crop';
import MetaData from '../pages/pdf/MetaData';

function Index() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="pdf">
            <Route index element={<PDFDashboard />} />
            <Route path='merge' element={<Merge />} />
            <Route path='split' element={<Split />} />
            <Route path='image_to_pdf' element={<ImageToPDF />} />
            <Route path='jpg_to_pdf' element={<JpgToPdf />} />
            <Route path='compress' element={<CompressPDF />} />
            <Route path='metadata' element={<MetaData />} />
          </Route>
          <Route path='jpg'>
            <Route path='to_png' element={<ToPng />} />
          </Route>
          <Route path='png'>
            <Route path='to_jpg' element={<ToJpg />} />
          </Route>
          <Route path='image'>
            <Route path='compress' element={<Compress />} />
          </Route>
          <Route path='video' >
            <Route path='crop' element={<Crop />} />
          </Route>
        </Route>
        <Route path='web' element={<WebView />} />
        <Route path='/web/open/:url' element={<Example />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default Index