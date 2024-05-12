import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./home"
import HomePage, { loader as homePageLoader } from "./homePage"
import Login, { action as loginAction } from './login'
import SignUp, { action as signUpAction } from './SignUp'


const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login/>,
		action: loginAction,
	},
	{
		path: "/sign-up",
		element: <SignUp/>,
		action: signUpAction,
	},
	{
		path: "/home",
		element: <HomePage />,
		loader: homePageLoader,
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>,
)
