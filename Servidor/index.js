const express = require ("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "financas",
});

app.use(cors());
app.use(express.json());

app.post("register", (req, res) =>{
   const {name} = req.body;
   const {date} = req.body;
   const {value} = req.body;

   let SQL = "INSERT INTO financas (nome_conta, data_vencimento, valor_conta) VALUES ( ?,?,? )"

    db.query(SQL, [nome_conta, data_vencimento, valor_conta] (error, result));
});

app.get("/getCards", (req, res)=> {
    let SQL = "SELECT *from financas";

    db.query(SQL, (error, result) => {
        if(error) console.log(error);
        else res.send(result);
    });
});

app.put("/edit", (req, res) => {
    const {id} = req.body
    const {nome_conta} = req.body
    const {valor_conta} = req.body
    const {data_vencimento} = req.body;


    let SQL = "UPDATE financas SET nome_conta = ?, valor_conta = ?, data_vencimento = ? WHERE idfinancas = ?";

    db.query(SQL, [nome_conta, valor_conta, data_vencimento, id] (error, result) , {
        if(error) {console.log(error);
        },else : res.send(result)
    });
        
});

app.delete("/dele/:id", (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM financas WHERE  id =?",
    db.query (SQL, [id] (error, result) , {
        if(error) {console.log(error);
        }, else : res.send(result)
    });
});

app.listen(3001, () => {
    console.log("rodando servidor");
});