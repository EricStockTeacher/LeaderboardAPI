import express from "express"
import cors from "cors"

const app = express()

app.use(express.json());
app.use(cors());

const leaderboard = [ ["eric", 1000],
                    ["dave", 2000],
                    ["sally", 1500]]; 

app.get("/", (request, response) => {
    leaderboard.sort( (a, b) => b[1] - a[1])

    response.json(leaderboard)
})

app.post("/", (request, response) => {
    console.log(request.body);
    let found = false;
    for( let entry of leaderboard) {
        if( entry[0] == request.body[0]) {
            entry[1] = request.body[1]
            found = true;
            break
        }
    }
    if( !found ) {
        leaderboard.push(request.body)
    }
    //leaderboard[request.body[0]] = request

    response.json( {info: "added score"} )
})

app.delete('/', (request, response) => {
    console.log(request.body)
    let nameToRemove = request.body.name;
    let found = false;
    for( let entry in leaderboard) {
        if( leaderboard[entry][0] == nameToRemove) {
            console.log("removing")
            leaderboard.splice(nameToRemove, 1)
            found = true;
        }
    }
    if(found)
        response.json( {info: "deleted"})
    else
        response.json( {info: "not found"})
})

app.listen(3000, () => {
    console.log("API listeneing on port 3000");
})