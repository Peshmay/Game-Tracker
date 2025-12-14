import { Request, Response, NextFunction } from "express";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = auth.slice("Bearer ".length).trim();

  // ✅ temporary validation (later: Firebase/JWT verification)
  if (process.env.NODE_ENV === "test") {
    if (token === "test-token" || token === "admin-token") return next();
    return res.status(401).json({ message: "Invalid token" });
  }

  // For now in dev, accept anything (or tighten it if you want)
  return next();
}
