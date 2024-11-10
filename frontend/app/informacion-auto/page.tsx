'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '../api'

export default function InformacionAuto() {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      await api.post('/vehiculos', {
        numeroSerie: formData.get('numeroSerie'),
        modelo: formData.get('modelo'),
        anio: formData.get('anio'),
        marca: formData.get('marca'),
        placas: formData.get('placas'),
        kilometraje: formData.get('kilometraje'),
        estado: formData.get('estado')
      })
      alert('¡Cita agendada con éxito!')
      router.push('/')
    } catch (error) {
      console.error('Error al registrar el vehículo:', error)
      alert('Hubo un error al registrar el vehículo. Por favor, intente de nuevo.')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Información del Auto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="numeroSerie" type="text" placeholder="Número de serie" required className="w-full p-2 border border-gray-300 rounded" />
        <input name="modelo" type="text" placeholder="Modelo" required className="w-full p-2 border border-gray-300 rounded" />
        <input name="anio" type="number" placeholder="Año" required className="w-full p-2 border border-gray-300 rounded" />
        <input name="marca" type="text" placeholder="Marca" required className="w-full p-2 border border-gray-300 rounded" />
        <input name="placas" type="text" placeholder="Placas" required className="w-full p-2 border border-gray-300 rounded" />
        <input name="kilometraje" type="number" placeholder="Kilometraje" required className="w-full p-2 border border-gray-300 rounded" />
        <select name="estado" required className="w-full p-2 border border-gray-300 rounded">
          <option value="">Seleccione el estado del vehículo</option>
          <option value="excelente">Excelente</option>
          <option value="bueno">Bueno</option>
          <option value="regular">Regular</option>
          <option value="malo">Malo</option>
        </select>
        <button
          type="submit"
          className="w-full bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-800 transition duration-300"
        >
          Agendar cita
        </button>
      </form>
    </div>
  )
}