import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { PropsWithChildren } from "react";

interface PageHeaderProps{
    className?: string;
    goBack?: boolean
}

export function PageHeader({
    children,
    className = "",
    goBack=false,
}: PropsWithChildren<PageHeaderProps>) {
    const navigate = useNavigate();

    return (
        <header>
            {!goBack && (
                <div className="w-full print:hidden">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 ">
                        <FaArrowLeft />
                        Volver
                    </button>
                </div>
            )}
            <div
                className={`flex w-full flex-wrap gap-2 py-4 md:p-4 items-center ${className}`}
            >
                {children}
            </div>
        </header>
    );
}