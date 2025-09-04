import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const createNote: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteNote: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getNotes: (req: AuthRequest, res: Response) => Promise<void>;
export {};
