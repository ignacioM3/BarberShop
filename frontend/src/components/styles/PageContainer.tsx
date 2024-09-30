import { PropsWithChildren } from "react";


interface PageContainerProps{
    className?: string
}


export function PageContainer({
    children,
    className = "",
}: PropsWithChildren<PageContainerProps>) {
    return (
        <main
            className={`p-4 flex-grow flex flex-col w-full mx-auto overflow-y-auto print:overflow-y-hidden ${className}`}
        >
            {children}
        </main>
    );
}
