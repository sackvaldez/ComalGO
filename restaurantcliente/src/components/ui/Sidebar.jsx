import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          RestaurantApp
        </p>

        <p className="mt-3 text-gray-600">
          Admininistra tu restaurant en las siguientes opciones:
        </p>

        <nav className='mt-10'>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " p-1 block text-yellow-500  "
                : "p-1 block text-gray-400 hover:bg-yellow-500 hover:text-gray-900"
            }
            exact='true'
            to="/"
          >
            Ordenes
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? " p-1 block text-yellow-500  "
                : "p-1 block text-gray-400 hover:bg-yellow-500 hover:text-gray-900"
            }
            exact='true'
            to="/menu"
          >
            Menú
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar
