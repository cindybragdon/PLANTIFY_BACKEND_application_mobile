
import pool from "./backendConfig.js";
// -----------------------------------------         Queries         ----------------------------------------------





export async function getUserByEmailAndPassword(email, password) {
    
    console.log(`Database : get user with email : ${email} and password : ${password}`)
    
    const [users] = await pool.query(`SELECT * FROM user WHERE email=? AND password=?;`,[email,password])
    return users[0];
} 


export async function getUserByEmail(email) {
    
    console.log(`Database : get user with email : ${email}`)
    
    const [users] = await pool.query(`SELECT * FROM user WHERE email=?;`,[email])
    return users[0];
} 

export async function createUser(email, username, password){
    
    console.log(`Database : creating user with email: ${email}, username: ${username} and password : ${password}`)
    
    await pool.query(`INSERT INTO user (username,email,password) VALUES (?,?,?);`,[username,email,password])
    const [rows] = await pool.query(`SELECT id, username, email FROM user WHERE username=? and email=?`,[username,email])
    return rows[0]
}

///modify user

export async function deleteUserById(id){

    console.log(`Database : delete users with id : ${id}`)
    
    const status = await pool.query(`DELETE FROM users WHERE id = ?;`,[id])
    return status[0].affectedRows
}


// -----------------------------------------          TESTS          ----------------------------------------------

console.log(await getUserByEmailAndPassword("miniwheat@example.com", "cestReal"));