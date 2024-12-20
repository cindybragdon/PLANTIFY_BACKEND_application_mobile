
import pool from "./backendConfig.js";
// -----------------------------------------         Queries         ----------------------------------------------

export async function getPlantsByUserId(userId) {
    
    console.log(`Database : get user plants with userid : ${userId}`)
    
    const [userPlants] = await pool.query(`SELECT * FROM myplant WHERE userid=?;`,[userId]);
    return userPlants;
} 

export async function getPlantsByPlantId(id) {
    
    console.log(`Database : get user plants with id : ${id}`)
    
    const [userPlants] = await pool.query(`SELECT * FROM myplant WHERE id=?;`,[id]);
    return userPlants;
} 

export async function createMyPlant(name, type, age, location, userId){
    
    console.log(`Database : creating myPlant with name: ${name}, type: ${type}, age: ${age}, location: ${location} and userId : ${userId}`)
    
    await pool.query(`INSERT INTO myplant (myplant_name, myplant_type, myplant_age, myplant_location, userId) VALUES(?,?,?,?,?);`,[name,type,age,location,userId])
    const [rows] = await pool.query(`SELECT * FROM myplant WHERE myplant_name=? and myplant_type=? and myplant_age=? and myplant_location=? and userId=?`,[name,type,age,location,userId])
    return rows[0]
}


export async function updateMyPlant(myPlantData){
    

    console.log(`Database : update myplant with myPlant.id : ${myPlantData.id}`);

    const [rows] = await pool.query(`   UPDATE myplant
                                        SET 
                                            myplant_name = ?,
                                            myplant_type = ?,
                                            myplant_age = ?,
                                            myplant_location = ?,
                                            image_myplant = ?

                                        WHERE id = ?;`,[myPlantData.myplant_name,
                                            myPlantData.myplant_type,
                                            myPlantData.myplant_age,
                                            myPlantData.myplant_location,
                                            myPlantData.image_myplant,
                                            myPlantData.id
                                        ]);
    return true;
}

export async function deleteMyPlantById(id){

    console.log(`Database : delete myPlant with id : ${id}`);
    
    const status = await pool.query(`DELETE FROM myplant WHERE id = ?;`,[id]);
    return status[0].affectedRows;
}


// -----------------------------------------          TESTS          ----------------------------------------------

//console.log(await getPlantsByUserId(1));

//console.log(await createMyPlant("Morice", "cactus", 12, "intérieur", 2));
//console.log(await getPlantsByUserId(2));

/*
console.log(await updateMyPlant({
    myplant_name:"Charles",
    myplant_type:"Bamboo",
    myplant_age:34,
    myplant_location:"Zimbabwe",
    image_myplant:null,
    id:5
}));
*/
//console.log(await getPlantsByUserId(2));

/*
console.log(await deleteMyPlantById(4));
console.log(await deleteMyPlantById(5));
console.log(await deleteMyPlantById(6));
*/