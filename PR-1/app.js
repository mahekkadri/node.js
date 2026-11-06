import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/moviesDB")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("DB Error");
  });

//Create a Schema= schema=blueprint for here movies
const movieSchema = mongoose.Schema({
  title: String,
  genre: String,
  director: String,
});

//add Schema in a DB
const movie = mongoose.model("movie", movieSchema);

app.get("/", (req, res) => {
  res.json({
    msg: "Home Page",
  });
});

//1.Add Movies
app.post("/addmovie", async (req, res) => {
  // console.log(req.body);
  const moviedata = await movie.create(req.body);
  res.json({
    msg: "Movie Added Successfully",
    data: moviedata,
  });
});

//2.Get All Movies
app.get("/getmovies", async (req, res) => {
  const moviedata = await movie.find();
  res.json({
    msg: "All Movies",
    data: moviedata,
  });
});

//3.Get Specific Movie
app.get("/getmovie", async (req, res) => {
  const moviedata = await movie.findOne(req.body);
  if (!moviedata) {
    res.json({
      msg: "Movie Not Found",
    });
  }
  res.json({
    msg: "Movie",
    data: moviedata,
  });
});

//4.Update Specific Movie : all data pass
app.put("/updatemovie", async (req, res) => {
  const updatemovie = await movie.findByIdAndUpdate(
    req.body.id,
    req.body.newData,
  );
  if (!updatemovie) {
    res.json({
      msg: "Movie Not Found",
    });
  }
  res.json({
    msg: "Movie Updated Successfully",
    data: updatemovie,
  });
});

//5.Delete Movie

app.delete("/deletemovie", async (req, res) => {
  const deletedMovie = await movie.findByIdAndDelete(req.body.id);

  if (!deletedMovie) {
    return res.json({
      msg: "Movie Not Found",
    });
  }

  res.json({
    msg: "Movie Deleted Successfully",
    data: deletedMovie,
  });
});

app.listen(3000);
//http://localhost:3000/