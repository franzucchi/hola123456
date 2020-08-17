// populatedb.js

// necesitamos importar mongoose
const mongoose = require('mongoose');

// importar el modelo de usuario
const User = require('./models/User');

// la URI de la db
const db = 'mongodb+srv://hellodb:peron3514@cluster0.rvqju.mongodb.net/hellodb?retryWrites=true&w=majority';
// const db = 'mongodb://localhost/hellodb';

// array de usuarios para ingresar a la db
const users = [
  {
    id: 1,
    name: 'Peron',
    mail: 'Peron@mail.com',
    birthday: '1946-05-24'
  },
  {
    id: 2,
    name: 'Menem',
    mail: 'Menem@mail.com',
    birthday: '1989-02-13'
  },
  {
    id: 3,
    name: 'Macri',
    mail: 'Macri@mail.com',
    birthday: '2015-05-19'
  },
  {
    id: 4,
    name: 'Yrigoyen',
    mail: 'Yrigoyen@mail.com',
    birthday: '1930-03-01'
  }
];

// conectarse a la db
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    // si nos conectamos con exito mostrar mensajes
    // e insertar los usuarios en el array
    console.log(`DB connected @ ${db}`);
    console.log('Populating DB...');
    User.insertMany(users, (err, users) => {
      if (err) throw err;
      // un mensaje con la cantidad de documentos insertados
      console.log(`${users.length} documents inserted!`);
      // cerramos la conexion cuando terminamos
      mongoose.connection.close();
    });
  })
.catch(err => console.error(`Connection error ${err}`));