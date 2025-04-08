interface logoProps{
    className?: string
}

export default function Logo({className} : logoProps){
    return <img className={`cursor-pointer ${className}`} src="/logo.webp" alt="logo barber"  />
}
