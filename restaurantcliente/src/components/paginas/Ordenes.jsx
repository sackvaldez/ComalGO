import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Orden from '../ui/Orden';

const Ordenes = () => {
  const { firebase } = useContext(FirebaseContext);
  const [ordenes, guardarOrdenes] = useState([]);

  useEffect(() => {
    const obtenerOrdenes = () => {
      firebase.db.collection('orders').where('status', '==', 0).onSnapshot(manejarSnapshot);
    };
    obtenerOrdenes();
  }, [firebase.db]);

  function manejarSnapshot(snapshot) {
    const ordenes = snapshot.docs.map(doc => ({
      idOrden: doc.data().idOrden,
      orden: doc.data().orden.map(platillo => ({
        id: platillo.id,
        cantidad: platillo.cantidad,
        nombre: platillo.nombrePlatillo,
        precio: platillo.precio,
        imagen: platillo.imagen,
      })),
      total: doc.data().total,
      tiempoEntrega: doc.data().tiempoEntrega,
      status: doc.data().status,
    }));

    guardarOrdenes(ordenes);
  }

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Ordenes</h1>
      <div className="sm:flex sm:flex-wrap -mx-3">
        {ordenes.map(orden => (
          <Orden 
            key={orden.idOrden} 
            orden={orden} 
          />
        ))}
      </div>
    </>
  );
};

export default Ordenes;