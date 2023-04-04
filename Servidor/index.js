const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const cors = require("cors");
const helmet = require("helmet");

const db = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ro105254rio*",
    database: "financas",
});

app.use(cors());
app.use(express.json());
app.use(helmet());

app.post("/register", async (req, res) => {
    const {nome_conta, data_vencimento, valor_conta} = req.body;

    let SQL = "INSERT INTO financas (nome_conta, data_vencimento, valor_conta) VALUES ( ?,?,? )"

    try {
        await db.query(SQL, [nome_conta, data_vencimento, valor_conta]);
    } catch (error) {
        console.log(error);
    }

    return res.json("Valores inseridos com sucesso.");
});

app.get("/getCards", async (req, res) => {
    let SQL = "SELECT * from financas";

    try {
        const [result, _] = await db.query(SQL);
        return res.json(result);
    } catch (error) {
        console.log(error);
    }

    return res.json([])
});

app.put("/edit", async (req, res) => {
    const {id, nome_conta, data_vencimento, valor_conta} = req.body;


    let SQL = "UPDATE financas SET nome_conta = ?, valor_conta = ?, data_vencimento = ? WHERE id = ?";

    try {
        await db.query(SQL, [nome_conta, valor_conta, data_vencimento, id]);
    } catch (error) {
        console.log(error);
    }

    return res.json("Valores atualizados com sucesso");

});

app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM financas WHERE  id =?";
    db.query(SQL, [id], (error, result) => {
        if(error) {
            console.log(error);
        } else{
            res.send(result);
        } 
    });
});

app.listen(3001, () => {
    console.log("Rodando Servidor");
});