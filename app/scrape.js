const { Client } = require('pg')

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "betuska2004",
  database: "sreality"
})

client.connect();

client.query('INSERT INTO property (title, url) VALUES (amogus, amogus);', (err, res) => {
  
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end;

});
