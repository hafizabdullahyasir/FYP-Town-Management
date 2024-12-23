import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const LeadgerBook = () => {
  const [ledgerData, setLedgerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLedgerData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/receipt/get-all"
        );
        setLedgerData(response.data.data.data.rows);
        // console.log("===========>>>", response);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch ledger data");
      } finally {
        setLoading(false);
      }
    };

    fetchLedgerData();
  }, []);

  // Filter ledger data based on CNIC search term
  const filteredLedgerData = ledgerData.filter((item) =>
    item.cnicNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-blue-600 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 bg-gray-50 font-Montserrat rounded-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Ledger Book
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by CNIC"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out hover:shadow-lg"
          />
        </div>

        {/* Loading and Error States */}
        {loading ? (
          <p className="text-center text-blue-600 font-bold">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 font-bold">{error}</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Buyer Name</th>
                  <th className="px-4 py-2 text-left">CNIC</th>
                  <th className="px-4 py-2 text-left">Shop/House #</th>
                  <th className="px-4 py-2 text-left">Town Name</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredLedgerData.length > 0 ? (
                  filteredLedgerData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{item.buyerName}</td>
                      <td className="px-4 py-2">{item.cnicNumber}</td>
                      <td className="px-4 py-2">{item.shopHouseNumber}</td>
                      <td className="px-4 py-2">{item.townName}</td>
                      <td className="px-4 py-2">{item.amount} PKR</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadgerBook;
