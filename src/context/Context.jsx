import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvided = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [error, setError] = useState(""); // Add error state

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };


  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setError(""); // Reset error
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    try {
      if (prompt !== undefined) {
        response = await runChat(prompt);
        setRecentPrompt(prompt)
      }
      else {
        setPrevPrompts(prev => [...prev, input])
        setRecentPrompt(input)
        response = await runChat(input)
      }
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      let newRespomseArray = newResponse2.split(" ");
      for (let i = 0; i < newRespomseArray.length; i++) {
        const nextWord = newRespomseArray[i];
        delayPara(i, nextWord + " ");
      }
      setLoading(false);
      setInput("");
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    error,
    setError
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvided;
