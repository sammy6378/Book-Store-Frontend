import React from 'react';
export function Nav(){
return(
    <>
    <nav className="w-64 p-4">
      <ul>
        <li className="mb-4">
          <a href="#" className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded">
            Concepts
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded">
            Getting Started
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded">
            API
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded">
            Guides
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded">
            Helpers
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded">
            Tables
          </a>
        </li>
        <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded">
              Check Database
            </a>
  
        </li>
      </ul>
    </nav>
    
    </>
)
}