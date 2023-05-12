module.exports = async (bot, thread) => {
    try {
        if(thread.joinable) await thread.join();
        
    } catch(e) {
        console.log(e)
    }
}