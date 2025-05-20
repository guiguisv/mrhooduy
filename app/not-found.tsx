import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#1a1a1a] px-4 text-center">
      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-black to-[#ccb699] dark:from-white dark:to-[#ccb699] bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#333333] text-white dark:bg-[#333333] dark:hover:bg-[#444444] rounded-full transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
