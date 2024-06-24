import React from 'react';

function Nosotros() {
  return (
    <div className="bg-white p-4 rounded shadow-md grid gap-6">
      {/* ¿Quiénes Somos? Section */}
      <div className="mb-6 bg-orange-400 p-4  text-white rounded-md shadow-md grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-2 text-center lg:text-left">¿Quiénes Somos?</h2>
          <p className="text-white text-center lg:text-left">
            Somos un equipo comprometido con la excelencia y la satisfacción del cliente. Desde nuestro inicio, nos hemos dedicado a proporcionar productos de calidad, asesoramiento experto y un servicio excepcional a nuestros clientes. Nos consideramos no solo proveedores, sino también socios en la realización de proyectos, ya sea pequeños trabajos de bricolaje o grandes construcciones.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img src="/quienes_somos.jpg" alt="Quienes Somos" className="h-48 mt-4 lg:mt-0 lg:ml-4 rounded-md object-cover" />
        </div>
      </div>

      {/* Misión Section */}
      <div className="mb-6 bg-orange-400 text-white  p-4 rounded-md shadow-md grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <div className="flex justify-center lg:justify-start">
          <img src="/mision.jpg" alt="Misión" className="h-48 mt-4 lg:mt-0 lg:mr-4 rounded-md object-cover" />
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-2 text-center lg:text-left">Misión</h2>
          <p className="text-white  text-center lg:text-left">
            Proporcionar a nuestros clientes soluciones integrales para sus necesidades de construcción, reparación y mantenimiento, ofreciendo productos de calidad, asesoramiento experto y un servicio excepcional que supere sus expectativas. Nos esforzamos por ser el socio de confianza de cada cliente, brindando atención personalizada y soluciones adaptadas a sus requerimientos específicos.
          </p>
        </div>
      </div>

      {/* Visión Section */}
      <div className="mb-6 bg-orange-400 text-white  p-4 rounded-md shadow-md grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-2 text-center lg:text-left">Visión</h2>
          <p className="text-white  text-center lg:text-left">
            Convertirnos en la ferretería de referencia en nuestra comunidad y más allá, reconocida por nuestra excelencia en productos, servicio al cliente y compromiso con la sostenibilidad. Aspiramos a ser líderes en innovación dentro de nuestra industria, adaptándonos continuamente a las necesidades cambiantes del mercado y proporcionando soluciones innovadoras y sostenibles para la construcción y el mantenimiento del hogar y la industria.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img src="/vision.jpg" alt="Visión" className="h-48 mt-4 lg:mt-0 lg:ml-4 rounded-md object-cover" />
        </div>
      </div>

      {/* Valores Section */}
      <div className="mb-6 bg-orange-400 p-4 rounded-md shadow-md grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <div className="flex justify-center lg:justify-start">
          <img src="/valores.jpg" alt="Valores" className="h-48 mt-4 lg:mt-0 lg:mr-4 rounded-md object-cover" />
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl  text-white  font-bold mb-2 text-center lg:text-left">Valores</h2>
          <ol className="list-decimal list-inside text-white  mx-auto lg:ml-12">
            <li>Calidad</li>
            <li>Integridad</li>
            <li>Compromiso</li>
            <li>Colaboración</li>
            <li>Responsabilidad</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
