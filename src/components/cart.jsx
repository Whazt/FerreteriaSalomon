import { useId, useState } from "react";

export function Cart() {
  const cartChekId = useId();
  const [checked, setChecked] = useState('hidden');

  const handleCheck = (e) => {
    setChecked(e.target.checked ? 'block' : 'hidden');
  };

  return (
    <>
      <label className="text-center " htmlFor={cartChekId}>
        icono
      </label>
      <input id={cartChekId} type="checkbox" hidden onChange={handleCheck} />

      <aside className={`${checked} fixed bottom-0 right-0 w-80 h-screen  bg-white border border-gray-300 rounded-lg shadow-xl`}>
        <label className="bg-gray-300 right-0 top-0 " htmlFor={cartChekId}>
            X
        </label>
        <input id={cartChekId} type="checkbox" hidden onChange={handleCheck} />
        <ul>
          <li>
            <img src="" alt="" />
            <div>
              <strong>Producto</strong> - 1499
            </div>
            <footer>
              <small>Qty: 1</small>
              <button>+</button>
            </footer>
          </li>
        </ul>
        <button>limpiar</button>
        <footer>
            Total: 2222222
        </footer>
      </aside>
    </>
  );
}