import Logo from "./styles/Logo";

export function Footer() {
  return (
    <footer className="bg-white border-t-2 shadow-sm rounded-t-md mt-10 flex flex-col items-center justify-center text-center py-4 md:flex-row md:justify-between md:px-20 md:py-0">
        <Logo className="hidden w-[100px] md:block"/>
        <div className="text-md flex flex-col gap-2 mt-2">
            <p>© 2024-2025 Buenos Aires Barbershop. Todos los derechos reservados.</p>
            <p> ® Buenos Aires Barbershop y su logo son marca registrada.</p>
        </div>
    </footer>
  )
}