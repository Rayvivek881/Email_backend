const jwt = require('jsonwebtoken');
const mykey = `ivghvhdhgshbhsdhvbshdjhsdhsdghhsdbjhsdbjhs`

const CreateToken = async (email) =>{
    const token = await jwt.sign({_id: _id, fullname: fullname}, mykey, {
        expiresIn: '3h',
    });
    return token;
}

const VarifyToken = async (token) => {
    let payload;
    try {
        payload = await jwt.verify(token, mykey);
    } catch(err) {
        payload = { }
    }
    return payload;
}
const tokenobj = {
    CreateToken: CreateToken,
    VarifyToken: VarifyToken
}
module.exports = tokenobj;