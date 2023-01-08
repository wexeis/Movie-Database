const express = require('express');
const app = express()

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.get('/test',(req, res) =>{
res.send({ status: 200, message: 'ok' })
});

app.get('/time', (req, res) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    res.send({ status: 200, message: `${hours}:${minutes}` });
  });
  
  app.get('/hello/:ID', (req, res) =>{
    const ID = req.params.ID || "";
    res.send({ status: 200, message: `Hello ${ID}` })
    });
    app.get('/hello/', (req, res) =>{
        
        res.send({ status: 200, message: `Hello` })
        });

        app.get('/search', (req, res) => {
            const search = req.query.s
            if (search) {
              res.status(200).send({
                status: 200,
                message: 'ok',
                data: search
              })
            } else {
              res.status(500).send({
                status: 500,
                error: true,
                message: 'you have to provide a search'
              })
            }
          })

          
app.get('/movies/add', (req, res) => {
   
    const title = req.query.title;
    const year = req.query.year;
    const rating = req.query.rating;
  
    if (!title || !year || year < 4 || isNaN(year)) {
      return res.json({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' });
    }
  
    if (!rating) {
      rating = 4;
    }
  
    const movie = { title, year, rating };
    movies.push(movie);
  
    res.send(movies);
  });
  //
    app.get('/movies/update/:id', (req, res) =>{
            const id = req.params.id;
            const title = req.query.title;
            const year = req.query.year;
            const rating = req.query.rating;
            const movie = movies[id];

         if (!movie) {
          return res.json({ status: 404, error: true, message: 'movie not found' });
  }

            if (title) {
          movie.title = title;
  }

  if (rating) {
    movie.rating = rating;
  }
if(year){
    movie.year = year
}
  res.json(movies);
});
           

          app.get('/movies/create', (req, res) => {
           
            res.send('Creating movie...')
          })
          
          app.get('/movies/read',  (req, res) => {
           
            res.send({ status: 200, data: movies
            //     .forEach(Object =>{
            //    console.log(`${Object.title} + ${Object.year} + ${Object.rating}`)
            // }) 
        });
          });


          app.get('/movies/read/by-date', function(req, res) {
            movies.sort(function(a, b) {
              return a.year - b.year;
            });
            res.status(200).json({
              status: 200,
              data: movies
            });
          });
          

          app.get('/movies/read/by-rating', function(req, res) {
             movies.sort(function(a, b) {
              return b.rating - a.rating;
            });
           res.status(200).json({
              status: 200,
              data: movies
            });
          });
          app.get('/movies/read/by-title', function(req, res) {
            movies.sort(function(a, b) {
              if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
            });
            res.status(200).json({
              status: 200,
              data: movies
            });
          });


        app.get('/movies/read/id/:id', (req, res) => {
            const id = req.params.id
            const movie = movies.find(movie => movie.title === id)
  
                if (movie) {
                  res.status(200).send({ status: 200, data: movie })
            } else {
             res.status(404).send({ status: 404, error: true, message: `the movie ${id} does not exist` }) }
             })

          app.get('/movies/update', (req, res) => {
          
            res.send('Updating movie')
          })


          app.get('/movies/update', (req, res) => {
          
            res.send('Updating movie')
          })
          
          app.get('/movies/delete', (req, res) => {
            
            res.send('Deleting movie')
          })

          /* 
          
          delete
          */

        //   app.get('/movies/delete/:id', (req, res) => {
        //     const id = req.params.id;
        //     const movieIndex = movies.findIndex(movie => movie.title === id);
        //     if (movieIndex !== -1) {
        //       movies.splice(movieIndex, 1);
        //       res.send({ status: 200, data: movies });
        //     } else {
        //       res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
        //     }
        //   });

        app.get('/movies/delete/:id', (req, res) => {
            const id = req.params.id;
            const movieIndex = movies[id]
            if (id > 0 && id < movies.lenght ) {
              movies.splice(id - 1, 1);
              res.send({ status: 200, data: movies });
            } else {
              res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
            }
          });

app.listen(3000, () => {console.log('ok')});