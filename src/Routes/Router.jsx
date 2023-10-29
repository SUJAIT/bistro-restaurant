
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Page/Home';
import Main from '../Page/Main';
import Menu from '../Page/Menu/Menu';
import Order from '../Page/Order/Order';

export const router = createBrowserRouter([
  {
    path:"/",
    element:<Main></Main>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:'menu',
          element:<Menu></Menu>
        },
        {
          path:"order/:category", //daynamic route
          element:<Order></Order>
        }
    ]
  }
])


