// Orden.js
import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

const Orden = ({ orden }) => {
  const [tiempoEntrega, guardarTiempoEntrega] = useState(0);
  const { firebase } = useContext(FirebaseContext);

  const definirTiempo = idOrden => {
    try {
      firebase.db.collection('orders')
        .doc(idOrden)
        .update({
          tiempoEntrega
        });
    } catch (error) {
      console.log(error);
    }
  }

  const completarOrden = idOrden => {
    try {
      firebase.db.collection('orders')
        .where('idOrden', '==', idOrden)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.update({
              status: 1
            });
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4'>
      <div className='p-3 shadow-md bg-white'>
        <h1 className='text-yellow-600 text-lg font-bold'>{orden.idOrden}</h1>
        {orden.orden.map(platillo => (
          <div key={platillo.id} className='mb-2'>
            <p className='text-gray-600'>{platillo.cantidad} {platillo.nombre}</p>
            <img src={platillo.imagen} alt={platillo.nombre} className='w-16 h-16 object-cover' />
          </div>
        ))}
        <p className='text-gray-700 font-bold'>Total a Pagar: {orden.total}</p>
        {orden.tiempoEntrega === 0 && (
          <div className="mb-4">
            <label className='block text-gray-700 text-sm font-bold'>
              Tiempo de Entrega
            </label>
            <input 
              type='number'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              min='1'
              max='30'
              placeholder='20'
              value={tiempoEntrega}
              onChange={e => guardarTiempoEntrega(parseInt(e.target.value))}
            />
            <button
              onClick={() => definirTiempo(orden.idOrden)}
              type='submit'
              className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold'
            >Definir tiempo</button>
          </div>
        )}
        {orden.tiempoEntrega > 0 && (
          <p className='text-gray-700'>Tiempo de Entrega: 
            <span className='font-bold'>{orden.tiempoEntrega} minutos</span>
          </p>
        )}
        {!orden.status > 0 && (
          <button
            type='button'
            className='bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold'
            onClick={() => completarOrden(orden.idOrden)}
          >
            Marcar como lista
          </button>
        )}
      </div>
    </div>
  );
}

export default Orden;