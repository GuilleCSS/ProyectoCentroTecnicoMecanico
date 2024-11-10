import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-red-700">Taller Upiit</h1>
      </header>

      <section className="relative h-96">
        <Image
          src="/placeholder.svg?height=400&width=800"
          alt="Coche en reparación"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-white text-2xl font-semibold max-w-2xl text-center px-4">
            Bienvenido a Taller Upiit, donde la excelencia en reparación automotriz se encuentra con la satisfacción del cliente.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Misión</h2>
          <p>Proveer servicios de reparación automotriz de alta calidad con un enfoque en la satisfacción del cliente.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Visión</h2>
          <p>Ser el taller mecánico líder en la región, reconocido por nuestra excelencia y compromiso.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Objetivos</h2>
          <p>Ofrecer servicios rápidos y eficientes, mantener altos estándares de calidad, y garantizar la satisfacción del cliente.</p>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">Ubicación</h2>
        <p className="mb-2">Dirección: UPIIT, TLAXCALA DE XICOHTENCATL</p>
        <p className="mb-4">Horarios de Atención: De lunes a viernes de 8 a.m a 7 p.m</p>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.761237551881!2d-98.23794908525141!3d19.32282198695398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfd8f92d86429d%3A0x8e595e1b00e4a533!2sUPIIT!5e0!3m2!1ses-419!2smx!4v1659123456789!5m2!1ses-419!2smx"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">Servicios Ofrecidos</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Reparación de motores', desc: 'Diagnóstico y reparación de problemas del motor para un rendimiento óptimo.' },
            { name: 'Cambio de aceite', desc: 'Mantenimiento regular para prolongar la vida útil de su vehículo.' },
            { name: 'Diagnóstico y reparación de frenos', desc: 'Garantizamos su seguridad con un sistema de frenos en perfecto estado.' },
            { name: 'Mantenimiento preventivo', desc: 'Evite problemas futuros con nuestro servicio de mantenimiento integral.' },
            { name: 'Reparación de sistemas eléctricos', desc: 'Soluciones para todos los problemas eléctricos de su vehículo.' },
          ].map((service, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold text-red-700">{service.name}</h3>
              <p className="text-sm text-gray-600">{service.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">Testimonios de Clientes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Cliente satisfecho"
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <p className="italic">"Excelente servicio, rápido y profesional. Altamente recomendado."</p>
              <p className="text-sm text-gray-600 mt-2">- Juan Pérez</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Cliente satisfecho"
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <p className="italic">"Siempre confío en Taller Upiit para el mantenimiento de mi vehículo."</p>
              <p className="text-sm text-gray-600 mt-2">- María González</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <Link href="/agendar" className="inline-block bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-800 transition duration-300">
          Agendar una Cita
        </Link>
      </section>
    </div>
  )
}