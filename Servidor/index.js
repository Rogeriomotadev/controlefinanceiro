const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mpo_password",
    database: "financas",
});

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    const {nome_conta, data_vencimento, valor_conta} = req.body;

    let SQL = "INSERT INTO financas (nome_conta, data_vencimento, valor_conta) VALUES ( ?,?,? )"

    try {
        await db.query(SQL, [nome_conta, data_vencimento, valor_conta]);
    } catch (error) {
        console.log(error);
    }

    return res.json("Valores inseridos com sucesso XPTO");
});

app.get("/getCards", async (req, res) => {
    let SQL = "SELECT *from financas";

    try {
        const result = await db.query(SQL);
        return res.json(result);
    } catch (error) {
        console.log(error);
    }

    return res.json([])
});

app.put("/edit", async (req, res) => {
    const {id, nome_conta, data_vencimento, valor_conta} = req.body;


    let SQL = "UPDATE financas SET nome_conta = ?, valor_conta = ?, data_vencimento = ? WHERE idfinancas = ?";

    try {
        await db.query(SQL, [nome_conta, valor_conta, data_vencimento, id]);
    } catch (error) {
        console.log(error);
    }

    return res.json("Valores atualizados com sucesso XPTO");

});

app.delete("/dele/:id", (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM financas WHERE  id =?";
    db.query(SQL, [id](error, result), {
        if(error) {
            console.log(error);
        }, else: res.send(result)
    });
});

app.listen(3001, () => {
    console.log("Rodando Servidor");
});