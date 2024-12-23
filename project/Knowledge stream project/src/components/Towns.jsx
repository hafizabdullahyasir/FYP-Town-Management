import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Towns = () => {
  const [towns, setTowns] = useState([]);
  const [newTown, setNewTown] = useState({ id: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const navigate = useNavigate();

  // Fetch towns data from the backend on component mount
  useEffect(() => {
    const fetchTowns = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/town/get-all");
        const sortedTowns = response.data.data.data.rows.sort(
          (a, b) => a.TownId - b.TownId
        ); // Sort towns by TownId in ascending order
        setTowns(sortedTowns);
      } catch (err) {
        setError("Failed to fetch towns. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTowns();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTown({ ...newTown, [name]: value });
  };

  // Add a new town
  const handleAddTown = async () => {
    if (!newTown.id || !newTown.name) {
      alert("Please provide both ID and Name for the town.");
      return;
    }
    if (towns.some((town) => town.TownId === parseInt(newTown.id))) {
      alert("Town with this ID already exists.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/town/create", {
        TownId: newTown.id,
        townName: newTown.name,
      });

      const createdTown = response.data.data;
      const updatedTowns = [...towns, createdTown].sort(
        (a, b) => a.TownId - b.TownId
      ); // Sort after adding
      setTowns(updatedTowns);

      setNewTown({ id: "", name: "" });
    } catch (err) {
      alert("Failed to add town. Please try again.");
    }
  };

  // Delete a town
  const handleDeleteTown = async (TownId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this town?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/town/delete/${TownId}`);
      const updatedTowns = towns
        .filter((town) => town.TownId !== TownId)
        .sort((a, b) => a.TownId - b.TownId); // Sort after deleting
      setTowns(updatedTowns);
    } catch (err) {
      alert("Failed to delete town. Please try again.");
    }
  };

  // Filtered towns based on search query
  const filteredTowns = towns.filter((town) =>
    town.townName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-blue-600 min-h-screen">
      <div className="bg-blue-600">
        <Navbar />
      </div>
      <h1 className="text-3xl text-center font-Montserrat font-bold mb-6 text-white mt-5">
        Manage Towns
      </h1>

      {/* Form to add a new town */}
      <div className="bg-white shadow-lg rounded-md p-6 mb-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-Montserrat font-bold mb-4 text-gray-900">
          Create Town
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            name="id"
            value={newTown.id}
            onChange={handleChange}
            placeholder="Town ID"
            className="flex-1 border font-Montserrat font-bold border-gray-300 p-2 rounded-md focus:outline-blue-600"
          />
          <input
            type="text"
            name="name"
            value={newTown.name}
            onChange={handleChange}
            placeholder="Town Name"
            className="flex-1 border font-Montserrat font-bold border-gray-300 p-2 rounded-md focus:outline-blue-600"
          />
          <button
            onClick={handleAddTown}
            className="bg-blue-500 text-white px-4 py-2 font-Montserrat font-bold rounded-md hover:bg-blue-700 transition"
          >
            Add Town
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Town Name"
          className="w-full border font-Montserrat font-bold border-gray-300 p-2 rounded-md focus:outline-blue-600"
        />
      </div>

      {/* Display the list of towns */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center font-Montserrat font-bold text-white">
            Loading...
          </p>
        ) : error ? (
          <p className="text-center font-Montserrat font-bold text-red-500">
            {error}
          </p>
        ) : filteredTowns.length === 0 ? (
          <p className="text-center font-Montserrat font-bold text-white">
            No Towns Found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5">
            {filteredTowns.map((town) => (
              <div
                key={town.TownId}
                className="bg-blue-50 p-6 rounded-md shadow-white hover:shadow-2xl transition text-center text-blue-600  font-Montserrat font-bold"
              >
                <div className="text-lg">{town.townName}</div>
                <div className="text-sm text-gray-800">ID: {town.TownId}</div>
                <div className="mt-4">
                  <Link
                    to={`/towns/${town.TownId}`}
                    className="bg-blue-500 text-white px-4 py-2 font-Montserrat font-bold rounded-md hover:bg-blue-700 transition"
                  >
                    Add Plot
                  </Link>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => navigate(`/town-information/${town.TownId}`)}
                    className="bg-green-500 text-white px-4 py-2 font-Montserrat font-bold rounded-md hover:bg-green-700 transition"
                  >
                    View Plots
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteTown(town.TownId)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 font-Montserrat font-bold rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Towns;
