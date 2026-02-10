import React from 'react'

const Streamlit = ({ port = 8501, page = "", title = "Streamlit App" }) => {
  // Use environment variable for backend URL, fallback to localhost for development
  const backendUrl = import.meta.env.VITE_STREAMLIT_BACKEND_URL || `http://localhost:${port}`

  // Construct the URL with page parameter if provided
  const url = page
    ? `${backendUrl}/${page}`
    : backendUrl

  return (
    <div>
      <iframe
        src={url}
        style={{ width: '100%', height: '100svh', border: 'none' }}
        title={title}
        allow="camera;microphone"
      ></iframe>
    </div>
  )
}

export default Streamlit