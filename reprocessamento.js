const { Client } = require('pg')

const client = new Client({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "stone"
})


var string = "SELECT \
ton_users.id, \
ton_users.name, \
ton_transactions.status \
FROM ton_users \
INNER JOIN ton_transactions \
ON ton_users.id = ton_transactions.user_id \
WHERE ton_transactions.status = 'PROCESSING';"


const connect = (client, string) =>{

  client.connect().then(console.log("Connected successfuly"))

  client.query(string, (err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        console.log(res.rows)
    }

  })

}

const fixTransactions = (userIds) => {
    console.log('Corrigindo transações dos usuários enviados')
}

const sendEmails = (userEmails) => {
    console.log('Enviando comunicação para os usuários impactados')

}

const main = async () => {
  await fixTransactions() 
  await sendEmails()
}


userIds = connect(client, string)


main()

  .then(() => console.log('Transações reprocessadas!'))

  .catch(err => console.error(err))

