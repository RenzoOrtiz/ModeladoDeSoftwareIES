const Cliente = require('./cliente');
const Categoria = require('./categoria');
const CategoriaCliente = require('./categoriaCliente');


//asociación 1 a N entre categoria(1) y categoriaCliente(N), en donde categoriaCliente(N) tiene la clave foránea
CategoriaCliente.hasMany(Categoria,{foreignKey: "fkCategoriaClienteCategoria"});
Categoria.belongsTo(CategoriaCliente,{foreignKey: "fkCategoriaClienteCategoria"});

//asociación 1 a N entre cliente(1) y categoriaCliente(N), en donde categoriaCliente(N) tiene la clave foránea
CategoriaCliente.hasMany(Cliente,{foreignKey: "fkCategoriaClienteCliente"});
Cliente.belongsTo(CategoriaCliente,{foreignKey: "fkCategoriaClienteCliente"});