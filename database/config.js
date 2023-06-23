
const Sequelize = require('sequelize');
//require('./models/asociation');


        const sequelize = new Sequelize(`postgres://postgres:${process.env.PGPASS}@localhost:5432/${process.env.PGDB}`,{

        //Heroku
        //const sequelize = new Sequelize(`${process.env.DATABASE_URL}`,{
            dialect: 'postgres',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            protocol: 'postgres',
            dialectOptions: {
                decimalNumbers: true,
                useUTC: false, //for reading from database
           
                /*    Esto sirve por si utilizamos heroku
           ssl: {
                    //require: true,
                    rejectUnauthorized: false // <<<<<<< YOU NEED THIS
                }*/
              },
            timezone: 'America/Argentina/Mendoza'
        })
        sequelize
        .authenticate()
        .then(() => {
        console.log('Se ha establecido la conexión satisfactoriamiente.');
        })
        .catch(err => {
        console.error('No se pudo conectar a la base de datos', err);
        });

    
        console.log('Base de datos online');

        module.exports = sequelize;