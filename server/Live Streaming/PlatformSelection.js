import LiveStreaming from "./LiveStreaming.js";
class PlatformSelection{

    static async videoPlatforms(req,res){
        try {
            const {ytKey,fbKey,twitchKey} = req.body
            console.log("This is YtKey  : ",ytKey);
            LiveStreaming.liveStreaming(ytKey,fbKey,twitchKey)

            return res.status(200).json({msg:"Sent the required data"})
        } catch (error) {
            console.log(error);
        }
    }

    static async screenPlatforms(req,res){
        try {
            const {ytKey,fbKey,twitchKey} = req.body
            console.log("This is YtKey  : ",ytKey);
            LiveStreaming.liveStreaming(ytKey,fbKey,twitchKey)

            return res.status(200).json({msg:"Sent the required data"})
        } catch (error) {
            console.log(error);
        }
    }
}

export default PlatformSelection