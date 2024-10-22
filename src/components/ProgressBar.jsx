

const ProgressBar = ({ value, max, color }) => {
  return (
    <div className="w-full bg-[#BCB5B5] rounded-2xl overflow-hidden m-auto">
      <div className={`h-2.5 bg-${color}`} style={{ width: `${(value / max) * 100}%` }}>
      </div>
    </div>
  )
}

export default ProgressBar
