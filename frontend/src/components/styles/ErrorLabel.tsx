export default function ErrorLabel({children}: {children: React.ReactNode}) {
    return (
      <div className="text-center flex gap-2 text-red-600 font-bold uppercase text-sm">
         <p>-</p> {children}
      </div>
    )
  }
  