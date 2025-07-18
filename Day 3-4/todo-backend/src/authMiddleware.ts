import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
        const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);
        (req as any).user = payload;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}
