"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import UserDropdown from "@/components/UserDropdown";

const Home = () => {
  const [users, setUsers] = useState(null);
  const fetchData = async () => {
    try {
      const res = await axios.get("https://randomuser.me/api/?results=100");
      // console.log(res.data.results);
      return res.data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchData();
      setUsers(data);
    };
    fetchUsers();
    console.log("history", users);
  }, []);
  if (!users) {
    return (
      <div className="flex items-center justify-center min-h-screen py-2  bg-[#cac4bb] ">
        <h1 className="text-3xl font-bold text-black">Loading Users...</h1>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-[#222831] text-[#DFD0B8] flex flex-col items-center justify-center p-6 space-y-6">
        <h1 className="text-4xl font-bold text-[#cac4bb]">
          Broker Bro Assignment
        </h1>
        <div className="w-full max-w-xl">
          <UserDropdown users={users} />
        </div>
      </div>
    </>
  );
};

export default Home;
