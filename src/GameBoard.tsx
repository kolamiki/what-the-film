import { useEffect, useState } from "react";

import { getRandomPoster, checkGuess } from "./requests/film/getOrCheckPoster";

import PosterImage from "./PosterImage";
import GuessInput from "./GuessInput";

import "./GameBoard.css";
import { Counter } from "./Counter";
import NextMovieButton from "./NextMovie";
import { motion, AnimatePresence } from "framer-motion";

type GameBoardProps = {
  apiOrigin: string;
};

export default function GameBoard({ apiOrigin }: GameBoardProps) {
  const [poster, setPoster] = useState<any>(null);
  const [blur, setBlur] = useState<number>(40);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState<number>(20);
  // const [stopTimer, setStopTimer] = useState<boolean>(false);

  useEffect(() => {
    fetchNewPoster();
  }, [apiOrigin]);

  useEffect(() => {
    // Set 1 s interval
    const interval = setInterval(() => {
      setTimer((prev) => {
        console.log("game over", gameOver);
        if (prev > 0 && !gameOver) {
          setBlur((currentBlur) => Math.max(0, currentBlur - 1.5));
          return prev - 1; // Subtract timer by 1
        } else if (gameOver) {
          clearInterval(interval);
          return prev;
        } else {
          clearInterval(interval); // STop counter
          return 0;
        }
      });
    }, 1000);

    // Clear interval after unmount
    return () => clearInterval(interval);
  }, [gameOver]);

  const fetchNewPoster = async () => {
    try {
      const newPoster = await getRandomPoster(apiOrigin);
      setPoster(newPoster);
      setBlur(40);
      setTimer(20);
      setGameOver(false); // 👈 RESET gameOver
    } catch (err) {
      console.error("Failed to load poster:", err);
      alert("Could not fetch a new movie poster.");
    }
  };

  const handleGuess = async (guess: string) => {
    try {
      const result = await checkGuess(apiOrigin, poster.id, guess);
      if (result.correct_answer) {
        alert("🎉 Correct! " + poster.title);
        setBlur(0);
        setGameOver(() => true);
      }
      // else {
      //   setBlur(Math.max(0, blur - 4));
      // }
    } catch (err) {
      console.error("Failed to check guess:", err);
      alert("Something went wrong while checking your guess.");
    }
  };
  const handleOnSkip = () => {
    setGameOver(() => true);
    setBlur(0);
  };
  if (!poster) return <div>Loading...</div>;
  console.log("Current game status", gameOver);

  return (
    <div className="game-board-position">
      <Counter timer={timer} />
      <AnimatePresence mode="wait">
        {poster && (
          <motion.div
            key={poster.id} // zmiana key wymusza animację
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PosterImage url={poster.image_url} blur={blur} />
          </motion.div>
        )}
      </AnimatePresence>

      {!gameOver ? (
        <GuessInput
          apiOrigin={apiOrigin}
          onGuess={handleGuess}
          handleOnSkip={handleOnSkip}
        />
      ) : (
        <NextMovieButton onNext={fetchNewPoster} />
      )}
    </div>
  );
}
