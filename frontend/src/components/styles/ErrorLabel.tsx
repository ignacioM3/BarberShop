import { PropsWithChildren } from "react";

interface ErrorLabelProps {
  className?: string;
}

export default function ErrorLabel({children, className = ""}: PropsWithChildren<ErrorLabelProps>) {
    return (
      <div className={`text-center flex gap-2 text-red-600 font-bold uppercase text-sm ${className}`}>
         <p>-</p> {children}
      </div>
    )
  }
  