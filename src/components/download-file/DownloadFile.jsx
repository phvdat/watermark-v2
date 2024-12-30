import { useState } from "react";

const DownloadFile = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Download File</h1>
      <a href={`${process.env.REACT_APP_API_ENDPOINT}/download-all-files`}>
        <button disabled={loading} onClick={() => setLoading(true)}>{loading ? "Waiting" : 'Download'}</button></a>
    </div>
  )
}

export default DownloadFile