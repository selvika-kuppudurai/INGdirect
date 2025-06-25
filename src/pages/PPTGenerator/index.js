import React, { useState, useEffect } from "react";
import "./style.scss";
import pptimage from '../../assets/PPT.png'
import lighticon from '../../assets/Vector.png'

const PPTGenerator = () => {
  const [prompt, setPrompt] = useState("");
  return (
    <div className="ppt-container">
      <div className="ppt-box">
        <h1 className="ppt-title">PPT Generator</h1>
        <div className="ppt-instructions">
          <img src={pptimage} alt="PPT Icon" className="ppt-icon" />
          <p>Step 1: Upload your annual report or select from pre-uploaded reports</p>
          <p>Step 2: Enter the company’s ticker symbol (Optional)</p>
          <p>Step 3: Describe your expectations in a prompt and press Enter to generate the PowerPoint</p>
        </div>

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
        <div className="d-flex justify-content-center align-items-center margintop">
          <div className="p-4 rounded" style={{ backgroundColor: '#f1f5fb', minWidth: '80%', maxWidth: '800px' }}>
            <div className="row fontsize align-items-center">

              {/* Left side - Upload Buttons */}
              <div className="col-md-8 mb-3 mb-md-0 dflex">
                <span className="aligncontent">Upload your Annual Report to get started</span>
                <button className=" button mx-2">Browse Files</button>
                <span className=" aligncontent mx-2" >or </span>
                <button className="aligncontent buttondesign">Use Pre-uploaded Reports</button>
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
          <div className="ppt-prompt-actions d-flex align-items-center gap-2">
            <img src={lighticon} alt="Get suggestions" style={{ width: '12px', height: '12px' }} />
            <button className="sugeestionbutton">Get suggestions</button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default PPTGenerator;