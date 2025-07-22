import { createContext, useContext, useState } from "react";

const StoreScoreContext = createContext();

function StoreScoreProvider({ children }) {
  //
  const [userScore, setUserScore] = useState<number>(0);

  return (
    <StoreScoreContext.Provider value={{ userScore, setUserScore }}>
      {children}
    </StoreScoreContext.Provider>
  );
}

function useStoreScore() {
  const context = useContext(StoreScoreContext);

  if (context === undefined) {
    throw new Error(
      "StoreScoreContext was used outside the StoreScoreProvider"
    );
  }
  return context;
}

export { StoreScoreProvider, useStoreScore };
