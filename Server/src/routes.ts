import expresss from 'express';

const routes = expresss.Router();

const users=[
  'Rodrigo', 'Lucas', 'Liliane', 'Beatriz', 'Antonio'];

routes.get('/users',(request, response) =>{  
  const search = String(request.query.search);
  const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
  response.json(filteredUsers);
});

routes.get('/users/:id',(request, response)=>{
  const id = Number(request.params.id);
  const user = users[id];
  
  return response.json(user);
});

routes.post('/users', (request, response) =>{
  const data = request.body;
  console.log(data);

  const user = {
    name: data.name,
    email: data.email,
  };
  return response.json(user);
});

export default routes;