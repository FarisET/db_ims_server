const { Router } = require('express');
const router = Router();
var con=require('../databases/database');
const { route } = require('express/lib/application');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken"); 

// router.get('/', (req,res) => {
//     res.status(200).json('Server on port 3000 and Database is connected')
// });

// router.get('/:users', (req,res) => {
//     mysqlConnection.query('select * from user', (error, rows, fields) => {
//         if(!error) {
//             res.json(rows);
//         } else {
//             console.log(error);
//         }
//     });
// });

//This function allows us concatenate 'id' to url => localhost:4000/id
// router.get('/:users/:id', (req,res) => {
//     const {id} = req.params;
//     mysqlConnection.query('select * from user where id = ?', [id], (error, rows, fields) => {
//         if(!error) {
//             res.json(rows);
//         } else {
//             console.log(error);
//         }
//     })
// });

// router.post('/users', (req, res) => {
//     const { id, password} = req.body;
//     console.log(req.body);
//     mysqlConnection.query('insert into users(user_id, password) values (?, ?)', [ id, password], (error, rows, fields) => {
//         if(!error) {
//             res.json({Status : "User added"})
//         } else {
//             console.log(error);
//         }
//     });
// })

// router.use(bodyParser.json());

router.post('/login', (req, res) => {
  const id=req.body.user_id;
  const password=req.body.user_pass; 
  console.log(id, password);
    // Assuming the client sends id and password in the request body  
    // Query the database to find a user with the provided id
   // con.query('SELECT * FROM users u join user_role r on u.role_id=r.role_id WHERE user_id = ? and user_pass=?', [id,password], (error, rows) => {
    con.query('SELECT u.*, r.role_name AS role_name, u.user_name AS user_name FROM users u join user_role r on u.role_id=r.role_id WHERE user_id = ? and user_pass=?', [id,password], (error, rows) => {  
   if (error) {
        console.log(error);
        return res.status(500).json({ status: 'Internal server error' });
      }
      console.log(rows);
      const user = rows[0];
      // Check if a user with the provided id exists
      if (rows.length === 0) {
        return res.status(401).json({ status: 'User not found' });
      } else  if (password !== user.user_pass) { //still need to hash password
        return res.status(401).json({ status: 'Invalid password' });
      }
      // At this point, the login is successful
      // You may generate a JWT token and return it to the client for future authentication
      const token = jwt.sign({ user_id: user.id, role_name: user.role_name,user_name:user.user_name }, '4RMVRT/Gh6+V234f01BT7JwHYH2dHOSPNMo1T711jnAf3XjyNERkNLVlWcQH5yZ6bNOuAb0wxHYPNwEjJrBkKQhqZ8VL6jqDDURO92Cle8iyJjd8xSuMiI6HY5ruL+kbhtewFTtEHOz9IYUnpIOejuMPpbkgOjQ5ttu1c+3JbD8vRZNHUbRFZeri2QCEBD6fYJA4UpgioBEb8cbtna4cY3PlYYhChonn/4IYjIzhYPaIb+bwxDLgRF+C4GKXVUfU/158YcxV/8Ge77mvhAUE+h2jX2p9PkM8HJsI51yJCB42CHlEnukkpBVWqhgoPyYiaesTJNLbjNaxp14SEv23Rw==', { expiresIn: '24h' });  
      console.log('token: '+ token);
      console.log(user);
      return res.status(200).json({ status: 'Login successful', token});
    });
  });

// const User = [
//     { "user_id": '24470', "user_pass": 'abc123' },
//     { "user_id": '20230', "user_pass": '123abc' },
//   ];
  
  // router.post('/login', (req, res) => {
  //   user_id = req.body.user_id;
  //   user_pass = req.body.user_pass;  
  //   console.log("Received user_id:", user_id);
  //   console.log("Received user_pass:", user_pass);
  //   console.log("Users:", User);

    

  //   if (!user) {
  //     return res.status(401).json({ message: 'User not found omg server connected' });
  //   }
  
  //   if (user.user_pass !== user_pass) {
  //     return res.status(401).json({ message: 'Invalid password' });
  //   }
  
  //   // Return a successful login response
  
  //   res.status(200).json({ message: 'Login successful', user });
  // });


  module.exports = router;

