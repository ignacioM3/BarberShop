
interface BurgerInterface {
    handleClick: () => void;
    clicked: boolean;
    className?: string;
}


export function Burger({ handleClick, clicked, className="" }: BurgerInterface) {

    return (
        <div 
            className={`icon nav-icon-5 ${clicked ? "open" : ''} md:hidden ${className}`}
            onClick={handleClick}
            >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}
