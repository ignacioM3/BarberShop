import { PropsWithChildren } from "react";

export function TitleModal({children}: PropsWithChildren) {
  return (
    <h1 className="text-center text-xl font-bold text-gray-600 border-b border-gray-600 pb-3">{children}</h1>
  )
}
