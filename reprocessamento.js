const { Client } = require('pg')

const client = new Client({
  user: "postgres",
  password: "123",
  host: "localhost",
  port: 5432,
  database: "stone"
})

var string = "SELECT \
ton_users.id, \
ton_users.email \
FROM ton_users \
INNER JOIN ton_transactions \
ON ton_users.id = ton_transactions.user_id \
WHERE ton_transactions.status = 'PROCESSING';"


const fixTransactions = (userIds) => {
    console.log('Corrigindo transações dos usuários enviados')
}

const sendEmails = (userEmails) => {
    console.log('Enviando comunicação para os usuários impactados')

}

const main = async (rows) => {
  let userIds = []
  let userEmails = []

  for (let i of rows){
    userIds.push(i.id)
    userEmails.push(i.email)
  }

  await fixTransactions(userIds) 
  await sendEmails(userEmails)
}


client.connect()
.then(() => client.query(string))
.then(results => main(results.rows))
.then(() => console.log('Transações reprocessadas!'))
.then(() => client.end())
.catch(err => console.error(err))