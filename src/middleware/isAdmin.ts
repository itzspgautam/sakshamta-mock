
import Admin from '@/models/AdminSchema';
import { verifyAdminJWT } from '@/utils/jwtUtils';
import { NextApiRequest, NextApiResponse } from 'next';


const isAdmin = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
      // Verify the token
      const decoded=await verifyAdminJWT(token);
      const admin = await Admin.findById(decoded.admin);


      if (!admin) {
        return res.status(403).json({ message: 'User is not authorized to access this resource' });
      }

      (req as any).admin = admin;
      await handler(req, res); // Execute the handler function
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

export default isAdmin;
