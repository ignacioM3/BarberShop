import { CgMathPlus } from "react-icons/cg";
import { PropsWithChildren } from "react";
import FloatButton from "./FloatButton";

interface ListAddButtonProps{
    to?: string;
    onClick: () => void
}

export function ListAddButton({
    children,
    onClick 
}: PropsWithChildren<ListAddButtonProps>) {
    return (
        <>
            <button 
                className="hidden md:flex items-center gap-2 justify-center p-2 bg-gray-500 rounded hover:bg-gray-400 text-white transition-colors"
                onClick={onClick}
                >
                <CgMathPlus />
                {children}
            </button>
            <FloatButton
                className="md:hidden text-xl"
                onClick={onClick}
                >
                <CgMathPlus />
            </FloatButton>
        </>
    )
}