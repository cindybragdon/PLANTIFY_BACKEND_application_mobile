import express from 'express';
import cors from 'cors'
import jwt from 'jsonwebtoken';
import { createUser, deleteUserById, getUserByEmail, getUserByEmailAndPassword } from './service/backendUser.js';
import { getAllPlantDictionnary } from './service/backendPlantDictionnairy.js';
import { createMyPlant, getPlantsByUserId, updateMyPlant } from './service/backendMyPlants.js';
//import { fetchData } from './fetchData.js';


const SECRET_KEY = 'Snooopy_DOggy-dawg';

const app = express();

//Cors est nécéssaire pour qu'un backend communique avec un front end
app.use(cors());

//express crée des routes et crée un serveur
app.use(express.json())


// -----------------------------------------         USER         ----------------------------------------------

app.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Post : users/login")

    // Check if username or email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: "Username or email and password are required." });
    }

    try {
        // Modify the user retrieval function to accept either username or email
        console.log(`End point request with user/email : ${usernameOrEmail} and pass : ${password}`)


        const user = await getUserByEmailAndPassword(email, password);
        console.log(`Found user : ${user}`)
        if (!user) {
            return res.status(401).json({ error: "Invalid username/email or password." });
        }
        const userId = user.id
        const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
            userid: user.userid,
            username: user.username,
            email: user.email,
            location: user.location,
            image_user: user.image_user,
            token

        });
    } catch (error) {
        console.error('Error retrieving user: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post("/user", async (req, res) => {
    const {username, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
        return res.status(400).json({ error: "username, email and password are required." });
    }

    try {
        // Check if the username or email already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(401).json({ error: "Email already exists." });
        }

        // Proceed to create the user
        const newUser = await createUser(username, email, password);
        const token = jwt.sign({ userId:newUser.id }, SECRET_KEY, { expiresIn: '1h' });
        console.log(token)
        // Return the newly created user information
        res.status(201).json({
            userId: newUser.userId,
            username: newUser.username,
            email: newUser.email,
            token
            
        });
    } catch (error) {
        console.error('Error during signup: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


/*
app.get("/user/:id", async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).send('Forbidden');
        
        const userId = req.params.id; 

        // Check for missing fields
        if (!userId) {
            return res.status(400).json({ error: "Request missing parameters" });
        }

        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY); // Synchronous verification
        if (!decoded?.userId) {
            return res.status(401).json({ error: "Forbidden: badToken" });
        }
        
        if (decoded.userId != userId) {
            return res.status(401).json({ error: "Forbidden: you are not allowed to get this info" });
        }

        // get user data
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: `Aucun utilisateur pour l'id : ${id}`});
        }

        // Return the information
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send('Invalid token'); // Handle JWT-specific errors
        }
        console.error('Error fetching profile Data: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
*/

app.put("/user/:id", async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Forbidden');
    const userId = req.params.id; 

    const userData  = req.body;

    if(!userData || userId != userData?.userId){
        return res.status(400).json({ error: "Request missing userData" });

    }
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY); // Synchronous verification
    if (!decoded?.userId) {
        return res.status(401).json({ error: "Forbidden: badToken" });
    }
    
    if (decoded.userId != userId) {
        return res.status(403).json({ error: "Forbidden: you are not allowed to get this info" });
    }
    try {
        // Check for missing fields
        if (!userData?.userId || !userData?.username || !userData?.email || !userData?.password || !userData?.location || !userData?.image_user) {
            return res.status(400).json({ error: "Request body missing parameters" });
        }

        // alter user data
        const user = await updateUserProfile(userData);
        if (!user) {
            return res.status(404).json({ error: `Error while updating data`});
        }

        // Return the information
        res.status(200).json({
            message:"Success"
        });
    } catch (error) {
        console.error('Error updating profile Data: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


app.delete("/user/:id", async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).send('Forbidden');
        
        const userId = req.params.id; 
        
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY); // Synchronous verification
        if (!decoded?.userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        
        if (decoded.userId != userId) {
            return res.status(403).json({ error: "Forbidden: you are not allowed to delete this user" });
        }

        const user = await deleteUserById(userId);
        if (!user) {
            return res.status(404).json({ error: `Aucun utilisateur pour l'id : ${id}`});
        }

        // Return the information
        res.status(200).json({
            message:"Success"
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send('Invalid token'); // Handle JWT-specific errors
        }
        console.error('Error deleting user: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


app.post("/user/authenticate", async (req, res) => {
    
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).send('Forbidden');

        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY); // Synchronous verification
        if (!decoded?.userId) {
            return res.status(401).json({ error: "Forbidden: badToken" });
        }

        res.status(200).json({
            id: decoded.userId,
        });
    } catch (error) {
        console.error('Error during authenticate: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});



// -----------------------------------------             MY PLANTS             ----------------------------------------------

app.get("/myPlant/:id", async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).send('Forbidden');
        
        const userId = req.params.id; 
        
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY); // Synchronous verification
        if (!decoded?.userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        
        if (decoded.userId != userId) {
            return res.status(403).json({ error: "Forbidden: you are not allowed to to get the plants of this user" });
        }
        // get myPlants of user
        const myPlants = await getPlantsByUserId(userId);
        if (!myPlants) {
            return res.status(404).json({ error: `Aucun myPlant of this user`});
        }

        // Return the information
        res.status(200).json({myPlants:myPlants});
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send('Invalid token'); // Handle JWT-specific errors
        }
        console.error('Error fetching myplants Data by userID: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


app.post("/myPlant", async (req, res) => {
    const {name, type, age, location} = req.body;

    try {
        // Check for missing fields
        if (!name || !type || !age || !location || !userId) {
            return res.status(400).json({ error: "username, email and password are required." });
        }

        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).send('Forbidden');
        
        const userId = req.params.id; 
        
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY); // Synchronous verification
        if (!decoded?.userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        
        if (decoded.userId != userId) {
            return res.status(403).json({ error: "Forbidden: you are not allowed to to create a plant for this user" });
        }

        // Check if the username or email already exists
        const newMyPlant = await createMyPlant(name, type, age, location, userId);

        // Return the newly created user information
        res.status(201).json({
            name: newMyPlant.name,
            type: newMyPlant.type,
            age: newMyPlant.age,
            location: newMyPlant.location,
            userId: newMyPlant.userId        
        });
    } catch (error) {
        console.error('Error during myplant creation: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


app.put("/myPlant/:id", async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Forbidden');
    const userId = req.params.id; 

    const myPlantData  = req.body;

    if(!myPlantData){
        return res.status(400).json({ error: "Request missing userData" });
    }
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY); // Synchronous verification
    if (!decoded?.userId) {
        return res.status(401).json({ error: "Forbidden: badToken" });
    }
    
    if (decoded.userId != userId) {
        return res.status(403).json({ error: "Forbidden: you are not allowed to modify this plant" });
    }
    try {
        // Check for missing fields
        if (!myPlantData?.id || !myPlantData?.myplant_name || !myPlantData?.myplant_type || !myPlantData?.myplant_age || !myPlantData?.myplant_location || !myPlantData?.image_myplant) {
            return res.status(400).json({ error: "Request body missing parameters" });
        }

        // alter user data
        const updatedMyPlant = await updateMyPlant(myPlantData);
        if (!updatedMyPlant) {
            return res.status(404).json({ error: `Error while updating data`});
        }

        // Return the information
        res.status(200).json({
            message:"Success"
        });
    } catch (error) {
        console.error('Error updating profile Data: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


// -----------------------------------------         PLANT DICTIONNARY         ----------------------------------------------

app.get("/plantDictionnary", async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).send('Forbidden');
        
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY); // Synchronous verification
        if (!decoded?.userId) {
            return res.status(401).json({ error: "Forbidden: badToken" });
        }

        // get user data
        const plantsDictionnary = await getAllPlantDictionnary();
        if (!plantsDictionnary) {
            return res.status(404).json({ error: `Aucun plantDictionnary`});
        }

        // Return the information
        res.status(200).json({plantsDictionnary:plantsDictionnary});
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send('Invalid token'); // Handle JWT-specific errors
        }
        console.error('Error fetching profile the plant dictionnary: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});




// Lorsqu'une erreur se produit dans l'application (par exemple, une exception non gérée), Express appelle automatiquement
// ce middleware d'erreur avec l'objet d'erreur (err), ce qui permet de la gérer de manière centralisée et uniforme.
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// Lance le serveur et lui indique quel port utiliser 
app.listen(8080, () => {
    console.log('Server is runnig on port 8080');
    //fetchData();
})