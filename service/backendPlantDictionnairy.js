
import pool from "./backendConfig.js";
// -----------------------------------------         Queries         ----------------------------------------------

export async function getAllPlantDictionnary(){
    
    console.log(`Database : getting all plant dictionnary`);
    const [rows] = await pool.query(`SELECT * FROM plantdictionnary`);
    return rows;
}

export async function createPlantDictionnary(plant_name, plant_type, watering_frequency, depth_water_requirement, poisonous_to_humans, poisonous_to_pets, intolerant_to_cold, image_plant, indoor){
    
    console.log(`Database : creating plant dictionnary with plant_name: ${plant_name}, 
        plant_type: ${plant_type}, 
        watering_frequency: ${watering_frequency}, 
        depth_water_requirement: ${depth_water_requirement},
        poisonous_to_humans: ${poisonous_to_humans} 
        poisonous_to_pets: ${poisonous_to_pets} 
        intolerant_to_cold: ${intolerant_to_cold} 
        image_plant: ${image_plant},
        and indoor: ${indoor}`);
    
    await pool.query(`INSERT INTO plantdictionnary (plant_name, plant_type, watering_frequency, depth_water_requirement, poisonous_to_humans, poisonous_to_pets,intolerant_to_cold,image_plant,indoor) VALUES(?,?,?,?,?,?,?,?,?);`,[plant_name,plant_type,watering_frequency,depth_water_requirement,poisonous_to_humans, poisonous_to_pets,intolerant_to_cold,image_plant,indoor]);
    const [rows] = await pool.query(`SELECT * FROM plantdictionnary WHERE plant_name=? and plant_type=? and watering_frequency=? and depth_water_requirement=? and poisonous_to_humans=? and poisonous_to_pets=? and intolerant_to_cold=? and image_plant=? and indoor=?`,[plant_name,plant_type,watering_frequency,depth_water_requirement,poisonous_to_humans, poisonous_to_pets,intolerant_to_cold,image_plant,indoor]);
    return rows[0];
}


export async function deletePlantDictionnaryById(id){

    console.log(`Database : delete plantdictionnary with id : ${id}`);
    
    const status = await pool.query(`DELETE FROM plantdictionnary WHERE id = ?;`,[id]);
    return status[0].affectedRows;
}

// -----------------------------------------          TESTS          ----------------------------------------------

/*
console.log( await createPlantDictionnary(
    'Candy Tree', 
    'Bathroom plant', 
    1, 
    '75 mm', 
    false, 
    true, 
    true, 
    null, 
    true
));
*/

/*
console.log(await deletePlantDictionnaryById(4));
console.log(await deletePlantDictionnaryById(5));
console.log(await deletePlantDictionnaryById(6));
console.log(await deletePlantDictionnaryById(7));
*/

console.log(await getAllPlantDictionnary());