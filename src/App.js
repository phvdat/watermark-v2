import './App.css';
import DownloadFile from './components/download-file/DownloadFile';
import UploadForm from './components/uploads/Upload';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<UploadForm />} />
          <Route path='/download' element={<DownloadFile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
