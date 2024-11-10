'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '../api'

export default function Registro() {
  const [isNewCustomer, setIsNewCustomer] = useState<boolean | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      if (isNewCustomer) {
        await api.post('/clientes', {
          nombre: formData.get('nombre'),
          telefono: formData.get('telefono'),
          email: formData.get('email'),
          direccion: formData.get('direccion'),
        })
      } else {
        await api.post('/clientes/verificar', {
          nombre: formData.get('nombre'),
          telefono: formData.get('telefono'),
        })
      }
      router.push('/informacion-auto')
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error al procesar tu solicitud')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Registro / Identificación</h1>
      {isNewCustomer === null ? (
        <div className="space-y-4">
          <button
            onClick={() => setIsNewCustomer(true)}
            className="w-full bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-800 transition duration-300"
          >
            Soy un nuevo cliente
          </button>
          <button
            onClick={() => setIsNewCustomer(false)}
            className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition duration-300"
          >
            Ya tengo una cuenta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {isNewCustomer ? (
            <>
              <input name="nombre" type="text" placeholder="Nombre Completo" required className="w-full p-2 border border-gray-300 rounded" />
              <input name="telefono" type="tel" placeholder="Número de teléfono" required className="w-full p-2 border border-gray-300 rounded" />
              <input name="email" type="email" placeholder="Correo electrónico" required className="w-full p-2 border border-gray-300 rounded" />
              <input name="direccion" type="text" placeholder="Dirección" required className="w-full p-2 border border-gray-300 rounded" />
            </>
          ) : (
            <>
              <input name="nombre" type="text" placeholder="Nombre" required className="w-full p-2 border border-gray-300 rounded" />
              <input name="telefono" type="tel" placeholder="Número de teléfono" required className="w-full p-2 border border-gray-300 rounded" />
            </>
          )}
          <button
            type="submit"
            className="w-full bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-800 transition duration-300"
          >
            Continuar
          </button>
        </form>
      )}
    </div>
  )
}