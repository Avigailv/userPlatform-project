import Home from '../src/components/home';
import Login from '../src/components/login/login';
import Register from '../src/components/login/register';
import FullRegister from '../src/components/login/fullRegister';
import Info from './components/Application/Info';
import Posts from './components/Application/Posts/Posts';
import Post from './components/Application/Posts/post';
import Comment from './components/Application/Posts/comment';
import Comments from './components/Application/Posts/Comments';
import Todos from './components/Application/Todos/Todos';
import Todo from './components/Application/Todos/todo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fullRegister" element={<FullRegister />} />
        <Route path="home/users/:userId" element={<Home />}>
          <Route path="Info" element={<Info />} />
          <Route path="Posts" element={<Posts />}>
            <Route path=":postId" element={<Post />} >
              <Route path="Comments" element={<Comments />} >
                <Route path=":commentId" element={<Comment />} />
              </Route>
            </Route>
          </Route>
          <Route path="Todos" element={<Todos />} >
            <Route path=":todoId" element={<Todo />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  )
}
export default App;
