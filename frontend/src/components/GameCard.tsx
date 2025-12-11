import type { GameItem, Genre } from "../assets/genres";

type Props = {
  genre: Genre;
  game: GameItem;
  onClick?: () => void;
};

export default function GameCard({ genre, game, onClick }: Props) {
  const cover = genre.image_background;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white text-slate-900 rounded-md shadow hover:shadow-lg transition overflow-hidden border border-gray-200"
    >
      <div className="relative">
        <img
          src={cover}
          alt={game.name}
          className="w-full aspect-[16/9] object-cover"
        />
        {game.comingSoon && (
          <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
            Coming Soon
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-extrabold tracking-tight">{game.name}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {game.blurb || "Epic gameplay awaits."}
        </p>
        <div className="mt-3 h-[3px] bg-black/80 w-16" />
      </div>
    </div>
  );
}
