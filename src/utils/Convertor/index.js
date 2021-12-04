var xlsx = require('node-xlsx');
const fs = require('fs');

var obj = xlsx.parse('read.xlsx')[0]; 

let Engjson = {}
let TraditionalChineseJSON = {}
let SimpleChineseJSON = {}

let slug;
for(let i=1;i<obj.data.length;i++){
    if(obj.data[i].length == 4){
        slug = obj.data[i][3]
        if(slug){
            Engjson[slug] = obj.data[i][0]
            SimpleChineseJSON[slug] = obj.data[i][1]
            TraditionalChineseJSON[slug] = obj.data[i][2]
        }
    }
}
let final = {
    "en" : Engjson,
    "hk": TraditionalChineseJSON,
    "cn": SimpleChineseJSON
}
let json = JSON.stringify(final);
fs.writeFile('translation.js', json, 'utf8',(err)=>{
    console.log('Err',err)
    console.log('success')
});
