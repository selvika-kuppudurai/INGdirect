
import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";
import "./style.scss"
import UploadSection from '../../components/UploadSection';
import PPTGenerator from '../PPTGenerator';
import SQLRetriever from '../SQLRetriever/SQLRetriever';

function Home() {
  const [isopenPPTgenerator, setopenPPTgenerator] = useState(true)
  const [isopensqlgenerator, setopensqlgenerator] = useState()
  const [isopenpromptgenerator, setopenPromptgenerator] = useState()

  const Pptgenerator = () => {
    setopenPPTgenerator(true)
    setopensqlgenerator(false)
    setopenPromptgenerator(false)
  }

  const Sqlgenerator = () => {
    setopenPPTgenerator(false)
    setopensqlgenerator(true)
    setopenPromptgenerator(false)

  }

  const Promptgenerator = () => {
    setopenPPTgenerator(false)
    setopensqlgenerator(false)
    setopenPromptgenerator(true)
  }

  //   useEffect(() => {
  //   setopenPPTgenerator(true);
  // }, []);
  return (
    <div className="container-fluid">
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ backgroundColor: "#EAEFF8", width: "50px", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1%" }}>
          <CiCirclePlus style={{ width: "22px", height: "22px", color: "#a9a9a9" }} />
          <TbLayoutSidebarLeftCollapse style={{ color: "#a9a9a9", marginTop: "25px" }} />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              margin: "1rem"
            }}
          >
            <div className='tabdesign' style={{ border: isopenPPTgenerator ? "2px solid #1C57AB" : "2px solid #E5E7EB", backgroundColor: isopenPPTgenerator ? "#F6FAFE" : "", boxShadow: isopenPPTgenerator ? "1px 1px 4px 0px #00000040" : "" }} onClick={() => Pptgenerator()}>
              <img className="imagedesign" src={card3} alt="ppt" />
              <div>
                <p className='headerdesign'>PPT Generator</p>
                <p className='textdesign'>Turn reports into polished presentations in seconds</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className='tabdesign' style={{ border: isopensqlgenerator ? "2px solid #1C57AB" : "2px solid #E5E7EB", backgroundColor: isopensqlgenerator ? "#F6FAFE" : "", boxShadow: isopensqlgenerator ? "1px 1px 4px 0px #00000040" : "" }} onClick={() => Sqlgenerator()}>
              <img className="imagedesign" src={card2} alt="sql" />
              <div>
                <p className='headerdesign'>SQL Retriever</p>
                <p className='textdesign'>Generate SQL queries instantly from natural language prompts</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className='tabdesign' style={{ border: isopenpromptgenerator ? "2px solid #1C57AB" : "2px solid #E5E7EB", backgroundColor: isopenpromptgenerator ? "#F6FAFE" : "", boxShadow: isopenpromptgenerator ? "1px 1px 4px 0px #00000040" : "" }} onClick={() => Promptgenerator()}>
              <img src={card1} className="imagedesign" alt="prompt" />
              <div>
                <p className='headerdesign'>Prompt Maker</p>
                <p className='textdesign'>Craft smart prompts effortlessly to get the insights you need</p>
              </div>
            </div>

          </div>
          <div className="borderline" > </div>

          {isopenPPTgenerator &&
            <PPTGenerator />
          }

          {isopensqlgenerator &&
            <SQLRetriever />
          }

        </div>


      </div>
    </div>
  );
}

export default Home;
