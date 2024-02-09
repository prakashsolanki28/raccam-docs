import { HashRouter, Route, Routes } from 'react-router-dom'
import Main from '../components/Layout/Main'
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Merge from '../pages/pdf/Merge';
import Split from '../pages/pdf/Split';
import PDFDashboard from '../pages/pdf/PDFDashboard';
import ImageToPDF from '../pages/pdf/ImageToPDF';
import WebView from '../pages/webview/WebView';
import Example from '../pages/webview/Example';

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
          </Route>
        </Route>
        <Route path='web' element={<WebView />} />
        <Route path='/web/example' element={<Example />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default Index