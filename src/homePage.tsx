import { useLoaderData } from "react-router-dom"
import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { User } from "./SignUp"




interface Lift {
	id: number,
	weight: number,
	rpe: number | null,
	notes: string | null,
	register_dt: string
	user: User,
}

interface LiftResponse {
	responseSquat: Lift[],
	responseBench: Lift[],
	responseDeadlift: Lift[],
}

const loader = async (): Promise<LiftResponse | Response> => {
	const accessToken: string | null = sessionStorage.getItem("accessToken")
	const userId: string | null = sessionStorage.getItem("userId")
	const configAxiosRequests: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		}
	}

	try {
		const responseSquat: AxiosResponse<Lift[], undefined> = await axios.get<Lift[], AxiosResponse<Lift[], undefined>, undefined>(
			`http://127.0.0.1:8000/lifts/${userId}?lift_type=squat`,
			configAxiosRequests,
		)
		const responseBench: AxiosResponse<Lift[], undefined> = await axios.get<Lift[], AxiosResponse<Lift[], undefined>, undefined>(
			`http://127.0.0.1:8000/lifts/${userId}?lift_type=bench`,
			configAxiosRequests,
		)
		const responseDeadlift: AxiosResponse<Lift[], undefined> = await axios.get<Lift[], AxiosResponse<Lift[], undefined>, undefined>(
			`http://127.0.0.1:8000/lifts/${userId}?lift_type=deadlift`,
			configAxiosRequests,
		)

		const response: LiftResponse = {
			responseSquat: responseSquat.data,
			responseBench: responseBench.data,
			responseDeadlift: responseDeadlift.data,
		}

		return response
	} catch (error) {
		return error.toJSON()
	}
}

const HomePage = () => {
		const { responseSquat, responseBench, responseDeadlift } = useLoaderData() as LiftResponse

		const getMaxWeight = (maxWeight: number, current: Lift): number => {
			return current.weight > maxWeight ? current.weight : maxWeight
		}

		const squat: number | null = responseSquat ? responseSquat.reduce(getMaxWeight, responseSquat[0].weight) : null
		const benchPress: number | null = responseBench ? responseBench.reduce(getMaxWeight, responseBench[0].weight) : null
		const deadlift: number | null = responseDeadlift ? responseDeadlift.reduce(getMaxWeight, responseDeadlift[0].weight) : null
		const total: number = (squat ? squat : 0) + (benchPress ? benchPress : 0) + (deadlift ? deadlift : 0)

		return (
				<div>
					<div className="navbar">
						{/* pulsante home */}
						{/* Pulsante profilo */}
					</div>
					<div className="body">
						<div className="main">
							<img/>
							<div className="prs"></div>
						</div>
						<div className="sidebar">
							<ul>
								<li key="1">Allenamenti</li>
								<li key="2">Statistiche</li>
							</ul>
						</div>
						<div className="button">
							<button>
								add weight
							</button>
						</div>
					</div>
				</div>
		)
}

export default HomePage
export { loader }