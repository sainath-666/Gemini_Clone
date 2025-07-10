import React, { useContext, useState } from "react";
import "./Sidebar.css"; // Assuming you have a CSS file for styling
import { assets } from "../../assets/assets"; // Adjust the path as necessary
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={() => setExtended(!extended)} className="menu interactive-icon" src={assets.menu_icon} alt="Menu" tabIndex={0} aria-label="Toggle menu" />
        <div onClick={() => newChat()} className="new-chat interactive-icon" tabIndex={0} aria-label="Start new chat">
          <img src={assets.plus_icon} alt="Plus" />
          {extended ? <p>New chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry interactive-icon" tabIndex={0} aria-label={`Load recent prompt: ${item}`}>
                  <img src={assets.message_icon} alt="Message" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              )
            })}

          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry interactive-icon" tabIndex={0} aria-label="Help">
          <img src={assets.question_icon} alt="Help" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry interactive-icon" tabIndex={0} aria-label="Activity">
          <img src={assets.history_icon} alt="Activity" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry interactive-icon" tabIndex={0} aria-label="Settings">
          <img src={assets.setting_icon} alt="Settings" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
