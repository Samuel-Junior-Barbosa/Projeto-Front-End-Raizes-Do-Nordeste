
function CircularProgress({ progress = 75, size = 120, stroke = 10 }) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
      }}
    >
      <svg width={size} height={size}>
        {/* Fundo */}
        <circle
          stroke="#ddd"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progresso */}
        <circle
          stroke="#4caf50"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>

      {/* Texto central */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {progress}%
      </div>
    </div>
  );
}


export default CircularProgress;