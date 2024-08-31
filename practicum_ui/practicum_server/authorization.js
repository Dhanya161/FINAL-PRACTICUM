import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {
  const headers = req.headers;
  
  
  const cookie = req.cookies?.jwtToken; 
  const accessToken = cookie? cookie : headers?.authorization && headers.authorization.split(' ')[1];
  
  accessToken
    ? jwt.verify(accessToken, process.env.JWT_SECRET, (err, jwtUser) => {
        try {
          if (err) {
            res.status(401).json("unauthorized");
          } else {
            
            req.jwtUser = jwtUser;
            next();
          }
        } catch (error) {
          next(error);
        }
      })
    : res.status(401).json("unauthorized");
};

export default authorization;