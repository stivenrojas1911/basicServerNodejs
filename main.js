const express = require("express");
const appServer=express();
const path = require("path");
const morgan=require("morgan");
const static =require ("static");

const bodyParser =require ("body-parser")





// Settings ----CONGIGURACIONES INCIALES******************.

appServer.set('port', process.env.port||3000)
appServer.set(path.join(__dirname, 'views')) //usa la dependencia path para unir rutas con el método join. 
// Con esto se le esta diciendo a node en donde se encuentran las vistas.(__dirname es el directorio actual)
appServer.set('view engine','ejs') //configuración del motor del motor de plantillas. 
appServer.set('appName','basic serve')

// ***********************Middlewares***********************

appServer.use((req,res,next)=>{

    // req es todo lo que el navegador esta enviando. 
    // res es todo lo que se le devuelve al navegador. 
    console.log(`urlRequerida:${req.url} - métodoRequerido:${req.method}`);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    //se incorporan las cabeceras cors en las respuestas de http 
    
})

appServer.use(morgan('combined'))//usa morgan
 //usa las rutas definidas en la carpeta routes/index.js
 
//; //Body parser sirve para entender lo que se nos 
//envía desde el 
appServer.use(bodyParser.urlencoded({extended:true}))
appServer.use(bodyParser.json())
 


// ************************static files*******************


appServer.use(express.static(path.join(__dirname,'public')));
appServer.use('/index/public',express.static(path.join(__dirname,'public')));
appServer.use('/public/post',express.static(path.join(__dirname,'public/public_post')));
appServer.use('/public/get',express.static(path.join(__dirname,'public/public_get')));

/** setting endpoints */
appServer.get('/user', (req, res) =>{

setTimeout(()=>{

    res.status(200).json({
        data:[{fact:'The cat is so cute 🐱',length:100}, {fact:'CR7 is the best 🏆',length:100}],
        result:true
  
      })


}, 2000)
   
})

//*********************When not find the file ************************ */




appServer.get('*',function(req,res){
     
    res.status(404).json({
        data:null,
        result:true,
        msg:'Service not found 😎'
  
      })
   })


//************set up the endpoint *******/



// *******************start the server***********


appServer.listen(appServer.get('port'),()=>{// con esta función 
    console.log(`listened on port ${appServer.get('port')}  + ${appServer.get('appName')}`)
})
