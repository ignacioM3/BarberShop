import { PropsWithChildren } from "react";

interface PageTitleProps {
    className?: string
}


export function PageTitle({
    children,
    className = "",
}: PropsWithChildren<PageTitleProps>) {
    return (
        <h1
            className={`text-2xl font-heading text-left flex-grow mx-auto text-slate-600 ${className}`}
        >
            {children}
        </h1>
    );
}
