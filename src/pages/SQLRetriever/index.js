import React, { useState, useEffect } from "react";
import "./style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateForward, faDatabase } from "@fortawesome/free-solid-svg-icons";

const SQLRetriever = () => {
    const [prompt, setPrompt] = useState("");
    const [activeTab, setActiveTab] = useState("sql");
    const [generatedSQL, setGeneratedSQL] = useState("");
    const [queryResult, setQueryResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerateSQL = async () => {
    };

    return (
        <>
            <div className="ppt-container">
                <div className="app-container">
                    <div className="row">
                        <div className="col">
                            <div className="ppt-box">
                                <h1 className="ppt-title">SQL Retriever</h1>
                            </div>
                        </div>
                        <div className="col d-flex">
                            <div className="tabs">
                                <div
                                    className={`tab ppt-title ${activeTab === 'sql' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('sql')}
                                >
                                    SQL Query
                                </div>
                                <div
                                    className={`tab ppt-title ${activeTab === 'columns' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('columns')}
                                >
                                    Data Columns
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row content">
                        <div className="col left-panel">
                            <input
                                className="prompt-input"
                                placeholder="Enter Prompt here"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>

                        <div className="col right-panel">
                            <div className="placeholder-style">
                                <p>
                                    <FontAwesomeIcon icon={faDatabase} size="3x" style={{ color: '#8a8a8a' }} />
                                </p>
                                <p>Step 1: Enter the Prompt.</p>
                                <p>
                                    Step 2: Press Generate SQL button and you will be able to see the
                                    generated SQL here
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-flex mt-4" style={{ marginLeft: '16rem' }}>
                            <button className="btn-style">
                                <FontAwesomeIcon icon={faRotateForward} />
                                <span className="buttonLabelCard" onClick={() => handleGenerateSQL()}>Generate SQL</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SQLRetriever;