// const express = require("express");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const app = express();
// app.use(bodyParser.json());

// // Middleware to verify the JWT token
// function authenticateToken(req, res, next) {
//     const token = req.header("Authorization");
  
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized: Token missing" });
//     }
  
//     jwt.verify(token, "your-secret-key", (err, user) => {
//       if (err) {
//         return res.status(403).json({ error: "Unauthorized: Invalid token" });
//       }
  
//       req.user = user;
//       next();
//     });
//   }

// // Protected route that requires a valid token
// app.get("/api/protected", authenticateToken, (req, res) => {
//     res.json({ message: "Protected route accessed successfully" });
// });

// const LoggedInusers = [];

// // Books array
// const books = [
//   {
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     isbn: "978-0-7432-7356-5",
//   },
//   {
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     isbn: "978-0-06-112008-4",
//   },
//   {
//     title: "1984",
//     author: "George Orwell",
//     isbn: "978-0-452-28423-4",
//   },
//   {
//     title: "Pride and Prejudice",
//     author: "Jane Austen",
//     isbn: "978-0-486-60940-0",
//   },
//   {
//     title: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     isbn: "978-0-261-10225-4",
//   },
//   {
//     title: "Harry Potter and the Sorcerer's Stone",
//     author: "J.K. Rowling",
//     isbn: "978-0-439-82777-5",
//   },
//   {
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     isbn: "978-0-316-76948-0",
//   },
//   {
//     title: "The Lord of the Rings",
//     author: "J.R.R. Tolkien",
//     isbn: "978-0-544-35343-8",
//   },
//   {
//     title: "The Da Vinci Code",
//     author: "Dan",
//     isbn: "978-0-385-50420-5",
//     name: "loyd",
//   },
// ];

// const users = ["userOne", "userTwo", "userThree", "userFour"];

// // Define a route to get the list of users
// app.get("/api", (req, res) => {
//   res.json({ users });
// });

// app.post("/api/register", (req, res) => {
//     // Handle user registration logic here
//     const { username, password } = req.body;
//     // Implement registration logic and send appropriate response
//     res.json({ message: "User registered successfully", username });
//   });

// // Define a route to create a new user (POST request)
// app.post("/api/users", (req, res) => {
//   const newUser = req.body.user; // Assuming the user data is sent in the request body
//   if (newUser) {
//     users.push(newUser);
//     res.status(201).json({ message: "User created successfully", user: newUser });
//   } else {
//     res.status(400).json({ error: "Invalid request, user data missing" });
//   }
// });

// // Define a route to get the list of books
// app.get("/books", (req, res) => {
//   const authorName = req.query.author;
//   const title = req.query.title;

//   if (authorName) {
//     // If the author query parameter is provided, filter books by author
//     const filteredBooksByAuthor = filterBooksByAuthor(authorName);
//     res.json({ bookList: filteredBooksByAuthor });
//   } else if (title) {
//     // If the title query parameter is provided, get the book by title
//     const bookByTitle = getBookByTitle(title);
//     if (bookByTitle) {
//       res.json(bookByTitle);
//     } else {
//       res.status(404).json({ error: "Book not found" });
//     }
//   } else {
//     // If no author or title query parameters are provided, return the entire book list
//     res.json({ bookList: books });
//   }
// });

// // Define a route to get a specific book by ISBN
// app.get("/books/:isbn", (req, res) => {
//   const isbnParam = req.params.isbn;
//   const book = findBookByISBN(isbnParam);

//   if (book) {
//     res.json(book);
//   } else {
//     res.status(404).json({ error: "Book not found" });
//   }
// });

// // Define a route to get a review for a specific book by ISBN
// app.get("/books/:isbn/review", (req, res) => {
//   const isbnParam = req.params.isbn;
//   const review = getBookReview(isbnParam);

//   if (review) {
//     res.json(review);
//   } else {
//     res.status(404).json({ error: "Review not found" });
//   }
// });

// // Function to find a book by ISBN
// function findBookByISBN(isbn) {
//   return books.find((book) => book.isbn === isbn);
// }

// // Function to filter books by author
// function filterBooksByAuthor(author) {
//   return books.filter((book) => book.author === author);
// }

