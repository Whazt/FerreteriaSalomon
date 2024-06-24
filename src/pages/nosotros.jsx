
function Nosotros() {
  return (
    <div className="bg-white p-4 rounded shadow-md grid gap-6">
      <div className="mb-6 bg-orange-200 p-4 rounded-md shadow-md flex flex-col lg:flex-row">
        <div className="flex-1 lg:mr-4">
          <h2 className="text-2xl font-bold mb-2 text-center lg:text-left">¿Quiénes Somos?</h2>
          <p className="text-gray-700 text-center lg:text-left">Somos un equipo comprometido con la excelencia y la satisfacción del cliente. Desde nuestro inicio, nos hemos dedicado a proporcionar productos de calidad, asesoramiento experto y un servicio excepcional a nuestros clientes. Nos consideramos no solo proveedores, sino también socios en la realización de proyectos, ya sea pequeños trabajos de bricolaje o grandes construcciones.</p>
        </div>
        <div className="flex-2 lg:mr-4">
          <img src="/quienes_somos.jpg" alt="Quienes Somos" className="h-48 mt-4 lg:mt-0 lg:ml-4" />
        </div>
      </div>
      <div className="mb-6 bg-orange-200 p-4 rounded-md shadow-md flex flex-col lg:flex-row">
        <div className="flex-1 lg:mr-4">
          <h2 className="text-2xl font-bold mb-2 text-center lg:text-left">Misión</h2>
          <p className="text-gray-700 text-center lg:text-left">Proporcionar a nuestros clientes soluciones integrales para sus necesidades de construcción, reparación y mantenimiento, ofreciendo productos de calidad, asesoramiento experto y un servicio excepcional que supere sus expectativas. Nos esforzamos por ser el socio de confianza de cada cliente, brindando atención personalizada y soluciones adaptadas a sus requerimientos específicos.</p>
        </div>
        <div className="flex-2 lg:mr-4">
          <img src="/mision.jpg" alt="Misión" className="h-48 mt-4 lg:mt-0 lg:ml-4" />
        </div>
      </div>
      <div className="mb-6 bg-orange-200 p-4 rounded-md shadow-md flex flex-col lg:flex-row">
        <div className="flex-1 lg:mr-4">
          <h2 className="text-2xl font-bold mb-2 text-center lg:text-left">Visión</h2>
          <p className="text-gray-700 text-center lg:text-left">Convertirnos en la ferretería de referencia en nuestra comunidad y más allá, reconocida por nuestra excelencia en productos, servicio al cliente y compromiso con la sostenibilidad. Aspiramos a ser líderes en innovación dentro de nuestra industria, adaptándonos continuamente a las necesidades cambiantes del mercado y proporcionando soluciones innovadoras y sostenibles para la construcción y el mantenimiento del hogar y la industria.</p>
        </div>
        <div className="flex-2 lg:mr-4">
          <img src="/vision.jpg" alt="Visión" className="h-48 mt-4 lg:mt-0 lg:ml-4" />
        </div>
      </div>
      <div className="mb-6 bg-orange-200 p-4 rounded-md shadow-md flex flex-col lg:flex-row">
        <div className="flex-1 lg:mr-4">
          <h2 className="text-2xl font-bold mb-2 text-center lg:text-left">Valores</h2>
          <ol className="list-decimal list-inside text-gray-700 mx-auto lg:ml-12">
            <li>Calidad</li>
            <li>Integridad</li>
            <li>Compromiso</li>
            <li>Colaboración</li>
            <li>Responsabilidad</li>
          </ol>
        </div>
        <div className="flex-2 lg:mr-4">
          <img src="/valores.jpg" alt="Misión" className="h-48 mt-4 lg:mt-0 lg:ml-4" />
        </div>
      </div>
    </div>
  );
}

export default Nosotros;


