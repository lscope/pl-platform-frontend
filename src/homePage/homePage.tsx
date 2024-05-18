import React from "react"
import { useLoaderData } from "react-router-dom"
import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { User } from "../session/SignUp"
import UserCard from "./userCard"
import LiftCard from "./liftCard"
import TotalCard from "./totalCard"
import NavBar from "./navbar"
import "../index.css"



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

const HomePage: React.FC = () => {
		const { responseSquat, responseBench, responseDeadlift } = useLoaderData() as LiftResponse

		const getMaxWeight = (maxWeight: number, current: Lift): number => {
			return current.weight > maxWeight ? current.weight : maxWeight
		}

		// Controllo se ho almeno un'alzata x.lenght > 0
		const squat: number | null = responseSquat.length > 0 ? responseSquat.reduce(getMaxWeight, responseSquat[0].weight) : null
		const benchPress: number | null = responseBench.length > 0 ? responseBench.reduce(getMaxWeight, responseBench[0].weight) : null
		const deadlift: number | null = responseDeadlift.length > 0 ? responseDeadlift.reduce(getMaxWeight, responseDeadlift[0].weight) : null
		const total: number = (squat ? squat : 0) + (benchPress ? benchPress : 0) + (deadlift ? deadlift : 0)

		return (
			<div>
				<NavBar />
				<div>
					<div>
						<UserCard />
						<TotalCard total={total} />
					</div>
					<div>
						<LiftCard lift="Squat" weight={squat} />
						<LiftCard lift="Bench Press" weight={benchPress} />
						<LiftCard lift="Deadlift" weight={deadlift} />
					</div>
				</div>
			</div>
		)
}

export default HomePage
export { loader }