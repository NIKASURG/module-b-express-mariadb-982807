require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST || '172.17.51.94',
    user: process.env.DB_USER || '982807',
    password: process.env.DB_PASSWORD || '982807',
    database: process.env.DB_NAME || '982807',
    port: process.env.DB_PORT || '3307',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});





// SITA FORMULE SKIRTA APSKAICIOTI ATSTUMA NAUDOJANT KORDINATES PRASOME NEREDAGUOTI NES AS LABIAU PASITIKIU KASKOKIU CIUVU IS STACKOWERFLOW NEI KAD IR KAS NORI REDAGUOTI
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d ;

}
let neisrusiotas = true
function deg2rad(deg) {
    return deg * (Math.PI/180)
}
// Middleware
app.use(cors());
app.use(express.json());
let obijektaiListPagalAtstuam = []
let sorted = []
const c = []
// Check database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ MySQL connection error:', err);
    } else {
        console.log('✅ MariaDB connected');
        connection.release();
      
    fetch("https://konkursas.kitm.lt/982807/task_addons")
        .then(response => response.json())
        .then(data => {for(let i = 0; i < data.length; i++) {
            // console.log(data[i]);
            // console.log(data[i])
            // console.log(getDistanceFromLatLonInKm(54.8929804,23.924765,data[i].latitude,data[i].longitude))
            





            //



            // IVVESKITE SAVO KORDINATES AUTOMATINIS KORDINACIU PAEMIMAS VIS DAR DAROMAS 🚧🚧🚧🚧 PLANUOJAMA DARBU PABAIGA 2040 kovo 2 18:43     
            latitude=  54.89699349813067
            longitude =  23.918543468384733


            

            obijektaiListPagalAtstuam.push(  {  atstumas: Math.floor( getDistanceFromLatLonInKm( latitude,longitude,data[i].latitude,data[i].longitude)   *100)/100, tekstas:  ' Km iki '+ data[i].name + ' nuo jusu'})
            

            // console.log(obijektaiListPagalAtstuam[i].split(" "))
             

            
        }

       
        obijektaiListPagalAtstuam.sort((a, b) => a.atstumas - b.atstumas)
        for (let i = 0; i < obijektaiListPagalAtstuam.length; i++) {
        console.log(obijektaiListPagalAtstuam[i].atstumas + obijektaiListPagalAtstuam[i].tekstas)

        }
        // console.log(c)
        })
        .catch(error => console.error("Network error:", error));
    }
    
});

// Welcome Route
app.get('/', (req, res) => {
    res.send('🚀 Welcome to the Competition WEB <dev> Challenge 2025 Node.js template!!!!!!!!!!!!!!!!!!!!!');
});


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
