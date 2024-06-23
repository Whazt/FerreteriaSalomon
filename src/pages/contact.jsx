/* eslint-disable react/no-unknown-property */


function Contact() {
  return (
        <div className="grid grid-cols-2 gap-6 bg-white p-4 rounded shadow-md">
          <div className="col-span-1">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d344.7768834497005!2d-86.22554120994326!3d12.132314724391454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f71560dd907880b%3A0x76d4e561fb5d25db!2s4QJF%2BXR8%2C%20Managua!5e0!3m2!1ses-419!2sni!4v1719189174271!5m2!1ses-419!2sni" 
          width="600" 
          height="450" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          >
            
          </iframe>
            <p className="text-center mt-2">De los semáforos del Conchita Palacios, 3 cuadras abajo, 1/2 al lago.</p>
          </div>
          <div className="col-span-1 flex flex-col justify-center">
            <div className="mb-4">
              <h4 className="text-xl font-bold mb-2 text-orange-500">Horario De Atención:</h4>
              <p className="text-gray-700">Lunes a Viernes<br /> 8am a 5pm</p>
              <p className="text-gray-700">Sábados a Domingos<br /> 8am a 12md</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Nombre:</label>
              <input type="text" name="Nombre" id="Nombre" placeholder="Ej: Alberto Murillo" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Correo:</label>
              <input type="email" name="Correo" id="Correo" placeholder="Ej: ejemplo@eje.com" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Mensaje:</label>
              <input type="text" name="Mensaje" id="Mensaje" placeholder="Ej: Quiero Consultar Sobre..." className="w-full p-2 border rounded" />
            </div>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Enviar</button>
          </div>
        </div>
  );
}

export default Contact;

