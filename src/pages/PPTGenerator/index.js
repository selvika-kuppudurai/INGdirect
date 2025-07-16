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
import pptLogo from "../../assets/pdf.png";
import PDFPreview from "../../components/PDFviewer.js";
import { debounce } from "lodash";
import pdflogo from "../../assets/pdflogo.png"
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
import { Paper, Avatar, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

const PPTGenerator = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const endpoint = process.env.REACT_APP_DUMMY_PPT_ENDPOINT;
  const listurl = process.env.REACT_APP_API_LIST_USER
  const fullUrl = `${baseUrl}${endpoint}`;
  const uploadurl = process.env.REACT_APP_API_UPLOAD_URL


  // const [isGenerating, setIsGenerating] = useState(false);
  const [ticker, setTicker] = useState()
  const [prompt, setPrompt] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpensuggestion, setDrawerOpensuggestions] = useState(false);
  const [selectedReportIndex, setSelectedReportIndex] = useState();
  const [selectedpdf, setselectedpdf] = useState(false)
  const [filename, setFilename] = useState('sample.pdf');
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaddisable, setuploadbuttondisable] = useState(false)

  const [pptBlob, setPptBlob] = useState(null); // To store the response blob
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports, setreports] = useState([])
  const [selectedpreupload, setselectedpreupload] = useState(true)

  const [uploaddone, setuploaddone] = useState(false)
  const [pdfBase64, setPdfBase64] = useState('');

  const [preview, setpreview] = useState(false)

  const [loader, setLoader] = useState(false)
  const [promptError, setPromptError] = useState('');

  //   const handleUpload = () => {
  //   fileInputRef.current.click(); // Trigger file input click
  // };

  const reports1 = [
    "Summarize the key financial highlights from this report.", "Create a presentation on the company's yearly performance", "Generate a SWOT analysis based on the annual report.",
    "Give me a slide deck with revenue, profit, and growth trends.", "Create a 5-slide summary for an investor meeting.", "Highlight revenue growth and operating margins.",
    "Compare current year performance with the previous year", "Visualize key metrics: revenue, net profit, and EBITDA", "Extract and summarize risk factors mentioned in the report", "Create slides for financial ratios and KPIs.",
  ];



  const deletefile = () => {
    setSelectedFile(null)
    setselectedpdf(false)
    setuploadbuttondisable(false)
  }
  const deletefile1 = () => {
    setselectedpreupload(true)
    setselectedpdf(false)
    setSelectedReportIndex()
    setPrompt("")
    setTicker("")
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    // link.href = `data:${mimeType};base64,${base64}`;
    link.download = filename;
    link.click();
  };

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${pdfBase64}`;
    link.download = 'document.pdf';
    link.click();
  };
  // useEffect(() => {
  //   fetch('/base64.txt')
  //     .then((res) => res.text())
  //     .then((text) => {
  //       try {
  //         const json = JSON.parse(text);
  //         const cleanBase64 = json.pdf_base64
  //           .replace(/\s/g, '')
  //           .replace(/^data:application\/pdf;base64,/, '');
  //         setPdfBase64(cleanBase64);
  //       } catch (err) {
  //         console.error('❌ JSON parse error:', err);
  //       }
  //     })
  //     .catch((err) => console.error('❌ Fetch error:', err));
  // }, []);
  // ../../assets/base64.txt?
  // useEffect(() => {
  //   fetch('/base64.txt')
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       return res.text();
  //     })
  //     .then((text) => {
  //       try {
  //         const jsonData = JSON.parse(text);
  //         console.log('pdf_base64', jsonData)
  //         console.log('jsonData.pdf_base64.trim()', jsonData.pdf_base64.trim())
  //         setPdfBase64(jsonData.pdf_base64.trim());
  //       } catch (parseErr) {
  //         console.error('❌ JSON parse error:', parseErr.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('❌ Fetch error:', err.message);
  //     });
  // }, []);
  // useEffect(() => {
  //   // Load and parse JSON from .txt
  //   console.log('ggggggg')
  //   fetch('../../assets/base64.txt')
  //     .then(res => res.text())
  //     .then((text) => {
  //       const jsonData = JSON.parse(text);
  //       console.log('json', jsonData)
  //       if (jsonData?.pdf_base64) {
  //         console.log('jsonData.pdf_base64.trim()', jsonData.pdf_base64.trim())
  //         setPdfBase64(jsonData.pdf_base64.trim());
  //       }
  //     })
  //     .catch(err => console.error('Error loading base64 PDF:', err));
  // }, []);

  const triggerFileInputClick = () => {
    fileInputRef.current.click(); // Trigger browse
  };
  const handleFileChange = (event) => {

    const file = event.target.files[0];
    setSelectedFile(file);
    setuploadbuttondisable(true)
    console.log("Selected file:", file);
  };

  const handleUpload = async () => {

    try {
      const response = await fetch(`${baseUrl}${listurl}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        },
      });

      if (!response.ok) throw new Error("Failed to generate PPT");

      const result = await response.json();
      console.log("Generated PPT Response:", result);
      setreports(result.files)
      setuploaddone(true)

      // reports = result.files
      console.log('files', typeof reports)
      // reports.map(report => {
      //   console.log('report', report)
      // })
      // ✅ Optionally show success message, update UI, etc.
    } catch (error) {
      console.error("Error in prompt upload:", error);
      alert("Failed to generate PPT");
    }


  };
  useEffect(() => {
    console.log("isGenerating:", isGenerating);
  }, [isGenerating]);
  const handleafterupload = async () => {
    if (!prompt.trim()) {
      setPromptError("Prompt is required.");
      return;
    }
    setPromptError("");
    console.log('loader', loader)
    console.log(selectedpdf)
    setLoader(true)
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embedding_name: `${selectedReportIndex}.json`,
          prompt: prompt ? prompt : "",
          ticker: ticker ? ticker : "",
        }),
      });

      // if (!response.ok) {
      //   throw new Error("Failed to generate PPT");
      // }

      const data = await response.json(); // ✅ parse JSON instead of blob
      console.log("✅ Response JSON:", data);

      const { pdf_base64, pptx_base64, ppt_name } = data;



      // Convert base64 to Blob
      const byteCharacters = atob(pptx_base64);
      const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const pptBlob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
      try {
        // const json = JSON.parse(text);
        const cleanBase64 = pdf_base64
          .replace(/\s/g, '')
          .replace(/^data:application\/pdf;base64,/, '');
        setPdfBase64(cleanBase64);
      } catch (err) {
        console.error('❌ JSON parse error:', err);
      }
      // ✅ Save blob and update state
      console.log('pptBlob', pptBlob)
      setPptBlob(pptBlob);
      setselectedpdf(true);
      setLoader(false)
      console.log("🎉 PPT Blob created and stored");

    } catch (error) {
      console.error("❌ Error in prompt upload:", error);
      alert("Failed to generate PPT");
    }
  };

  const handlepromptupload = async () => {
    if (!prompt.trim()) {
      setPromptError("Prompt is required.");
      return;
    }
    setPromptError("");
    // setIsGenerating(true);
    try {
      console.log('vv', isGenerating)
      setIsGenerating(true);
      console.log('vv', isGenerating)
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append("file", selectedFile);

      // Make the API call
      fetch(`${baseUrl}${uploadurl}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)

          setuploaddone(true)
          setIsGenerating(false)
        })
    }
    catch (err) {
      console.error(err);
      alert("Upload failed.");
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

  const selectedpreuplpad = (i) => {
    console.log('upload', i)
    setselectedpreupload(false)
    setSelectedReportIndex(i)
    setDrawerOpen(false)

  }

  const handleChange = (e) => {
    setPrompt(e)
  }


  const handleSlideModifications = async (promp) => {
    console.log("vvvvv", promp)
  }
  const handlepreview = () => {
    setpreview(true)
    // <PDFPreview base64={sampleBase64} />
  }

  return (

    <div className="ppt-container">


      <div className="ppt-box">
        <h1 className="ppt-title">PPT Generator</h1>
        {selectedpdf && !isGenerating ? (<Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
          {/* Prompt Box */}
          <div className='d-flex'>
            <Avatar
              alt="User"
              src="https://i.pravatar.cc/300" // Optional avatar
              sx={{ width: 32, height: 32, mr: 2 }}
            />
            <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2 }}>

              <Typography variant="body2">
                Create {prompt} – using{' '}
                <Link href="#" underline="hover" color="primary">
                  {selectedFile ? selectedFile.name : selectedReportIndex}
                </Link>
              </Typography>
            </Paper>
          </div>

          {/* Response Card */}
          <div className="d-flex">
            <img src={pdflogo} alt="Icon" className="iconpdf"></img>
            <div className="ppt-card">
              {/* PPT Preview */}
              <div className="ppt-preview">
                <img src={pptLogo} alt="PPT Icon" className="ppt-icon" />
                <span className="ppt-name">{selectedFile ? selectedFile.name : selectedReportIndex}</span>
              </div>

              {/* Actions */}
              <div className="ppt-actions">
                <div className="action-button">
                  <FaRedo size={14} />
                  <span>Regenerate response</span>
                </div>

                <div className="action-icons">
                  <a rel="noopener noreferrer">
                    <FaExternalLinkAlt onClick={() => { handlepreview() }} size={16} />
                  </a>
                  <a download>
                    <FaDownload onClick={() => { handleDownloadPPT() }} size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </Box>) : isGenerating ? (
          <div className="app-loading-overlay">
            <div className="app-loader" />
            <div className="app-loading-text">Uploading & Processing... Please wait</div>
          </div>
        ) : (
          <div className="ppt-instructions">
            {!loader ? (
              <>
                <img src={pptimage} alt="PPT Icon" className="ppt-icon" />
                <p>Step 1: Upload your annual report or select from pre-uploaded reports</p>
                <p>Step 2: Enter the company’s ticker symbol (Optional)</p>
                <p>Step 3: Describe your expectations in a prompt and press Enter to generate the PowerPoint</p>
              </>
            ) : (
              <div className="loader-container">
                <div className="app-loader" />
              </div>
            )}
          </div>
        )}


        <div className="d-flex justify-content-center align-items-center">
          <div className="padding rounded" style={{ backgroundColor: '#f1f5fb', minWidth: '80%', maxWidth: '800px' }}>
            <div className="row fontsize align-items-center">

              {/* Left side - Upload Buttons */}
              <div className="col-md-8 mb-3 mb-md-0 dflex">
                <span className="aligncontent">Upload your Annual Report to get started</span>
                {/* <input type="file" onChange={handleFileChange} /> */}
                {!uploaddisable && selectedpreupload ? <button className=" button mx-2" onClick={triggerFileInputClick}>Browse Files</button> : ""}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {selectedFile && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="mx-2 marginbottom">{selectedFile.name}</span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => deletefile()}
                    />
                  </div>
                )}

                {!selectedpreupload ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="mx-2 marginbottom">{selectedReportIndex}</span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => deletefile1()}
                    />
                  </div>
                ) : ""}
                {/* {selectedFile && <p className="mx-2 marginbottom"> - {selectedFile.name}</p>} */}
                {!uploaddisable && selectedpreupload ? <><span className=" aligncontent mx-2">or </span><button className="aligncontent buttondesign" onClick={() => {
                  setDrawerOpen(true);
                  handleUpload();
                }}>Use Pre-uploaded Reports</button></> : ""}

              </div>

              {/* Right side - Ticker Input */}
              <div className="col-md-4">
                <label htmlFor="ticker" className="form-label">
                  Enter Ticker of the Company <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="ticker"
                  className="form-control fontsize14"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                // value={ticker}
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
          {/* <input
            type="text"
            placeholder="Enter Prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="Enter Prompt here"
            value={prompt}
            onChange={(e) => handleChange(e.target.value)}
            className="prompt-input1"
          />
          {promptError && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {promptError}
            </div>
          )}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>

            {/* Left side - Suggestions */}
            <div className="d-flex align-items-center gap-2 text-primary" style={{ cursor: 'pointer' }}>
              <img src={lighticon} alt="Get Suggestions" style={{ width: '14px', height: '14px' }} />
              <span style={{ fontSize: '14px' }} onClick={() => {
                setDrawerOpensuggestions(true);
              }}>Get Suggestions</span>
            </div>

            {/* Right side - Mic and Send */}
            <div className="d-flex align-items-center gap-3">
              <FontAwesomeIcon icon={faMicrophone} size="lg" color="#0047AB" style={{ cursor: 'pointer' }} />
              {!uploaddone ? <FontAwesomeIcon icon={faPaperPlane} size="lg" color="#0047AB" style={{ cursor: 'pointer' }} onClick={() => { handlepromptupload() }} /> : <FontAwesomeIcon icon={faPaperPlane} size="lg" color="#0047AB" style={{ cursor: 'pointer' }} onClick={() => { handleafterupload() }} />}
              {/* <FontAwesomeIcon icon={faPaperPlane} size="lg" color="#0047AB" style={{ cursor: 'pointer' }} onClick={() => {handlepromptupload()}} /> */}
            </div>
          </div>

        </div>


      </div>
      {drawerOpen && (
        <>
          {/* Overlay */}
          <div className="backdrop-overlay" onClick={() => setDrawerOpen(false)} />

          {/* Sidebar */}
          <div className="custom-sidebar">
            <div className="custom-sidebar-header">
              <Typography className="colorchange" variant="h9"><FaRegFileAlt className="marginright" />Pre-uploaded Reports</Typography>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {reports.length === 0 ? <div className="app-loader margin44" /> : reports.map((report, index) => (


                <ListItem
                  key={index}
                  button
                  selected={index === selectedReportIndex}
                  onClick={() => selectedpreuplpad(report)}
                >
                  <ListItemText primary={report} />
                  {/* {index === selectedReportIndex && (
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )} */}
                </ListItem>
              ))}

            </List>
          </div>
        </>
      )}
      {drawerOpensuggestion && (
        <>
          {/* Overlay */}
          <div className="backdrop-overlay" onClick={() => setDrawerOpensuggestions(false)} />

          {/* Sidebar */}
          <div className="custom-sidebar">
            <div className="custom-sidebar-header">
              <Typography className="colorchange" variant="h9"><FaRegFileAlt className="marginright" />Prompt Suggestions</Typography>
              <IconButton onClick={() => setDrawerOpensuggestions(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {reports1.map((report, index) => (


                <ListItem
                  key={index}
                  button
                // selected={index === selectedReport1Index}
                // onClick={() => selectedpreuplpad(report)}
                >
                  <ListItemText primary={report} />
                  {/* {index === selectedReportIndex && (
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )} */}
                </ListItem>
              ))}
            </List>
          </div>
        </>
      )}
      {preview && (
        <PDFPreview
          file={pdfBase64} // Use Base64 or blob URL if dynamic
          onClose={() => setpreview(false)}
          onSaveModifications={handleSlideModifications}
        />
      )}


    </div>

  );
};

export default PPTGenerator;