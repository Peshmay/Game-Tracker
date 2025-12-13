export const defaultAvatars = [
  "/avatars/fox.png",
  "/avatars/wolf.png",
  "/avatars/cat.png",
  "/avatars/bear.png",
  "/avatars/rabbit.png",
  "/avatars/tiger.png",
  "/avatars/owl.png",
  "/avatars/dragon.png",
  "/avatars/snake.png",
  "/avatars/frog.png",
];

export function pickRandomAvatar() {
  return defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
}
