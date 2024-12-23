import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"; // Axios for HTTP requests

const Receipt = () => {
  const [formData, setFormData] = useState({
    buyerName: "",
    fatherName: "",
    cnicNumber: "",
    shopHouseNumber: "",
    areaMeasurement: "",
    townName: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle errors
  const [success, setSuccess] = useState(""); // To handle success messages

  // Input change handler with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // CNIC validation (numeric only)
    if (name === "cnicNumber" && !/^\d*$/.test(value)) {
      setError("CNIC must contain numbers only.");
      return;
    }

    setError(""); // Clear error on valid input
    setFormData({
      ...formData,
      [name]: name === "amount" ? value || "0" : value,
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const {
      buyerName,
      fatherName,
      cnicNumber,
      shopHouseNumber,
      areaMeasurement,
      townName,
      amount,
    } = formData;
    if (
      !buyerName ||
      !fatherName ||
      !cnicNumber ||
      !shopHouseNumber ||
      !areaMeasurement ||
      !townName ||
      !amount
    ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // POST request to backend
      const response = await axios.post(
        "http://localhost:3000/receipt/create",
        formData
      );
      setSuccess("Receipt saved successfully!");
      setFormData({
        buyerName: "",
        fatherName: "",
        cnicNumber: "",
        shopHouseNumber: "",
        areaMeasurement: "",
        townName: "",
        amount: "",
      });
    } catch (err) {
      const message =
        err.response?.data?.error ||
        "Failed to save receipt. Please try again.";
      setError(message);
      console.error("Backend Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-600">
      <Navbar />
      <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen font-Montserrat font-bold rounded-md">
        <h1 className="text-2xl md:text-4xl font-bold text-blue-600 text-center mb-6">
          Receipt Information
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer's Name
                </label>
                <input
                  type="text"
                  name="buyerName"
                  value={formData.buyerName}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CNIC Number
              </label>
              <input
                type="text"
                name="cnicNumber"
                value={formData.cnicNumber}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shop/House Number
              </label>
              <input
                type="text"
                name="shopHouseNumber"
                value={formData.shopHouseNumber}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area Measurement
              </label>
              <input
                type="text"
                name="areaMeasurement"
                value={formData.areaMeasurement}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Town Name
              </label>
              <input
                type="text"
                name="townName"
                value={formData.townName}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
