const mariaDB = {
  client: "mysql",
  connection: {
    host: process.env.MARIA_DB_HOST,
    user: process.env.MARIA_DB_USER,
    password: process.env.MARIA_DB_PASSWORD,
    database: process.env.MARIA_DB_DATABASE,
  },
};

export default mariaDB;
