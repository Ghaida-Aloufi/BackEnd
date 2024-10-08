import express from "express";
const app = express();

app.use(express.json());

let users = []; 
let blogs=[]

app.get('/users', (req, res) => {
  res.json(users); 
});

app.post('/users', (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.json(newUser);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params; 
  const userIndex = users.findIndex(user => user.id === parseInt(id));

  if (userIndex !== -1) {
    users.splice(userIndex, 1); 
    return res.status(204).send(); 
  }

  res.status(404).json({ message: 'User not found' }); 
});



app.get('/blog', (req, res) => {
  res.json(blogs); 
});


app.patch('/blog/:id', (req, res) => {
  const blogId = parseInt(req.params.id);  
  const blog = blogs.find(b => b.id === blogId);  

  if (blog) {
    const { title, content, author } = req.body;  
    blog.title = title || blog.title;  
    blog.content = content || blog.content;  
    blog.author = author || blog.author;  
   
  }  res.json(blog);  
  
});

app.post('/blog', (req, res) => {
  console.log(req.body);

  const { title, content, name } = req.body;
  const newBlog = { id: blogs.length + 1, title, content, name };
  blogs.push(newBlog);
  res.json(newBlog);
});

app.delete('/blog/:id', (req, res) => {
  const { id } = parseInt(req.params.id); 
  const blogIndex = blogs.find(blog => blog.id === id);

    blogs.splice(blogIndex, 1); 
    res.json(blogIndex);
 
});[]


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
