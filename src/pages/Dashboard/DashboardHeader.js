import React from "react";

const DashboardHeader = ({ toggleModal }) => {
  return (
    <div className="my-5 flex items-center bg-blue-500 rounded-md text-white h-[15vh] px-5 justify-between">
      <h1 className="text-2xl">Dashboard</h1>
      <button
        className="bg-green-500 rounded-md px-5 py-2 text-lg"
        onClick={toggleModal}
      >
        Create Goal
      </button>
    </div>
  );
};

export default DashboardHeader;
