'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'react-calendar/dist/Calendar.css'
import api from '../api'

// Cargar el componente Calendar dinámicamente solo en el cliente
const Calendar = dynamic(() => import('react-calendar'), { ssr: false })

export default function AgendarCita() {
  const [date, setDate] = useState<Date | null>(new Date())
  const [service, setService] = useState('')
  const router = useRouter()

  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setDate(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return
    try {
      await api.post('/citas', { fecha: date, servicio: service })
      router.push('/registro')
    } catch (error) {
      console.error('Error al agendar cita:', error)
      alert('Hubo un error al agendar la cita. Por favor, intente de nuevo.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Agendar una Cita</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Seleccione una fecha:</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="mx-auto bg-white p-2 rounded-lg shadow"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Seleccione un servicio:</h2>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Seleccione un servicio</option>
            <option value="reparacion-motores">Reparación de motores</option>
            <option value="cambio-aceite">Cambio de aceite</option>
            <option value="reparacion-frenos">Diagnóstico y reparación de frenos</option>
            <option value="mantenimiento-preventivo">Mantenimiento preventivo</option>
            <option value="reparacion-electrica">Reparación de sistemas eléctricos</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-800 transition duration-300"
        >
          Continuar la cita
        </button>
      </form>
    </div>
  )
}
