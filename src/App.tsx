import "./App.css";
import { StoreScoreProvider } from "./context/ScoreProvider";
import GameBoard from "./GameBoard";

type AppProps = {
  apiOrigin: string;
};

export function App({ apiOrigin }: AppProps) {
  return (
    <div className="app-position">
      <StoreScoreProvider>
        <GameBoard apiOrigin={apiOrigin} />
      </StoreScoreProvider>
    </div>
  );
}
