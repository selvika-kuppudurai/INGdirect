import React, { useState, useEffect } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import { Document, Page, pdfjs } from 'react-pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
import '../style/PDFPreview.scss';
import { Document, Page, pdfjs } from 'react-pdf';
// import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs'; // ✅ Use MJS worker path
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// import '../style/'
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFPreview = ({ file, onClose, onSaveModifications }) => {
  const [numPages, setNumPages] = useState(null);
  const [modifslide, setModify] = useState(false)
  const [prompts, setPrompts] = useState([]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlecancel = () => {
    setModify(false)
  }

//   const pdfData = `data:application/pdf;base64,${base64}`;
console.log('file', file)
  const pdfData = `data:application/pdf;base64,${file}`;
// const pdfData = file
//   ? typeof file === "string" && file.startsWith("data:")
//     ? file
//     : `data:application/pdf;base64,${file}`
//   : base64
//   ? `data:application/pdf;base64,${base64}`
//   : null;
  console.log('pdffile', pdfData)

//   return (
//     <div className="pdf-preview-drawer">
//       <div className="preview-header">
//         <h3>Presentation Preview</h3>
//         <div className="preview-actions">
//           <button className="btn secondary">Modify Slides</button>
//           <button className="btn primary">Download PPT</button>
//           <button className="btn close" onClick={onClose}>✕</button>
//         </div>
//       </div>

//       <div className="pdf-container">
//         <Document
//           file={file}
//           onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//           loading="Loading..."
//         >
//           {Array.from({ length: numPages }, (_, i) => (
//             <Page
//               key={`page_${i + 1}`}
//               pageNumber={i + 1}
//               width={600}
//               renderTextLayer={false}
//               renderAnnotationLayer={false}
//             />
//           ))}
//         </Document>
//       </div>
//     </div>
//   );

//   const pdfData = `data:application/pdf;base64,${base64}`;
const modifyslide = () => {
setModify(true)
}
const handlePromptChange = (index, value) => {
  const updatedPrompts = [...prompts];
  updatedPrompts[index] = value;
  setPrompts(updatedPrompts);
};
  useEffect(() => {
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
 return (
    <div className="pdf-overlay">
    <div className="pdf-drawer" style={modifslide ? { width: '85%' } : {}}>
        <div className="preview-header">
          <h3>Presentation Preview</h3>
          <div className="preview-actions">
            {!modifslide && ( <> <button className="btn secondary" onClick={()=> modifyslide()}>Modify Slides</button>
            <button className="btn primary">Download PPT</button> </>)}
          
          {modifslide && (
  <>
    <button className="btn btncancel buttonclass" onClick={() => handlecancel()}>Cancel</button>
    <button className="btn save savemodify" onClick={() => {
  onSaveModifications(prompts)}}>Save Modifications</button>
  </>
)}
            <button className="btn close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="pdf-container">
          {/* <Document
  file={pdfData}
  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
  onLoadError={(err) => {
    console.error("PDF Load Error: ", err);
    alert("Failed to load PDF: " + err.message);
  }}
  loading="Loading PDF..."
>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={550}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document> */}
          <div className="modify-slides-container">
      {/* PDF Slide Preview */}
      <div className="slide-preview">
       
        <Document
          file={pdfData}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading="Loading PDF..."
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              width={500}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </div>

      {/* Slide Prompt Inputs */}{
        modifslide && (
            <>
            <div className="slide-prompts">
                 <p>Prompt & Regenerate Slides</p>
        {/* <div className="header">
          <button className="btn cancel">Cancel</button>
          <button className="btn save">Save Modifications</button>
          <button className="btn close" onClick={onClose}>✕</button>
        </div> */}

        {Array.from({ length: numPages }, (_, i) => (
          <div key={i} className="slide-edit-section">
            {/* <label>Slide {i + 1}</label> */}
            <p>Slide {i + 1}</p>
            <textarea
              placeholder={`Enter prompt for Slide ${i + 1}`}
              rows={3}
              value={prompts[i] || ""}
              onChange={(e) => handlePromptChange(i, e.target.value)}
            />
          </div>
        ))}
      </div>
            </>
        )
      }
      
    </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;