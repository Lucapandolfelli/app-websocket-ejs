const sqliteDB = {
  client: "sqlite3",
  connection: {
    filename: "./db/messages.db3",
  },
  useNullAsDefault: true,
};

export default sqliteDB;
