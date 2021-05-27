const mysql = require('mysql')
const connection = {
	  host     : process.env.RDS_HOSTNAME,
	  user     : process.env.RDS_USERNAME,
	  password : process.env.RDS_PASSWORD,
	  port     : process.env.RDS_PORT,
    // database: 'dev_test'
  }
const test = {
	host: 'mysql-rfam-public.ebi.ac.uk',
	user: 'rfamro',
	password: '',
	port:'4497',
	database: 'Rfam'
}
const con = mysql.createConnection(test);
  


const getEmail = async(email) => {
	
	const queryString =`select order_id, shipping_address_first_name, shipping_address_last_name, shipping_address_state, shipping_address_zip from mw_integration.underwear_giveaway_customers
  where email_address = '${email}'`
	
	const queryString2 = `SELECT * FROM family LIMIT 10;`
	
	return await new Promise((resolve, reject) => {
	 con.query(queryString2, (err,result) => {
	 	if(err) reject(err)
	 	else resolve(result[0])
	 })
	})
}

const main = async(event) => {
	console.log('Event', event)
	return getEmail('tyler.tremblay@aretove.com')
}

exports.handler = main 