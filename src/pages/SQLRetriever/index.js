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

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const sqlGenerator = process.env.REACT_APP_API_SQL_RETRIEVER;

    const handleGenerateSQL = async () => {
        setActiveTab('sql');
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}${sqlGenerator}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
                body: JSON.stringify(
                    { user_question: prompt }
                ),
            });

            if (!response.ok) throw new Error("Failed to generate SQL");

            const result = await response.json();
            setGeneratedSQL(result.generated_sql || "");
            setQueryResult(result.result || []);
        } catch (error) {
            console.error("Error in prompt upload:", error);
            alert("Failed to generate SQL");
        } finally {
            setLoading(false);
        }
    };
    console.log('queryResult', queryResult)
    return (
        <>
            <div className="ppt-container">
                <div className="app-container">
                    <div className="row content">
                        <div className="col-md-6 col-sm-12" style={{ height: '' }}>
                            <div className="ppt-box">
                                <h1 className="ppt-title">SQL Retriever</h1>
                            </div>
                            <div className="left-panel">
                                <textarea
                                    type="text"
                                    className="prompt-input"
                                    rows={10}
                                    placeholder="Enter Prompt here"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12" style={{ height: '' }}>
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
                            <div className="col right-panel">
                                {activeTab === 'sql' ? (
                                    <div className="" style={{ padding: '0 1rem' }}>
                                        {loading ? (
                                            <div className="sql-tab-content">
                                                <div className="spinner-container">
                                                    <div className="spinner"></div>
                                                    <p>Generating SQL...</p>
                                                </div>
                                            </div>
                                        ) : generatedSQL ? (
                                            <pre className="generated-sql-box">{generatedSQL}</pre>
                                        ) : (
                                            <div className="placeholder-container">
                                                <div className="placeholder-style">
                                                    <p><FontAwesomeIcon icon={faDatabase} size="3x" style={{ color: '#8a8a8a' }} /></p>
                                                    <p style={{ marginBottom: '0.2rem' }}>Step 1: Enter the Prompt.</p>
                                                    <p style={{ marginTop: '0px' }}>Step 2: Press Generate SQL button and you will be able to see the generated SQL here</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    
                                    // activeTab === 'columns' ? (
                                    //     <div className="data-table">
                                    //         {queryResult.length === 0 ? (
                                    //             <div className="placeholder-container">
                                    //                 <div className="placeholder-style">
                                    //                     <p>No data available</p>
                                    //                 </div>
                                    //             </div>
                                    //         ) : (
                                    //             <table>
                                    //                 <thead>
                                    //                     <tr>
                                    //                         {Object.keys(queryResult[0]).map((key) => (
                                    //                             <th key={key}>{key}</th>
                                    //                         ))}
                                    //                     </tr>
                                    //                 </thead>
                                    //             </table>
                                    //         )}

                                    //         {queryResult.length > 0 && (
                                    //             <div className="table-body-scroll">
                                    //                 <table>
                                    //                     <tbody>
                                    //                         {queryResult.map((row, index) => (
                                    //                             <tr key={index}>
                                    //                                 {Object.values(row).map((val, idx) => (
                                    //                                     <td key={idx}>{val}</td>
                                    //                                 ))}
                                    //                             </tr>
                                    //                         ))}
                                    //                     </tbody>
                                    //                 </table>
                                    //             </div>
                                    //         )}
                                    //     </div>
                                    // ) : (
                                    //     <></>
                                    // )

                                    activeTab === 'columns' ? (
                                        <div className="data-table">
                                          {queryResult.length === 0 ? (
                                            <div className="placeholder-container">
                                              <div className="placeholder-style">
                                                <p>No data available</p>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="table-wrapper">
                                              <table>
                                                <thead>
                                                  <tr>
                                                    {Object.keys(queryResult[0]).map((key) => (
                                                      <th key={key}>{key}</th>
                                                    ))}
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {queryResult.map((row, index) => (
                                                    <tr key={index}>
                                                      {Object.values(row).map((val, idx) => (
                                                        <td key={idx}>{val}</td>
                                                      ))}
                                                    </tr>
                                                  ))}
                                                </tbody>
                                              </table>
                                            </div>
                                          )}
                                        </div>
                                      ) : null
                                      
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-flex mt-2 btn-div">
                            <button className="btn-style" onClick={handleGenerateSQL}>
                                <FontAwesomeIcon icon={faRotateForward} />
                                <span className="buttonLabelCard" >Generate SQL</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SQLRetriever;