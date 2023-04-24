const express = require('express')  
const { queryPromise} = require('./queryPromise')

async function createApp() {
    const app = express()
    const sqlTable = `CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;

    await queryPromise.query(sqlTable)

    const user = [['Guilherme'], ['Ricardo'], ['Felipe'], ['Renan'], ['Rafa']]
    const sqlInsert= `INSERT INTO users(name) VALUES ?`

    await queryPromise.queryMultiple(sqlInsert, user)

    app.get('/', async (req, res) => {
        const selectUsers = `SELECT * FROM users`
        const allUsers = await queryPromise.query(selectUsers)

        const html = `<h1>Usuarios cadastrados</h1>\n
    <ul>
        ${allUsers.map(user => `<li>${user.name}</li>`).join('')}
    </ul>`
        res.send(html)
    })
    return app
}

module.exports = createApp