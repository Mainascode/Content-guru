import App from "./App";
import Home from "./components/pages/home";
import Courses from "./components/pages/course";
import Books from "./components/pages/book";
import BookDetails from "./components/pages/bookdetails";
import Services from "./components/pages/service";
import About from "./components/pages/about";
import Blog from "./components/pages/blog";
import Contact from "./components/pages/contact";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Success from "./components/pages/success";
import Cancel from "./components/pages/cancel";

const routes = [
    {
     path: "/",
      element: <App />,
      children:[
  { path: "/", element: <Home /> },
  { path: "/courses", element: <Courses /> },
  { path: "/books", element: <Books /> },
  {path:"/books/:title", element:<BookDetails />} ,
  { path: "/services", element: <Services /> },
  { path: "/about", element: <About /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/success", element: <Success /> },
  { path: "/cancel", element: <Cancel /> },
],
},
];


export default routes;
