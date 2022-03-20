module.exports = async (client) => {

    process.on('unhandledRejection', err =>{
        if(err) {
            if (err.stack.includes('An invalid token was provided.')) {
                return console.log('Bad token see config.js for set the token')
            } else if (err.stack.includes('Missing Permissions')) {
                return console.log('Permission Error')
            } else {
                return console.log(err.stack)
            }
        }
    });
   
    process.on('uncaughtException', err =>{
        if (err.stack.includes('Promise { <pending> }')) return;
        return console.log(err.stack)
    });
   
    process.on('warning', (err) => {
      console.log(err.stack)
    })
};