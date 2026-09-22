import mysql from 'mysql2'

const pool= mysql.createPool({
    host: "webcourse.cs.nuim.ie",
    user: "u240554",
    password: "JeidaiTh1aiCheel",
    database: "cs230_u240554",
    dateString: true
})

export default pool