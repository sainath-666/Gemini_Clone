import React, { useContext, useRef, useEffect } from "react";
import "./Main.css"; // Assuming you have a CSS file for styling
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    error,
  } = useContext(Context);
  const inputRef = useRef();

  useEffect(() => {
    if (!showResult && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showResult]);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {error && <div className="error-message">{error}</div>}
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, User!</span>
              </p>
              <p>How can I assist you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip.</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning.</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat.</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              ref={inputRef}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt here"
              disabled={loading}
              autoFocus
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery" tabIndex={0} aria-label="Open gallery" className="interactive-icon" />
              <img src={assets.mic_icon} alt="Mic" tabIndex={0} aria-label="Start voice input" className="interactive-icon" />
              {input ? (
                <img
                  onClick={() => !loading && onSent()}
                  src={assets.send_icon}
                  alt="Send"
                  style={{ opacity: loading ? 0.5 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                  tabIndex={0}
                  aria-label="Send prompt"
                  className="interactive-icon"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
