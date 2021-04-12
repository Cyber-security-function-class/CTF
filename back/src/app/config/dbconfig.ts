

const dbconfig = {
    "username" : process.env.dbUser || "skilluser",
    "password" : process.env.dbPassword || "imskilluser",
    "host" : process.env.dbHost || "localhost",
    "database" : "skillctf",
    "dialect" : "postgres"
}


export default dbconfig