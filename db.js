const query = {
    text: 'SELECT * FROM ton_users',
}


client.query(query, (err, res) => {
    if (err) {

        console.log(err.stack)

    } else {

        return res

    }
    client.end()
  })
