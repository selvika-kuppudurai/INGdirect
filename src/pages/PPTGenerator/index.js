import React, { useState, useRef, useEffect } from "react";
import "./style.scss";
import pptimage from '../../assets/PPT.png'
import lighticon from '../../assets/Vector.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaRegFileAlt } from "react-icons/fa";
import GeneratedPPTCard from "../GeneratedPPTCard/index.js"
 import { FaRedo, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import pptLogo from "../../assets/logo.png";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
  // ListItem, 
  ListItemButton,
  // ListItemText
} from '@mui/material';
import {  Paper, Avatar, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SendIcon from '@mui/icons-material/Send';

const PPTGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedReportIndex, setSelectedReportIndex] = useState(1);
  const[selectedpdf, setselectedpdf] = useState(false)

  // const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaddisable, setuploadbuttondisable] = useState(false)

  const [pptBlob, setPptBlob] = useState(null); // To store the response blob
const [isGenerating, setIsGenerating] = useState(false);

  //   const handleUpload = () => {
  //   fileInputRef.current.click(); // Trigger file input click
  // };

  const reports = [
    "Report Name 1", "Report Name 2", "Report Name 3",
    "Report Name 4", "Report Name 5", "Report Name 6",
    "Report Name 7", "Report Name 8", "Report Name 9", "Report Name 10",
  ];

  const deletefile = () => {
    setSelectedFile(null)
    setuploadbuttondisable(false)
  }

  const triggerFileInputClick = () => {
    fileInputRef.current.click(); // Trigger browse
  };
  const handleFileChange = (event) => {
    // fileInputRef.current.click();
    // setFile(event.target.files[0]);
    const file = event.target.files[0];
    setSelectedFile(file);
    setuploadbuttondisable(true)
    // You can now upload the file or store it
    console.log("Selected file:", file);
  };

  const handleUpload = async () => {

   
     try {
    const response = await fetch(" http://localhost:5000/list_files?user_id=selvika", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      // body: JSON.stringify({
      //   embedding_name: "heineken-holding-nv-annual-report-2023-final.pdf_embeddings.json",
      //   prompt: "Illustrate how these financial risks could impede Heineken’s strategic objectives, such as market expansion, profitability targets, and shareholder value enhancement. Create hypothetical scenarios or reference historical instances where unmanaged risks led to financial setbacks for similar companies. Use visual storytelling elements like infographics or timelines to depict potential impacts over short and long-term horizons.",
      //   ticker: "HEIO.AS"
      // }),
      // credentials: "include"
    });

    if (!response.ok) throw new Error("Failed to generate PPT");

    const result = await response.json();
    console.log("Generated PPT Response:", result);

    // ✅ Optionally show success message, update UI, etc.
  } catch (error) {
    console.error("Error in prompt upload:", error);
    alert("Failed to generate PPT");
  }

    // if (!selectedFile) return;

    // const formData = new FormData();
    // formData.append("file", selectedFile);

    // // Make the API call
    // fetch("http://localhost:5000/upload?user_id=selvika", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // alert("Upload successful!");
    //     setSelectedFile()
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     alert("Upload failed.");
    //   });
  };
  const handlepromptupload = async () => {
    setselectedpdf(true)
  try {
    const response = await fetch("http://localhost:5000/dummy_ppt?user_id=abhijit_debnath", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify({
        embedding_name: "heineken-holding-nv-annual-report-2023-final.pdf_embeddings.json",
        prompt: "Illustrate how these financial risks could impede Heineken’s strategic objectives, such as market expansion, profitability targets, and shareholder value enhancement. Create hypothetical scenarios or reference historical instances where unmanaged risks led to financial setbacks for similar companies. Use visual storytelling elements like infographics or timelines to depict potential impacts over short and long-term horizons.",
        ticker: "HEIO.AS"
      }),
      // credentials: "include"
    });
    console.log('ffff',response)
    // if (!response) throw new Error("Failed to generate PPT");
    const blob = await response.blob();
    console.log('hhhh', blob)
     setPptBlob(blob);
    // const result = await response.json();
    // console.log("Generated PPT Response:", result);

    // ✅ Optionally show success message, update UI, etc.
  } catch (error) {
    console.error("Error in prompt upload:", error);
    alert("Failed to generate PPT");
  }
};
const handleDownloadPPT = () => {
  if (!pptBlob) {
    alert("PPT not ready yet");
    return;
  }

  const blobUrl = URL.createObjectURL(pptBlob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "GeneratedPresentation.pptx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);  // cleanup
};
// const handleDownloadPPT = () => {
//   if (!pptBlob) {
//     alert("PPT not ready yet. Please generate it first.");
//     return;
//   }

//   const url = URL.createObjectURL(pptBlob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "GeneratedPresentation.pptx";
//   document.body.appendChild(a);
//   a.click();
//   a.remove();
//   URL.revokeObjectURL(url);
// };
  return (
    <div className="ppt-container">
      <div className="ppt-box">
        <h1 className="ppt-title">PPT Generator</h1>
        {selectedpdf ?  <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      {/* Prompt Box */}
      <div className='d-flex'>
      <Avatar
          alt="User"
          src="https://i.pravatar.cc/300" // Optional avatar
          sx={{ width: 32, height: 32, mr: 2 }}
        />
      <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2 }}>
        
        <Typography variant="body2">
          Create <strong>Portfolio Analysis ppt</strong> for <strong>Microsoft</strong> – using{' '}
          <Link href="#" underline="hover" color="primary">
            Microsoft_doc.pdf
          </Link>
        </Typography>
      </Paper>
      </div>

      {/* Response Card */}
      <div>
        
{/* <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: '#F9F9F9' }}>
        <InsertDriveFileIcon sx={{ fontSize: 48, color: '#D44625' }} />
        <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 1 }}>
          Portfolio Analysis.ppt
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton color="primary" title="Regenerate">
            <Replay />
          </IconButton>
          <IconButton color="primary" title="Open">
            <OpenInNew />
          </IconButton>
          <IconButton color="primary" title="Download">
            <Download />
          </IconButton>
        </Box>
      </Paper> */}
      <div className="ppt-card">
      {/* PPT Preview */}
      <div className="ppt-preview">
        <img src={pptLogo} alt="PPT Icon" className="ppt-icon" />
        <span className="ppt-name">Portfolio Analysis.ppt</span>
      </div>

      {/* Actions */}
      <div className="ppt-actions">
        <div className="action-button">
          <FaRedo size={14} />
          <span>Regenerate response</span>
        </div>

        <div className="action-icons">
          <a href="https://example.com/portfolio.ppt" target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt  size={16} />
          </a>
          <a download>
            <FaDownload onClick={() => {handleDownloadPPT()}} size={16} />
          </a>
        </div>
      </div>
    </div>
      </div>
      
    </Box> : <div className="ppt-instructions">
          <img src={pptimage} alt="PPT Icon" className="ppt-icon" />
          <p>Step 1: Upload your annual report or select from pre-uploaded reports</p>
          <p>Step 2: Enter the company’s ticker symbol (Optional)</p>
          <p>Step 3: Describe your expectations in a prompt and press Enter to generate the PowerPoint</p>
        </div> }
        

        {/* <div className="row ppt-input-section">
          <div className="col-lg-10 ppt-upload-area">
            <span>Upload your Annual Report to get started</span>
            <button className="browse-button">Browse Files</button>
            <span>or</span>
            <button className="preloaded-button">Use Pre-uploaded Reports</button>
          </div>

          <div className="col-lg-2 ppt-ticker-area">
            <label htmlFor="ticker">Enter Ticker of the Company (Optional)</label>
            <input type="text" id="ticker" placeholder="e.g., AAPL" />
          </div>
        </div> */}
        <div className="d-flex justify-content-center align-items-center">
          <div className="p-4 rounded" style={{ backgroundColor: '#f1f5fb', minWidth: '80%', maxWidth: '800px' }}>
            <div className="row fontsize align-items-center">

              {/* Left side - Upload Buttons */}
              <div className="col-md-8 mb-3 mb-md-0 dflex">
                <span className="aligncontent">Upload your Annual Report to get started</span>
                {/* <input type="file" onChange={handleFileChange} /> */}
                {!uploaddisable ? <button className=" button mx-2" onClick={triggerFileInputClick}>Browse Files</button> : ""}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {selectedFile && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <span className="mx-2 marginbottom">{selectedFile.name}</span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => deletefile()}
                    />
                  </div>
                )}
                {/* {selectedFile && <p className="mx-2 marginbottom"> - {selectedFile.name}</p>} */}
                {!uploaddisable ? <><span className=" aligncontent mx-2">or </span><button className="aligncontent buttondesign" onClick={() => setDrawerOpen(true)}>Use Pre-uploaded Reports</button></> : ""}

              </div>

              {/* Right side - Ticker Input */}
              <div className="col-md-4">
                <label htmlFor="ticker" className="form-label">
                  Enter Ticker of the Company <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="ticker"
                  className="form-control"
                // placeholder="e.g., AAPL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-4 rounded" style={{ backgroundColor: '#f1f5fb', minWidth: '80%', maxWidth: '800px' }}> */}
      <div className="justify">
        <div style={{ minWidth: '80%', maxWidth: '800px' }} className="ppt-prompt-box">
          <input
            type="text"
            placeholder="Enter Prompt here"
          // value={prompt}
          // onChange={(e) => setPrompt(e.target.value)}
          />
          {/* <div className="ppt-prompt-actions">
            <img src={lighticon}> Get suggestions </img> */}

          {/* <button>🎤</button>
            <button>➤</button> */}
          {/* </div> */}
          {/* <div className="ppt-prompt-actions d-flex align-items-center gap-2">
            <img src={lighticon} alt="Get suggestions" style={{ width: '12px', height: '12px' }} />
            <button className="sugeestionbutton">Get suggestions <SendIcon style={{ marginLeft: 5 }} /></button>
             
            <FontAwesomeIcon icon={faPaperPlane} style={{ marginLeft: 5 }} />
          </div> */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>

            {/* Left side - Suggestions */}
            <div className="d-flex align-items-center gap-2 text-primary" style={{ cursor: 'pointer' }}>
              <img src={lighticon} alt="Get Suggestions" style={{ width: '14px', height: '14px' }} />
              <span style={{ fontSize: '14px' }}>Get Suggestions</span>
            </div>

            {/* Right side - Mic and Send */}
            <div className="d-flex align-items-center gap-3">
              <FontAwesomeIcon icon={faMicrophone} size="lg" color="#0047AB" style={{ cursor: 'pointer' }} />
              <FontAwesomeIcon icon={faPaperPlane} size="lg" color="#0047AB" style={{ cursor: 'pointer' }} onClick={() => {handlepromptupload()}} />
            </div>
          </div>

        </div>


      </div>
      {/* </div> */}
      {/* {drawerOpen && (
  <div className="custom-sidebar">
    <div className="custom-sidebar-header">
      <Typography variant="h6">Pre-uploaded Reports</Typography>
      <IconButton onClick={() => setDrawerOpen(false)}>
        <CloseIcon />
      </IconButton>
    </div>
    <Divider />
    <List>
      {reports.map((report, index) => (
        <ListItem
          key={index}
          button
          selected={index === selectedReportIndex}
          onClick={() => setSelectedReportIndex(index)}
        >
          <ListItemText primary={report} />
          {index === selectedReportIndex && (
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </ListItem>
      ))}
    </List>
  </div>
)} */}
      {drawerOpen && (
        <>
          {/* Overlay */}
          <div className="backdrop-overlay" onClick={() => setDrawerOpen(false)} />

          {/* Sidebar */}
          <div className="custom-sidebar">
            <div className="custom-sidebar-header">
              <Typography variant="h6"><FaRegFileAlt/>Pre-uploaded Reports</Typography>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {reports.map((report, index) => (
                <ListItem
                  key={index}
                  button
                  selected={index === selectedReportIndex}
                  onClick={() => setSelectedReportIndex(index)}
                >
                  <ListItemText primary={report} />
                  {index === selectedReportIndex && (
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </ListItem>
              ))}
            </List>
          </div>
        </>
      )}

    </div>

  );
};

export default PPTGenerator;