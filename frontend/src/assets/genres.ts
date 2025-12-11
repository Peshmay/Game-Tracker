export type GameItem = {
  id: number;
  slug: string;
  name: string;
  added?: number;
  image?: string;
  comingSoon?: boolean;
  blurb?: string;
};

export type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games: GameItem[];
};

const genres: Genre[] = [
  {
    id: 4,
    name: "Action",
    slug: "action",
    games_count: 177189,
    image_background:
      "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
    games: [
      {
        id: 3498,
        slug: "grand-theft-auto-v",
        name: "Grand Theft Auto V",
        added: 18995,
        comingSoon: true,
        blurb: "High stakes, high speed — rule the city."
      }
    ]
  },
  {
    id: 3,
    name: "Adventure",
    slug: "adventure",
    games_count: 136213,
    image_background:
      "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
    games: [
      {
        id: 4200,
        slug: "portal-2",
        name: "Portal 2",
        added: 16000,
        comingSoon: true,
        blurb: "Mind-bending puzzles in a witty universe."
      }
    ]
  },
  {
    id: 2,
    name: "RPG",
    slug: "role-playing-games-rpg",
    games_count: 53575,
    image_background:
      "https://media.rawg.io/media/games/f6b/f6bed028b02369d4cab548f4f9337e81.jpg",
    games: [
      {
        id: 3328,
        slug: "the-witcher-3-wild-hunt",
        name: "The Witcher 3: Wild Hunt",
        added: 18127,
        comingSoon: false,
        blurb: "Vast open world. Gritty quests. Choices that matter."
      }
    ]
  },
  {
    id: 1,
    name: "Strategy",
    slug: "strategy",
    games_count: 53393,
    image_background:
      "https://media.rawg.io/media/games/40a/40ab95c1639aa1d7ec04d4cd523af6b1.jpg",
    games: [
      {
        id: 13633,
        slug: "civilization-v",
        name: "Sid Meier's Civilization V",
        added: 8490,
        comingSoon: false,
        blurb: "Build an empire to stand the test of time."
      }
    ]
  }
];

export default genres;
