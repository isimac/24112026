const express=require("express");
const axios=require("axios");
const app=express();
const PORT=3000;

app.get("/nasa", async(req, res)=>
{
    try
    {
        const odgovor=await axios.get("https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=DEMO_KEY");
        const img = await axios.get(odgovor.data.hdurl, {responseType: "stream"});

    res.setHeader("Content-Type", "image/jpeg");
    // ili res.setHeader("Content-Type", img.headers["content-type"]);
    img.data.pipe(res);
    }
    catch(e)
    {
        res.status(500).send("Ne možemo dohvatiti fotografiju.");
    }
    
});

app.listen(PORT, ()=>
{
    console.log(`Server radi na portu ${PORT}`);
});