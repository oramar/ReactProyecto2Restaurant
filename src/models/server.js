const express = require('express')
class Server{
    constructor(){
        this.app=express()
        this.port = process.env.PORT || 8005
    }
    lister(){
        this.app.listen(this.port,()=>{
            console.log(`Server is running on port ${this.port}`)
        })
    }
}
module.exports = Server