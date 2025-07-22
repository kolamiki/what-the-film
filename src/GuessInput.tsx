import { useState, type Dispatch, type SetStateAction } from "react";
import { AutoComplete } from "primereact/autocomplete";

import "./GuessInput.css";
import { getMovieTitleSuggestion } from "./requests/film/getOrCheckPoster";

type GuessInputType = {
  apiOrigin: string;
  onGuess: (guess: string) => void;
  handleOnSkip: () => void;
};

export default function GuessInput({
  apiOrigin,
  onGuess,
  handleOnSkip,
}: GuessInputType) {
  const [value, setValue] = useState("");
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);

  //****  MIDDLEWARES */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuess(value);
    setValue("");
  };

  const searchMovieTitles = async (e: { query: string }) => {
    // Function used by
    const query = e.query;

    if (query.length > 2) {
      try {
        const response = await getMovieTitleSuggestion(apiOrigin, query);

        setTitleSuggestions(response.suggestions);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      }
    } else {
      setTitleSuggestions([]);
    }
  };

  return (
    <div className="input-and-skip">
      <form onSubmit={handleSubmit} className="input-and-button-row">
        <AutoComplete
          value={value}
          onChange={(e) => setValue(e.value)} // e.value zawiera wybraną wartość
          suggestions={titleSuggestions}
          completeMethod={searchMovieTitles} // Primereact woła to przy wpisywaniu
          placeholder="Guess the movie..."
          className="guess-input-field"
        />
        <button className="guess-button">Guess</button>
      </form>
      <button className="skip-button" onClick={handleOnSkip}>
        Skip ➡️
      </button>
    </div>
  );
}
