import { addcomment, addvideobyChannel, createChannel, deletecomment, deletevideobychannel, editcomment, getvediobychannel, homepagevedio, loginuser, registeruser, updatelikebyvedio, updatesubscriber, vediobycategory, vediobyid,allchannel } from "../Controller/youtube.controller.js"

function routes(app){
app.get("/api/homepagevedio",homepagevedio);
app.get("/api/vediobycategory/:categoryid",vediobycategory);
app.get("/api/video/:videoid",vediobyid);
app.get("/api/vediobychannel/:id",getvediobychannel);
app.post("/api/addvediobychannel",addvideobyChannel)
app.delete("/api/deletevediobychannel/:channelid",deletevideobychannel)
app.put("/api/updatelikebyvedio",updatelikebyvedio);
app.post("/api/createchannel",createChannel);
app.post("/api/registeruser",registeruser);
app.post("/api/loginuser",loginuser);
app.post("/api/addcomment",addcomment)
app.put("/api/updatecomment",editcomment);
app.delete("/api/deletecomment",deletecomment)
app.post("/api/updatesubsciber",updatesubscriber)
app.get('/api/channels/:userid',allchannel)
}
export default  routes