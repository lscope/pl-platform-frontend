import { Link } from "react-router-dom"
import React from "react"
import "./index.css"


const UnloggedHome: React.FC = () => {
	return (
		<div>
			<h1>PowerLifting PLatform</h1>
			<h2>Track your PRs</h2>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, enim tempora! Maiores natus porro voluptate veritatis esse reiciendis aperiam? Vitae, aliquid explicabo accusamus deleniti alias placeat et in ipsa quia.
			</p>
			<div>
				<Link to="/login">
					<button>
						Login
					</button>
				</Link>
				<Link to="/sign-up">
					<button>
						Sign Up
					</button>
				</Link>
			</div>
		</div>
	)
}

export default UnloggedHome