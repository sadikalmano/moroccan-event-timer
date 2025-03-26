
import { getConnection } from './db';

export async function migrateDatabase() {
  const connection = await getConnection();
  
  try {
    console.log('Running database migrations...');
    
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        organization VARCHAR(255),
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Create events table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        description TEXT NOT NULL,
        image VARCHAR(255),
        start_date DATETIME NOT NULL,
        end_date DATETIME NOT NULL,
        city VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        organizer VARCHAR(255) NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    console.log('Database migrations completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}
