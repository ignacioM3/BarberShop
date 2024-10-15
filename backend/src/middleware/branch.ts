import {NextFunction, Request, Response} from 'express'
import Branch, { IBranch } from '../models/Branch';


declare global{
    namespace Express{
        interface Request{
            branch: IBranch
        }
    }
}

export async function BranchExists(req: Request, res: Response,  next:NextFunction){
try {
    const {branchId} = req.params;
    const branch = await Branch.findById(branchId);

    if(!branch){
        const error = new Error('Local no encontrado');
        return res.status(401).json({error: error.message});
    }
    req.branch = branch;
    next();

} catch (error) {
    res.status(500).json({error: 'Hubo un Error con el local'})
}
}