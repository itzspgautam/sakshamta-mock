
import Admin from '@/models/AdminSchema';
import Candidate from '@/models/candidate/candidateSchema';
import { verifyAdminJWT, verifyCandidateJWT } from '@/utils/jwtUtils';
import { NextApiRequest, NextApiResponse } from 'next';


const isCandidate = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
      // Verify the token
      const decoded=await verifyCandidateJWT(token);
      console.log(decoded);
      const candidate = await Candidate.findById(decoded.candidate);


      if (!candidate) {
        return res.status(403).json({ message: 'Candidate is not authorized to access this resource' });
      }

      (req as any).candidate = candidate?._id;
      await handler(req, res); // Execute the handler function
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

export default isCandidate;
