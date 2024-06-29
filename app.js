const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { dbConnect } = require('./config/dbConfig');
const { getUserRouter } = require('./routes/user/getUser')
const { getUsersRouter } = require('./routes/user/getUsers')
const { registerRouter } = require('./routes/authentication/register')
const { loginRouter } = require('./routes/authentication/login')
const { getBooksRouter } = require('./routes/book/getBooks')
const { getBookRouter } = require('./routes/book/getBook')
const { addBookRouter } = require('./routes/book/addBook')
const { editBookRouter } = require('./routes/book/editBook')
const { getReviewsRouter } = require('./routes/review/getReviews')
const { addReviewRouter } = require('./routes/review/addReview')
const { deleteReviewRouter } = require('./routes/review/deleteReview')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({msg:'Welcome to store'})
})

app.use(getUserRouter)
app.use(getUsersRouter)
app.use(registerRouter)
app.use(loginRouter)
app.use(getBooksRouter)
app.use(getBookRouter)
app.use(addBookRouter)
app.use(editBookRouter)
app.use(getReviewsRouter)
app.use(addReviewRouter)
app.use(deleteReviewRouter)

dbConnect();

try {
    const port = process.env.PORT || 8080;
    app.listen(port, console.log(`Server running on port ${port}!`));
} catch (error) {
    console.log(error);
}