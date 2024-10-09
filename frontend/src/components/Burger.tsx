
interface BurgerInterface {
    handleClick: () => void;
    clicked: boolean
}


export function Burger({ handleClick, clicked }: BurgerInterface) {

    return (
        <div 
            className={`icon nav-icon-5 ${clicked ? "open" : ''} md:hidden`}
            onClick={handleClick}
            >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}
