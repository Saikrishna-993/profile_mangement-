import './App.css';
import AddUser from "./adduser/AddUser";
import User from "./getUser/User";
import ViewUsers from "./viewUser/ViewUser";
import Update from "./updateuser/Update";
import NotFound from "./usernotfound/NotFound";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const route= createBrowserRouter([
    {
      path:"/",
    element:<User/>,
    },
    {
      path:"/add",
      element:<AddUser/>,
    },

    {
      path: "/view/:id", 
      element:<ViewUsers/>      
    },

    {
      path: "/update/:id",
      element:<Update/>
    },

    {
      path: "/404",            
      element: <NotFound />
    },
    {
      path: "*",                
      element: <NotFound />
    },

  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
