const express=require('express');
const app=express();

app.route("/", (req,res){
	
}
app.use("/api/notes", (req, res, next) => {
const notes = [
{
id: "gergrgerg",
title:"First note",
content:"First content"
},
{
id: "fblkdfopr",
title:"Second note",
content:"Second content"
}
];
res.json({
message: 'Notes fetched successfully!',
notes: notes
});
});