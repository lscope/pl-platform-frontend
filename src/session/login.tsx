import { Form, json, redirect, useActionData } from "react-router-dom"
import axios, { AxiosResponse } from "axios"
import { jwtDecode } from "jwt-decode"
import React from "react"
import "../index.css"



// Il tipo token si aspetta due attributi mandatori, uno stringa e uno con il valore "bearer"
export interface Token {
	access_token: string,
	token_type: "bearer",
}

interface DecodedToken {
	user_id: number,
}

// loginRequest come tipo di output ha una Promise che una volta risolta restituisce un oggetto di tipo Token
const loginRequest = async (username: string, password: string): Promise<Token> => {
	// Creo la form da inviare nella richiesta http
	const formBody: FormData = new FormData()

	formBody.append("username", username)
	formBody.append("password", password)

	// Richiesta http al backend
	// I metodi di axios, come in questo caso .post, si aspettano tre type parameters (generici).
	// 1. Il tipo dell'attributo .data della risposta, in questo caso Token
	// 2. Il tipo completo di output della chiamata, quindi AxiosResponse<tipo al punto 1, tipo al punto 3>
	// 3. Il tipo dei dati passati come body della richiesta. Questo chiaramente vale per quelle richieste in cui è necessario passare dei dati, come una post o patch o put, mentre per le get non si passa nulla, quindi si mette undefined
	const response: AxiosResponse<Token, FormData> = await axios.post<Token, AxiosResponse<Token, FormData>, FormData>("http://127.0.0.1:8000/login", formBody)

	return response.data
}

const storeCredentials = (data: Token): void => {
	// Recupero dati
	const accessToken: string = data.access_token
	const decode: DecodedToken = jwtDecode<DecodedToken>(accessToken) // Il token decodificato è di tipo DecodedToken, definito sopra con una struttura specifica
	const userIdString: string = decode.user_id.toString() // necessario convertirlo in quanto sessionStorage.setItem vuole solo stringhe

	// Storicizzazione
	sessionStorage.setItem("accessToken", accessToken)
	sessionStorage.setItem("userId", userIdString)
}

const action = async ({ request }): Promise<Response> => {
	const data: FormData = await request.formData()
	const email: string | null | File = data.get("email")
	const password: string | null | File = data.get("password")

	if (typeof email === "string" && typeof password === "string") {
		try {
			const responseLogin: Token = await loginRequest(email, password)
			storeCredentials(responseLogin) // Salvo il token e le credenziali della sessione

			return redirect("/home")
		} catch (error) {
			return json({messaggio: "errore"})
		}
	} else {
		return json({messaggio: "Dati di input non validi"}, {status: 400})
	}
}

const Login: React.FC = () => {
	const actionData: Response = useActionData() as Response

	return (
		<div>
			<h1>Login</h1>
			<Form method="post">
				<div>
					<label>
						Email:
						<input
							type="email"
							name="email"
							required
							autoFocus
							placeholder="example@email.com"
						/>
					</label>
				</div>
				<div>
					<label>
						Password:
						<input
							type="password"
							name="password"
							required
							placeholder="password"
						/>
					</label>
				</div>
				<div>
					<button>
						Login
					</button>
				</div>
			</Form>
		</div>
	)
}




export default Login
export { action, loginRequest, storeCredentials }