//Protecion de api ataque bruta
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

//registrar solicitudes http
const morgan = require('morgan');

const initModel = require('./initModels');
const { db } = require('../databases/db');
const globalErrorHandler = require('../controllers/error.controller');
const { routerAuth } = require('../routers/auth.routes');
const { routerRestaurant } = require('../routers/restaurant.routes');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8005;
    this.limiter = rateLimit({
      windowMs: 60 * 60 * 1000, //tiempo 60 minutos
      max: 100,
      message: 'Too many request from this IP, please try again in an hour!',
    });
    //Definimos los paths de nuestra aplicacion
    this.paths = {
      auth: '/api/v1/auth',
      orders: '/api/v1/orders',
      meals: '/api/v1/meals',
      restaurants: '/api/v1/restaurants',
      users: '/api/v1/users',
    };
    this.database();
    this.middlewares();
    this.router()
  }

  middlewares() {
    this.app.use(helmet());
    //Usamos xss-clean
    this.app.use(xss());
    this.app.use(hpp());
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    //Usamos para todas las rutas el limiter rote
    this.app.use('/api/v1', this.limiter);
    //Utilizamos las cors asi y las importamos arriba
    this.app.use(cors());
    //mostramos formato Json la respuestas
    this.app.use(express.json());
  }
  router() { 
        //utilizar las rutas de autenticacion
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.restaurants, routerRestaurant);
        this.app.all('*',(req,res,next)=>{
          return next(
            new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
          );
        })
        this.app.use(globalErrorHandler);
    }
  database(){
    db.authenticate()//Devuelve una promesa
    .then(()=>console.log('Database Authenticated'))
    .catch(err=>console.log(err))

    //Relacionamos las tablas
    initModel()
    db.sync()//{force:true} borra todos los datos de la aplicacion
    .then(() => console.log('Database synced'))
    .catch(error => console.log(error));
  }
  lister() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
module.exports = Server;
