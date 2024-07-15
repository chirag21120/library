const pool = require('../models/db');

const getBooks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query('SELECT * FROM books LIMIT $1 OFFSET $2', [limit, offset]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addBook = async (req, res) => {
  const { title, author, published_date, isbn } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, published_date, isbn) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, published_date, isbn]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, published_date, isbn } = req.body;

  try {
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, published_date = $3, isbn = $4 WHERE id = $5 RETURNING *',
      [title, author, published_date, isbn, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook };
