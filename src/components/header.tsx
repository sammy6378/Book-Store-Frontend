import me from '../assets/me.jpg'
import bar from '../assets/bar.svg'
// import React from 'react';
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.img');
  menuButton?.addEventListener('click', showMenu);
});

function showMenu() {
  const menu = document.querySelector('.left-nav');
  menu?.classList.toggle('show');
}


export default function Header() {
    return(
<div className="navbar shadow-md bg-slate-800">
  <div className="flex-1 img">
    <div className="bg-slate-200 p-1 rounded cursor-pointer md:hidden">
    <img src={bar} alt="" className='md:hidden block' onClick={showMenu} />
    </div>
    <a className="btn btn-ghost text-xl">Samuel Mwangi</a>
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={me} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-3 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    )
}