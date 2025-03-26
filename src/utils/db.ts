
import mysql from 'mysql2/promise';

// Database connection configuration
export async function getConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'captain.sys.coolrasto.com',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Liefero414$$$',
      database: process.env.DB_NAME || 'events_db'
    });
    
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

// Execute a query with parameters
export async function executeQuery(query: string, params: any[] = []) {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(query, params);
    return results;
  } catch (error) {
    console.error('Query execution error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}
