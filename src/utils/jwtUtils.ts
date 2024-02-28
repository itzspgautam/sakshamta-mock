import { AdminInterface } from "@/interface/AdminInterface";
import { CandidateInterface } from "@/interface/CandidateInterface";
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateAdminJWT = (admin: AdminInterface): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      jwt.sign(
        { admin: admin?._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "60d" },
        (err:any, token:string) => {
          if (err) {
            reject(err);
          } else {
            resolve(token as string);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const verifyAdminJWT = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err:any, decoded:any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
};

export const destroyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err:any, decoded:any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
};



export const generateCandidateJWT = (candidate: CandidateInterface): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      jwt.sign(
        { candidate: candidate?._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "60d" },
        (err:any, token:string) => {
          if (err) {
            reject(err);
          } else {
            resolve(token as string);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const verifyCandidateJWT = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err:any, decoded:any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
};
