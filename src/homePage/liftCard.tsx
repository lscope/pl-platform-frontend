import React from "react"
import "../index.css"


interface liftCardProps {
  lift: "Squat" | "Bench Press" | "Deadlift",
  weight: number | null,
}

const LiftCard: React.FC<liftCardProps> = ({ lift, weight }) => {
  return (
    <div>
      <h1>{lift}</h1>
      <h1>{weight || "-/-"} kg</h1>
      <button>Add weight</button>
    </div>
  )
}

export default LiftCard