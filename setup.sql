-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- Create books table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  published_date DATE,
  isbn VARCHAR(20)
);

-- Insert sample data
INSERT INTO users (username, password) VALUES 
('user1', '$2b$10$5/W8Om8idPBd..9D0.T0Fesq6Kr.4DBOYcvA8bJ8kIM./vBc1vNCq'), -- password: password1
('user2', '$2b$10$5/W8Om8idPBd..9D0.T0Fesq6Kr.4DBOYcvA8bJ8kIM./vBc1vNCq'); -- password: password1

INSERT INTO books (title, author, published_date, isbn) VALUES 
('Book One', 'Author One', '2020-01-01', '1234567890'),
('Book Two', 'Author Two', '2021-02-02', '0987654321');
