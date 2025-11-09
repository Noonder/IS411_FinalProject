import { createRequire } from "module";
const require = createRequire(import.meta.url);

const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');

const db = new Database('users.db');
export default db;

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userType TEXT,
  email TEXT UNIQUE,
  password TEXT,
  prefix TEXT,
  firstname TEXT,
  lastname TEXT,
  idcard TEXT,
  phone TEXT,
  durianType TEXT,
  durianOther TEXT
)
`).run();

// @ts-ignore
export function register(user) {
  const hashedPassword = bcrypt.hashSync(user.password, 10);

  const stmt = db.prepare(`
    INSERT INTO users (
      userType, email, password, prefix, firstname, lastname,
      idcard, phone, durianType, durianOther
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  try{
    const result = stmt.run(
        user.userType,
        user.email,
        hashedPassword,
        user.prefix,
        user.firstname,
        user.lastname,
        user.idcard,
        user.phone,
        user.durianType,
        user.durianOther
    );
    console.log('Inserted user ID:', result.lastInsertRowid);
    return result.lastInsertRowid;
    } catch (err) {
    // @ts-ignore
    console.error('Error inserting user:', err.message);
    return null;
  }
}


// @ts-ignore
export function login(email, password) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const user = stmt.get(email);
  if (!user) return null;

  // @ts-ignore
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) return null;

  return user;
}

// ฟังก์ชันทดสอบดึงข้อมูลทั้งหมด 
export function getAllUsers() {
  const stmt = db.prepare('SELECT * FROM users');
  return stmt.all();
}



// ทดสอบ insert / query
if (process.argv.includes('--test')) {
  const testUser = {
    userType: 'เกษตรกร',
    email: 'test@example.com',
    password: '123456',
    prefix: 'นาย',
    firstname: 'สมชาย',
    lastname: 'ใจดี',
    idcard: '1234567890123',
    phone: '0812345678',
    durianType: 'หมอนทอง',
    durianOther: ''
  };

  const id = register(testUser);
  if (id) console.log('Test insert success, ID:', id);

  const users = getAllUsers();
  console.log('All users in DB:', users);
}