"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const UserDropdown = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user) =>
          user.name.first.toLowerCase().includes(query.toLowerCase())
        );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setQuery(`${user.name.first} ${user.name.last}`);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-[#222831] text-[#DFD0B8] font-sans">
      {/* Search Dropdown */}
      <div className="relative w-full max-w-md" ref={dropdownRef}>
        <div className="flex shadow-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onClick={() => setIsOpen(true)}
            className="w-full p-3 bg-[#393E46] text-[#DFD0B8] placeholder-[#948979] border-l border-t border-b border-[#948979] rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#948979] transition"
            placeholder="Search contacts..."
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 bg-[#948979] text-[#222831] border-t border-b border-r border-[#948979] rounded-r-xl hover:bg-[#DFD0B8] hover:text-[#222831] transition"
          >
            🔎
          </button>
        </div>

        {isOpen && (
          <ul className="absolute w-full z-10 mt-2 bg-[#393E46] border border-[#948979] rounded-xl shadow-lg max-h-64 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <li className="p-3 text-center text-[#DFD0B8] italic">
                No results found.
              </li>
            ) : (
              filteredUsers.map((user) => (
                <li
                  key={user.login.uuid}
                  onClick={() => handleSelectUser(user)}
                  className="px-4 py-2 cursor-pointer hover:bg-[#948979] hover:text-[#222831] transition-colors rounded-md"
                >
                  {user.name.first} {user.name.last}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* Selected User Card */}
      {selectedUser && (
        <div className="mt-10 w-full max-w-md bg-[#393E46] rounded-2xl shadow-xl border border-[#948979] p-6 flex flex-col items-center text-center space-y-3">
          <Image
            src={selectedUser.picture.large}
            alt="User Image"
            width={100}
            height={100}
            className="rounded-full border-4 border-[#948979] shadow-md"
          />
          <h2 className="text-2xl font-semibold">
            {`${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}`}
          </h2>
          <p className="text-sm text-[#DFD0B8]">{selectedUser.email}</p>
          <p className="text-sm text-[#DFD0B8]">{selectedUser.phone}</p>
          <p className="text-sm text-[#DFD0B8] capitalize">
            {selectedUser.gender}
          </p>
          <p className="text-sm text-[#DFD0B8]">
            {selectedUser.location.country}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
