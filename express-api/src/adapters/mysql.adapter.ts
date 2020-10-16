import { createPool } from 'mysql';

export const mysql = createPool({
  host: process.argv[2],
  user: process.argv[3],
  password: process.argv[4],
  database: process.argv[5],
});

mysql.getConnection((error) => {
  if (!!error) {
    throw error;
  }
});
