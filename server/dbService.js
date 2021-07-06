const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if(err){
    console.log(err.message);
  }
  // console.log('db ' + connection.state);
})

class DbService {
  static getDbServiceInstance(){
      return instance ? instance : new DbService();
  }

  // this is the backend of the get all data

  async getAllData(){
    try{
      const response = await new Promise((resolve, reject) =>{
        const query = "SELECT * FROM node_crud;";
        connection.query(query, (err, results) => {
          if(err) reject(new Error(err.message));
          resolve(results);
        } )
      });

      // console.log(response);

      return response;

    } catch (error){
      console.log(error);
    }
  }

  // this is the backend of the insert data
  async insertNewName(name){
    try{

        const dataAdded = new Date();

        const insertId = await new Promise((resolve, reject) =>{
        const query = "INSERT INTO node_crud (name,date_added) VALUES (?,?);";
          connection.query(query, [name, dataAdded], (err, result) => {
            if(err) reject(new Error(err.message));
              resolve(result.insertId);
          })
        });

        if(insertId){
          const response2 = await new Promise((resolve, reject) =>{
            const query = "SELECT * FROM node_crud;";
            connection.query(query, (err, results) => {
              if(err) reject(new Error(err.message));
              resolve(results);
            } )
          });
          console.log(response2);
          return response2;

        }

      // console.log(insertId);

      // return insertId;

      // return {
      //   id: insertId,
      //   name: name,
      //   date_added: dataAdded,
      // };

    } catch(error){
      console.log(error)
    }
  }

  // delete section
  async deleteRowById(id){

    try {

      // let id = parseInt(id);
      const response = await new Promise((resolve, reject) =>{
        const query = "DELETE FROM node_crud WHERE id = ?;";
          connection.query(query, [id], (err, result) => {
            if(err) reject(new Error(err.message));
              resolve(result.affectedRows);
          })
      });
      // console.log(response);
      // return response === 1 ? true : false ;
      if (response === 1){
        const response2 = await new Promise((resolve, reject) =>{
          const query = "SELECT * FROM node_crud;";
          connection.query(query, (err, results) => {
            if(err) reject(new Error(err.message));
            resolve(results);
          } )
        });
        console.log(response2);
        return response2;
      }else{
        return false;
      }

    } catch (error) {
        console.log(error);
        return false;
    }

  }

  // delete section
  async updateNameById(id, name){

    try {

      // let id = parseInt(id);
      const response = await new Promise((resolve, reject) =>{
        const query = "UPDATE node_crud SET name = ? WHERE id = ?;";
          connection.query(query, [name, id], (err, result) => {
            if(err) reject(new Error(err.message));
              resolve(result.affectedRows);
          })
      });
      console.log(response);
      // return response === 1 ? true : false ;
      if (response === 1){
        const response2 = await new Promise((resolve, reject) =>{
          const query = "SELECT * FROM node_crud;";
          connection.query(query, (err, results) => {
            if(err) reject(new Error(err.message));
            resolve(results);
          } )
        });
        console.log(response2);
        return response2;
      }else{
        return false;
      }

    } catch (error) {
        console.log(error);
        return false;
    }



  }
  // search section
  async searchByName(name){

    try {

      const response = await new Promise((resolve, reject) =>{
        const query = "SELECT * from node_crud  WHERE name = ?;";
          connection.query(query, [name], (err, result) => {
            if(err) reject(new Error(err.message));
              resolve(result);
          })
      });
      console.log(response);
      return response;


    } catch (error) {
        console.log(error);
    }

  }

}


module.exports = DbService;