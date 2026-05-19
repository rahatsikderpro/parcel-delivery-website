//import airports from "../../Airports/Airports_List.js";

import { useState, useEffect } from "react";
import { db } from "../../Firebase/Firebase.js";
import { query, getDocs, collection, orderBy } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function Feed() {
  //const allPosts= JSON.parse(localStorage.getItem("sent_data")) || [];
  const [allPosts, setAllPosts] = useState([]);
  const [showPassword, setShowPassword] = useState(null);
  const togglePassword = (index) => {
    setShowPassword(showPassword === index ? null : index);
  };
  // phone: formData.get("phone"),
  //       role: formData.get("role"),
  //       length: formData.get("length"),
  //       width: formData.get("width"),
  //       depth: formData.get("depth"),
  //       max_weight: formData.get("max_weight"),
  //       location_form: formData.get("location_form"),
  //       location_to: formData.get("location_to"),
  //       departure_date: formData.get("departure_date"),
  //       expected_price: formData.get("expected_price"),
  //       pickup_location: formData.get("pickup_location"),
  //       delivery_location: formData.get("delivery_location"),

  //fatch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "delivery_app"),
          orderBy("timestamp", "asc"),
        );

        const querySnapshot = await getDocs(q);

        const dataArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllPosts(dataArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
     
      {allPosts ? (
        <div className="text-center bg-sky-300 max-w-110 mx-auto min-h-20"> Nothing to show</div>
      ) : (
        allPosts.map((data, index) => {
          return (
            <div
              key={index}
              className="p-4 m-5 bg-(--background-feed) mx-auto rounded-lg -md w-full max-w-110 flex flex-col "
            >
              <div className="mx-auto  w-full p-3 rounded-md">
                {data.role == "Sender" ? (
                  <div className="w-min mr-auto text-left bg-green-100 p-3 rounded-md">
                    {data.role}
                  </div>
                ) : (
                  <div className="w-min ml-auto text-right bg-green-100 p-3 rounded-md">
                    {data.role}
                  </div>
                )}
              </div>
              <div className=" w-full flex items-center gap-2">
                <div className="w-70">
                  Phone:{" "}
                  {showPassword === index
                    ? data.phone
                    : "••••••••••••••••••••••••••"}
                </div>
                <div
                  onClick={() => togglePassword(index)}
                  className="cursor-pointer w-10  select-none flex
              justify-center"
                >
                  {showPassword === index ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="flex gap-4">
                <div>Available Space</div>
                <div>L: {data.length}</div>
                <div>W: {data.width}</div>
                <div>D: {data.depth}</div>
              </div>
              <div>Max Weight: {data.max_weight}</div>
              <div>Location To: {data.location_to}</div>
              <div>Location From: {data.location_form}</div>
              <div>Departure Date: {data.departure_date}</div>
              <div>Price: {data.expected_price}</div>
              <div>Pickup From: {data.pickup_location}</div>
              <div>Deliver To: {data.delivery_location}</div>
            </div>
          );
        })
      )}
      {/* <div>{airports[0].name}</div>  */}

      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Feed;
