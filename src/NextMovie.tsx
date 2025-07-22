type NextMovieButtonProps = {
  onNext: () => void;
};

export default function NextMovieButton({ onNext }: NextMovieButtonProps) {
  return (
    <button onClick={onNext} className="next-movie-btn">
      🔄 Next Movie
    </button>
  );
}
