import express from 'express';

const app = express();

app.get('/users',(request, response) =>{  
  response.json([
    'Rodrigo', 'Lucas', 'Liliane', 'Beatriz', 'Antonio']);
});

app.listen(3333);