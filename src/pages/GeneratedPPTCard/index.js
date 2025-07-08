import React from 'react';
import { Box, Typography, IconButton, Paper, Avatar, Link } from '@mui/material';
import { Replay, OpenInNew, Download } from '@mui/icons-material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './style.scss'
 import { FaRedo, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import pptLogo from "../../assets/logo.png";

const GeneratedPPTCard = () => {
  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
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
            <FaExternalLinkAlt size={16} />
          </a>
          <a href="https://example.com/portfolio.ppt" download>
            <FaDownload size={16} />
          </a>
        </div>
      </div>
    </div>
      </div>
      
    </Box>
  );
};

export default GeneratedPPTCard;