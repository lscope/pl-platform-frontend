import { Link } from "react-router-dom"

const Home = () => {
	return (
		<main>
			<h1>Powerlifting</h1>
			<h2>Track your PRs</h2>
			<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, enim tempora! Maiores natus porro voluptate veritatis esse reiciendis aperiam? Vitae, aliquid explicabo accusamus deleniti alias placeat et in ipsa quia.</p>
			<Link to="/login">
				<button>Login</button>
			</Link>
			<Link to="/sign-up">
				<button>Sign Up</button>
			</Link>
		</main>
	)
}

export default Home