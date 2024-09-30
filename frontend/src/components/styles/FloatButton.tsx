import { PropsWithChildren } from "react";


interface FloatButtonProps{
    className: string;
    onClick: () => void;
}

export default function FloatButton({
    children,
    className,
    onClick
}: PropsWithChildren<FloatButtonProps>) {
    return (
        <div className='fixed bottom-20 right-4'>
            <button 
                className={`bg-gray-500 text-white p-4 rounded-full ${className}`}
                onClick={onClick}
                >
                {children}
            </button>
        </div>
    )
}
