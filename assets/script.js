// 696646672dc39fefaf604c403e03813a API KEY

fetch (`https://api.openweathermap.org/data/2.5/weather?q=${"Chicago"}&appid=${"696646672dc39fefaf604c403e03813a"}`)
.then (function (res){
    console.log(res)
    return res.json()

}) 
.then (function (data){
    console.log(data)
})