import React from "react"
import "../index.css"



interface totalCardType {
  total: number | null
}

const TotalCard: React.FC<totalCardType> = ({ total }) => {
  return (
    <div>
      <h1>All time total</h1>
      <h2>{total || "-/-"} kg</h2>
    </div>
  )
}

export default TotalCard