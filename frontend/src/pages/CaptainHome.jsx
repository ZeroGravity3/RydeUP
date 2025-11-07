import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../component/CapptainDetails";
import RidePopUp from "../component/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../component/ConfirmRidePopUp";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

   useEffect(() => {
  let joined = false;

  if (captain?._id && socket && !joined) {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });
    joined = true;
    console.log(`✅ Captain ${captain._id} joined once`);
  }

  return () => {
    joined = false;
  };
}, [captain?._id]);

  // changes done here 
  // useEffect(() => {
  //   // Only join socket and start sending location after captain data is available
  //   if (!captain || !captain._id) return;

  //   socket.emit("join", {
  //     userId: captain._id,
  //     userType: "captain",
  //   });

  //   const updateLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         socket.emit("update-location-captain", {
  //           userId: captain._id,
  //           location: {
  //             ltd: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           },
  //         });
  //       });
  //     }
  //   };

  //   const locationInterval = setInterval(updateLocation, 10000);
  //   updateLocation();

  //   return () => clearInterval(locationInterval);
  // }, [captain, socket]);

  // Register socket listener for new rides and clean up when component unmounts or socket/captain changes
  // useEffect(() => {
  //   if (!socket) return;

  //   const handleNewRide = (data) => {
  //     setRide(data);
  //     setRidePopupPanel(true);
  //   };

  //   socket.on("new-ride", handleNewRide);

  //   return () => {
  //     socket.off("new-ride", handleNewRide);
  //   };
  // }, [socket, captain]);
  //changes done here
 useEffect(() => {
  if (!socket) return;

  const handleNewRide = (data) => {
    console.log("🚕 New ride event received:", data);
    setRide(data);
    setRidePopupPanel(true);
    console.log("Popup state:", true);
  };

  socket.on("new-ride", handleNewRide);

  return () => {
    socket.off("new-ride", handleNewRide);
  };
}, [socket, captain]);


 //

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
