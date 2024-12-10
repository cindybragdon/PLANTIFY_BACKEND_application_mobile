
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

export async function createUser(username, email, password){
    
    console.log(`Database : creating user with username: ${username}, email ${email} and password : ${password}`)
    
    await pool.query(`INSERT INTO user (username,email,password) VALUES (?,?,?);`,[username,email,password])
    const [rows] = await pool.query(`SELECT userId, username, email FROM user WHERE username=? and email=?`,[username,email])
    return rows[0]
}

export async function updateUser(userData){
    

    console.log(`Database : update user with user.userid : ${userData.userid}`)

    const status = await pool.query(`   UPDATE user
                                        SET 
                                            username = ?,
                                            email = ?,
                                            password = ?,
                                            location = ?,
                                            image_user = ?

                                        WHERE userid = ?;`,[
                                            userData.username,
                                            userData.email,
                                            userData.password,
                                            userData.location,
                                            userData.image_user,
                                            userData.userid
                                        ]);
    return status[0].affectedRows
}

export async function deleteUserById(userid){

    console.log(`Database : delete user with userid : ${userid}`)
    
    const status = await pool.query(`DELETE FROM user WHERE userid = ?;`,[userid])
    return status[0].affectedRows
}


// -----------------------------------------          TESTS          ----------------------------------------------

//console.log(await getUserByEmailAndPassword("miniwheat@example.com", "cestReal"));
//console.log(await createUser("testUser","hotdawg@example.com", "test"));
/*
console.log(await updateUser(
    {
        userid:9,
        username:"yolokl",
        email:"yololo@example.com",
        password:"dffg",
        location:"montréal",
        image_user:null
    }
    ));
    */
//console.log(await deleteUserById(9));