// // Function to get a book by title
// function getBookByTitle(title) {
//   return books.find((book) => book.title.toLowerCase() === title.toLowerCase());
// }

// // Function to get a review for a book by ISBN
// function getBookReview(isbn) {
//   // Placeholder review for demonstration purposes
//   return {
//     isbn: isbn,
//     review: "This is a great book! Highly recommended.",
//   };
// }

// // Listening port
// app.listen(5000, () => {
//   console.log("Server starting on Port 5000");
// });

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

// Middleware to verify the JWT token
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = user;
    next();
  });
}

const LoggedInusers = [];

// Books array
const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
  },
  {
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-486-60940-0",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0-261-10225-4",
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    isbn: "978-0-439-82777-5",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0-316-76948-0",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    isbn: "978-0-544-35343-8",
  },
  {
    title: "The Da Vinci Code",
    author: "Dan",
    isbn: "978-0-385-50420-5",
    name: "loyd",
  },
];


const users = ["userOne", "userTwo", "userThree", "userFour"];

// Define a route to update a book review by ISBN (PUT request)
app.put("/books/:isbn/review", authenticateToken, (req, res) => {
    const isbnParam = req.params.isbn;
    const { review } = req.body;
  
    // Find the book by ISBN
    const book = findBookByISBN(isbnParam);
  
    if (book) {
      // Update the review if the book is found
      book.review = review;
      res.json({ message: "Book review updated successfully", book });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  });

// Define a route to get the list of users
app.get("/api", (req, res) => {
  res.json({ users });
});

// Register a new user
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "Username already taken" });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user in the array (you should use a database in a real application)
  users.push({
    username,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User registered successfully" });
});

// Login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user in the array
  const user = users.find((user) => user.username === username);

  // If the user doesn't exist or the password is incorrect, return an error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Create a JWT token for the user
  const token = jwt.sign({ username: user.username }, "your-secret-key", {
    expiresIn: "1h", // Token expires in 1 hour
  });

  res.json({ token });
});

// Protected route that requires a valid token
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

// Your existing routes and functionality...

// Define a route to create a new user (POST request)
app.post("/api/users", (req, res) => {
  const newUser = req.body.user; // Assuming the user data is sent in the request body
  if (newUser) {
    users.push(newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } else {
    res.status(400).json({ error: "Invalid request, user data missing" });
  }
});

// Define a route to get the list of books
app.get("/books", (req, res) => {
  const authorName = req.query.author;
  const title = req.query.title;

  if (authorName) {
    // If the author query parameter is provided, filter books by author
    const filteredBooksByAuthor = filterBooksByAuthor(authorName);
    res.json({ bookList: filteredBooksByAuthor });
  } else if (title) {
    // If the title query parameter is provided, get the book by title
    const bookByTitle = getBookByTitle(title);
    if (bookByTitle) {
      res.json(bookByTitle);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } else {
    // If no author or title query parameters are provided, return the entire book list
    res.json({ bookList: books });
  }
});

// Define a route to get a specific book by ISBN
app.get("/books/:isbn", (req, res) => {
  const isbnParam = req.params.isbn;
  const book = findBookByISBN(isbnParam);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Define a route to get a review for a specific book by ISBN
app.get("/books/:isbn/review", (req, res) => {
  const isbnParam = req.params.isbn;
  const review = getBookReview(isbnParam);

  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ error: "Review not found" });
  }
});

// Function to find a book by ISBN
function findBookByISBN(isbn) {
  return books.find((book) => book.isbn === isbn);
}

// Function to filter books by author
function filterBooksByAuthor(author) {
  return books.filter((book) => book.author === author);
}

// Function to get a book by title
function getBookByTitle(title) {
  return books.find((book) => book.title.toLowerCase() === title.toLowerCase());
}

// Function to get a review for a book by ISBN
function getBookReview(isbn) {
  // Placeholder review for demonstration purposes
  return {
    isbn: isbn,
    review: "This is a great book! Highly recommended.",
  };
}

// Listening port
app.listen(5000, () => {
  console.log("Server starting on Port 5000");
});
