import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const TownInformation = () => {
  const [townDetails, setTownDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]); // For search functionality
  const [searchCNIC, setSearchCNIC] = useState(""); // Search input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch town details from the backend API
  useEffect(() => {
    const fetchTownDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/plot/get-all");
        const sortedData = response.data.data.data.rows.sort(
          (a, b) => a.PlotNumber - b.PlotNumber
        ); // Sort by PlotNumber in ascending order
        setTownDetails(sortedData);
        setFilteredDetails(sortedData); // Set filtered data to the initial sorted data
      } catch (err) {
        setError("Failed to fetch town details");
      } finally {
        setLoading(false);
      }
    };

    fetchTownDetails();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchCNIC(value);

    // Filter town details based on CNIC
    const filtered = townDetails.filter((town) =>
      town.CNIC.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDetails(filtered);
  };

  if (loading) return <div>Loading...</div>; // Loading indicator while fetching data

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 min-h-screen text-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4 bg-gray-50 font-Montserrat text-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-blue-700 text-center mb-6">
          Town Information
        </h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            value={searchCNIC}
            onChange={handleSearchChange}
            placeholder="Search by CNIC"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {filteredDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDetails.map((town, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-300 hover:shadow-2xl transition-all duration-300"
              >
                <div className="font-Montserrat font-normal text-sm">
                  <h2 className="text-xl font-semibold text-blue-600 mb-3 text-center">
                    Plot No: {town.PlotNumber}
                  </h2>

                  <p className="text-gray-700 mb-1">
                    <strong>Customer's Name:</strong> {town.CustomerName}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Father's Name:</strong> {town.FatherName}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Phone No:</strong> {town.PhoneNo}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>CNIC:</strong> {town.CNIC}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Plot Size:</strong> {town.TotalArea}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Price Per Marla:</strong> Rs {town.PricePerMarla}
                  </p>
                  <p className="text-green-600 mb-1">
                    <strong>Total Price:</strong> Rs {town.TotalPrice}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Monthly Installment:</strong> Rs{" "}
                    {town.MonthlyInstallment}
                  </p>
                  <p className="text-blue-600 mb-1">
                    <strong>Paid Amount:</strong> Rs {town.PaidAmount}
                  </p>
                  <p className="text-red-600 mb-1">
                    <strong>To Be Paid:</strong> Rs {town.ToBePaid}
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Total Installments:</strong>{" "}
                    {town.TotalInstallments}
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Property Type:</strong> {town.PropertyType}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No matching town information available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TownInformation;
