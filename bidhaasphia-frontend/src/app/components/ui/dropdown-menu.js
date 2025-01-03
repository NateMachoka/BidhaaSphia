'use client';

import { Menu } from '@headlessui/react';

export const DropdownMenu = ({ children }) => (
  <Menu as="div" className="relative inline-block text-left">
    {children}
  </Menu>
);

export const DropdownMenuTrigger = ({ children }) => (
  <Menu.Button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100">
    {children}
  </Menu.Button>
);

export const DropdownMenuContent = ({ children }) => (
  <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    {children}
  </Menu.Items>
);

export const DropdownMenuItem = ({ children }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={`${
          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
      >
        {children}
      </button>
    )}
  </Menu.Item>
);

export default DropdownMenu;
