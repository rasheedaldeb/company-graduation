import { useState, createContext } from "react";
const StatesContext = createContext();
const StatesProvider = ({ children }) => {
  const [type, setType] = useState("house");
  const [status, setStatus] = useState("waiting");
  const [createdPost, setCreatedPost] = useState(false);
  return (
    <StatesContext.Provider
      value={{ type, setType, createdPost, setCreatedPost, status, setStatus }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesContext, StatesProvider };
