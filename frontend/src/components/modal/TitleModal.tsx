import { PropsWithChildren } from "react";

interface TitleModalProps{
  className?: string;
}

export function TitleModal({children, className}: PropsWithChildren<TitleModalProps>) {
  return (
    <h1 className={`text-center text-xl font-bold text-gray-600 border-b border-gray-600 pb-3 ${className}`}>{children}</h1>
  )
}
