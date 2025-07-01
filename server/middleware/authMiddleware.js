import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    console.error('FATAL ERROR: JWT_SECRET  is not defined in environment variables for authentication middleware.');
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({ message: 'Unauthorized: No token provided or invalid format.' });
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Unauthorized: Token string is missing.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            return res.status(403).json({ message: 'Forbidden: Authentication token has expired. Please log in again.' });
        }

        if(error.name === 'JsonWebTokenError'){
            return res.status(403).json({ message: 'Forbidden: Invalid authentication token. Please log in again.' });
        }

        console.error("Unexpected JWT Verification Error:", error.message);
        return res.status(500).json({ message: 'Internal Server Error: Failed to authenticate token.' });
    }

}


export default authMiddleware;
