
const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject('Invalid token');
            } else {
                resolve({ id: decoded.id, username: decoded.username });
            }
        });
    });
  };
  
  module.exports = { verifyToken };
  