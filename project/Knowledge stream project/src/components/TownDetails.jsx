import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const TownDetails = () => {
  const [formData, setFormData] = useState({
    CustomerName: "",
    FatherName: "",
    Address: "",
    PhoneNo: "",
    CNIC: "",
    PlotNumber: 0,
    TotalArea: 0,
    PricePerMarla: 0,
    TotalPrice: 0,
    MonthlyInstallment: 0,
    PaidAmount: 0,
    ToBePaid: 0,
    TotalInstallments: 0,
    PropertyType: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send data to backend API
      const response = await axios.post(
        "http://localhost:3000/plot/create", // Replace with your backend API URL
        formData
      );
      console.log("Response:", response.data);

      // Clear form on success
      setFormData({
        CustomerName: "",
        FatherName: "",
        Address: "",
        PhoneNo: "",
        CNIC: "",
        PlotNumber: "",
        TotalArea: "",
        PricePerMarla: "",
        TotalPrice: "",
        MonthlyInstallment: "",
        PaidAmount: "",
        ToBePaid: "",
        TotalInstallments: "",
        PropertyType: "",
      });

      alert("Plot details saved successfully!");
    } catch (err) {
      console.error("Error saving plot details:", err);
      setError("Failed to save plot details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-600 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 bg-gray-50 font-Montserrat rounded-md shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-blue-600 text-center mb-6">
          Add Plot Details
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          {Object.keys(formData).map(
            (key) =>
              key !== "PropertyType" && (
                <div key={key} className="mb-4">
                  <label
                    htmlFor={key}
                    className="block text-gray-700 font-bold mb-2"
                  >
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                  </label>
                  <input
                    type={
                      [
                        "PlotNumber",
                        "TotalArea",
                        "PricePerMarla",
                        "TotalPrice",
                        "MonthlyInstallment",
                        "PaidAmount",
                        "ToBePaid",
                        "TotalInstallments",
                      ].includes(key)
                        ? "number"
                        : "text"
                    }
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    {...([
                      "PlotNumber",
                      "TotalArea",
                      "PricePerMarla",
                      "TotalPrice",
                      "MonthlyInstallment",
                      "TotalInstallments",
                    ].includes(key) && { min: "1" })}
                    {...(["PaidAmount", "ToBePaid"].includes(key) && {
                      min: "0",
                    })}
                    {...(key === "CNIC" && {
                      maxLength: "13",
                      pattern: "\\d{13}",
                    })}
                  />
                </div>
              )
          )}

          {/* Property Type as Radio Buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              PROPERTY TYPE:
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center text-gray-700">
                <input
                  type="radio"
                  name="PropertyType"
                  value="domestic"
                  checked={formData.PropertyType === "domestic"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2">Domestic</span>
              </label>

              <label className="flex items-center text-gray-700">
                <input
                  type="radio"
                  name="PropertyType"
                  value="commercial"
                  checked={formData.PropertyType === "commercial"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2">Commercial</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md font-bold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Plot Details"}
          </button>
          {error && <p className="text-red-500 mt-4 font-bold">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default TownDetails;
