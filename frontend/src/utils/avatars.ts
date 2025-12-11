const avatars = [
  "/avatars/fox.png",
  "/avatars/cat.png",
  "/avatars/dog.png",
  "/avatars/alien.png",
  "/avatars/robot.png"
];

export function getAvatarForUser(id: number | string) {
  const idx = Math.abs(
    Array.from(String(id)).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  ) % avatars.length;
  return avatars[idx];
}
