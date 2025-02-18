import { PropsWithChildren } from "react";

interface ErrorLabelProps {
  className?: string;
  bar?: boolean;
}

export default function ErrorLabel({children, className = "", bar = true}: PropsWithChildren<ErrorLabelProps>) {
    return (
      <div className={`text-center flex gap-2 text-red-600 font-bold uppercase text-sm ${className}`}>
        {bar &&  <p>-</p>} {children}
      </div>
    )
  }
  