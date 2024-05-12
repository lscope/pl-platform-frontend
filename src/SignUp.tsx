import { Form, redirect, json, useActionData } from "react-router-dom"
import axios, { AxiosResponse } from "axios"
import { Token, loginRequest, storeCredentials } from "./login"




export interface User {
	id: number,
	email: string,
	register_dt: string, // La chiamata API restituisce un json, in cui la register_dt è una data. Però i json accettano solo stringhe e numeri, quindi la data viene convertita in stringa in un formato datetime ISO 8601 di python, però è stringa
}

const action = async ({ request }) => {
	const data = await request.formData()
	const email: string = data.get("email")
	const password: string = data.get("password")

	interface Credentials {
		email: string,
		password: string,
	}

	try {
		// Chiamata post per la creazione dell'utente
		const response: AxiosResponse = await axios.post<User, AxiosResponse<User, Credentials>, Credentials>(
			"http://127.0.0.1:8000/users",
			{
				email: email,
				password: password,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		// Faccio automaticamente il login, che mi restituisce il token
		const responseLogin: Token = await loginRequest(email, password)
		storeCredentials(responseLogin)

		return redirect("/home")
	} catch (error) {
		return json({messaggio: "errore"})
	}
}

const SignUp = () => {
	const actionData: Response = useActionData() as Response

	return (
		<>
			<h1>Sign Up</h1>
			<Form method="post">
				<label>
					Email:
					<input
						type="email"
						name="email" // nome dell'attributo acceduto nella funzione action
						required
						autoFocus
						placeholder="example@email.com"
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password" // nome dell'attributo acceduto nella funzione action
						required
						placeholder="Password.123"
					/>
				</label>
				<button>Sign-up</button>
			</Form>
		</>
	)
}

export default SignUp
export { action }