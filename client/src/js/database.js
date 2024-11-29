import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

export const putDb = async (content) => {
  console.log('PUT to db');

  // Open db

  const jateDb = await openDB('jate', 1);

  // New transaction

  const tx = jateDb.transaction('jate', 'readwrite');

  // Open object store

  const store = tx.objectStore('jate');

  // Update db content

  const request = store.put({ id: 1, content });

  // Confirmation

  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => {
  console.log('GET from the database');

  // Open db 

  const jateDb = await openDB('jate', 1);

  // New transaction

  const tx = jateDb.transaction('jate', 'readonly');

  // Open object store

  const store = tx.objectStore('jate');

  // Get data

  const request = store.get(1);

  // Confirmation
  
  const result = await request;
  console.log('Data retrieved from the database', result);
  return result?.content;
};

initdb();
