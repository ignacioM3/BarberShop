
interface LoadingSpinnerPops{
  className?: string
}


export default function LoadingSpinner({className = ""}: LoadingSpinnerPops) {
  return (
     <div className={`loading`}>
          <div className={`sk-chase ${className}`}>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
          </div>
      </div>
  )
}
