import "./PosterImage.css";

export default function PosterImage({
  url,
  blur,
}: {
  url: string;
  blur: number;
}) {
  return (
    <div className="poster-position">
      <div
        className="blur-boundaries"
        style={{
          boxShadow: `0 0 ${blur * 1.5}px ${blur * 0.5}px rgba(0,0,0,0.5)`,
        }}
      >
        <img
          className="poster-image"
          src={url}
          alt="test-image"
          style={{
            filter: `blur(${blur}px)`,
          }}
        />
      </div>
    </div>
  );
}
