import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // reset previous errors

    try {
      const captainData = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email,
        password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: Number(vehicleCapacity),
          vehicleType: vehicleType.toLowerCase(),
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("captainToken", data.token);
        navigate("/captain-login");
      }

      // reset form
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
    } catch (error) {
      console.error("Signup failed:", error);

      if (error.response && error.response.data) {
        if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else if (error.response.data.errors) {
          setErrorMessage(error.response.data.errors[0].msg);
        }
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="p-8 h-screen flex flex-col justify-between max-w-2xl mx-auto">
      <div className="space-y-6">
        <img
          className="w-20 mb-8"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png"
          alt="Uber Logo"
        />

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Display error message */}
          {errorMessage && (
            <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
          )}

          <div className="space-y-3">
            <h3 className="text-xl font-medium">What's our Captain name</h3>
            <div className="flex gap-4">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-3 border text-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-3 border text-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-medium">What's our Captain email</h3>
            <input
              required
              className="bg-[#eeeeee] rounded-lg px-4 py-3 border w-full text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-medium">Enter Password</h3>
            <input
              required
              className="bg-[#eeeeee] rounded-lg px-4 py-3 border w-full text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-medium">Vehicle Information</h3>
            <div className="flex gap-4">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-3 border text-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-3 border text-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-3 border text-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <select
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-3 border text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>
          </div>

          <button className="bg-[#111] text-white font-semibold rounded-lg px-4 py-3 w-full text-lg hover:bg-[#222] transition-colors">
            Create Captain Account
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </form>
      </div>

      <div className="mt-8">
        <p className="text-[10px] mt-6 text-gray-500 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline cursor-pointer">Google Privacy Policy</span> and{" "}
          <span className="underline cursor-pointer">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
