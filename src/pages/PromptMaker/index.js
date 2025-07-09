import React, { useState, useEffect } from "react";
import "./style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateForward, faDatabase, faTrash } from "@fortawesome/free-solid-svg-icons";

const PromptMaker = () => {

    return (
        <>
            <div className="ppt-container">
                <div className="app-container">
                    <div className="row">
                        <div className="col" style={{ margin: '0', padding: '0'}}>
                            <div className="ppt-box">
                                <h1 className="ppt-title">Prompt Maker</h1>
                            </div>
                        </div>
                        <div className="col d-flex">
                            <div className="ppt-box">
                                <h1 className="right-panel-header ">Generated Prompts</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PromptMaker;