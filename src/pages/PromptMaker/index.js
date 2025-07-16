import React, { useState, useEffect } from "react";
import "./style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateForward, faWandMagicSparkles, faTrash, faClipboard } from "@fortawesome/free-solid-svg-icons";

const PromptMaker = () => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const promptMaker = process.env.REACT_APP_API_PROMPT_MAKER;

    const [microPrompts, setMicroPrompts] = useState(['', '']);
    const [generatedPrompts, setGeneratedPrompts] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleChange = (index, value) => {
        const updatedPrompts = [...microPrompts];
        updatedPrompts[index] = value;
        setMicroPrompts(updatedPrompts);
    };

    const addMicroPrompt = () => {
        setMicroPrompts([...microPrompts, '']);
    };

    const removeMicroPrompt = (index) => {
        const updatedPrompts = microPrompts.filter((_, i) => i !== index);
        setMicroPrompts(updatedPrompts);
    };

    const handleGeneratePrompts = async () => {
        if (microPrompts && microPrompts.length > 0) {
            setLoading(true);
            const req = [
                // "What are the risks from the annual report?",
                // "Summarize revenue and profit trends.",
                // "Explain changes in market share."
            ]
            try {
                const response = await fetch(`${baseUrl}${promptMaker}`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true
                    },
                    body: JSON.stringify({ "prompts": microPrompts }),
                });

                if (!response.ok) throw new Error("Failed to generate Prompts");

                const result = await response.json();
                setGeneratedPrompts(result.refined_prompt || "");
                setMicroPrompts(['', ''])
            } catch (error) {
                console.error("Error in prompt upload:", error);
                alert("Failed to generate Prompts");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCopy = () => {
        if (generatedPrompts) {
          navigator.clipboard.writeText(generatedPrompts);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }
      };

    return (
        <>
            <div className="ppt-container">
                <div className="app-container">
                    <div className="row content" style={{ fontSize: '13px' }}>
                        <div className="col-md-6 col-sm-12" style={{ height: '' }}>
                            <div className="ppt-box">
                                <h1 className="ppt-title">Prompt Maker</h1>
                            </div>
                            <div className="left-panel" style={{ overflowY: 'auto' }}>
                                {microPrompts.map((prompt, index) => (
                                    <div key={index} style={{ marginBottom: '1rem', position: 'relative' }}>
                                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                                            Micro Prompt {index + 1}
                                        </label>
                                        <input
                                            type="text"
                                            className="micro-prompts-input"
                                            placeholder="Enter Micro Prompt here"
                                            value={prompt}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                        />
                                        {microPrompts.length > 1 && (
                                            <FontAwesomeIcon
                                                className="icon-delete"
                                                icon={faTrash}
                                                onClick={() => removeMicroPrompt(index)}
                                            />
                                        )}

                                    </div>
                                ))}
                                <button onClick={addMicroPrompt} className="btn-micro-prompt">
                                    Add Micro Prompt
                                </button>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12" style={{ height: '' }}>
                            <div className="ppt-box">
                                <h1 className="ppt-title">Generated Prompts</h1>
                            </div>
                            <div className="right-panel">
                                <div style={{ padding: '1rem' }}>
                                    {loading ? (
                                        <div className="prompt-tab-content">
                                            <div className="spinner-container">
                                                <div className="spinner"></div>
                                                <p>Generating Prompts...</p>
                                            </div>
                                        </div>
                                    ) : generatedPrompts ? (
                                        <div className="generated-prompt-container">
                                            <pre className="generated-prompt-box" >{generatedPrompts}</pre>

                                            <div className="copy-icon-container" onClick={handleCopy}>
                                                <FontAwesomeIcon icon={faClipboard} className="copy-icon" />
                                                {copied && <div className="tooltip-copied">Copied</div>}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="placeholder-container">
                                            <div className="placeholder-style">
                                                <p><FontAwesomeIcon
                                                    icon={faWandMagicSparkles}
                                                    size="3x"
                                                    style={{ color: '#8a8a8a' }}
                                                />
                                                </p>
                                                <p style={{ marginBottom: '0.2rem' }}>Step 1: Enter the Micro-Prompts.</p>
                                                <p style={{ marginTop: '0px', marginBottom: '0.2rem' }}>Step 2: Add as many Micro-Prompts to get better results.</p>
                                                <p style={{ marginTop: '0px' }}>Step 3: Press Generate Prompts button and you will be able to see the generated prompts here.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex mt-2 btn-div">
                            <button className="btn-style" style={{ width: '9.5rem' }} onClick={handleGeneratePrompts}>
                                <FontAwesomeIcon icon={faRotateForward} />
                                <span className="buttonLabelCard" >Generate Prompts</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PromptMaker;