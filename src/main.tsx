import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UnloggedHome from "./unloggedHome"
import HomePage, { loader as homePageLoader } from "./homePage/homePage"
import Login, { action as loginAction } from './session/login'
import SignUp, { action as signUpAction } from './session/SignUp'


const router = createBrowserRouter([
	{
		path: "/",
		element: <UnloggedHome />,
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
