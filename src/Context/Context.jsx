import { useState, createContext } from "react";
const StatesContext = createContext();
const StatesProvider = ({ children }) => {
  const [type, setType] = useState("house");
  const [status, setStatus] = useState("pending");
  const [createdPost, setCreatedPost] = useState(false);
  const [deleted, setDeleted] = useState(false);
  return (
    <StatesContext.Provider
      value={{
        type,
        setType,
        createdPost,
        setCreatedPost,
        status,
        setStatus,
        deleted,
        setDeleted,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesContext, StatesProvider };
