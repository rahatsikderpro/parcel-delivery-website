import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

import Dropdown from "../Ui/Dropdown";
import { useState, useEffect } from "react";
import { db } from "../../Firebase/Firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Snackbar from "../Snackbar/Snackbar.jsx";

function Form() {
  const [value, setValue] = useState("");
  const [snackbar, setSnackbar] = useState({
    show: false,
    text: "",
  });
  useEffect(() => {
    if (snackbar.show) {
      const timer = setTimeout(() => {
        setSnackbar({ show: false, text: "" });
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [snackbar]);
  // const handleSubmit = (e) => {
  //   e.preventDefault(); // stop page reload

  //   //send data

  //   // let time = new Date();
  //   // console.log("timestamp", time);
  //   let existingData = JSON.parse(localStorage.getItem("sent_data")) || [];
  //   existingData.push(sent_data);
  //   localStorage.setItem("sent_data", JSON.stringify(existingData));
  // };

  const handleSend = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sent_data = {
      phone: value,
      role: formData.get("role"),
      length: formData.get("length"),
      width: formData.get("width"),
      depth: formData.get("depth"),
      max_weight: formData.get("max_weight"),
      location_form: formData.get("location_form"),
      location_to: formData.get("location_to"),
      departure_date: formData.get("departure_date"),
      expected_price: formData.get("expected_price"),
      pickup_location: formData.get("pickup_location"),
      delivery_location: formData.get("delivery_location"),
    };
    console.log("validNumver", sent_data.phone);
    if (!isValidPhoneNumber(value)) {
      console.log("isValidPhoneNumber.value", isValidPhoneNumber(value));
      // alert("Please enter a valid phone number for the selected country.");
      setSnackbar({
        show: true,
        text: "Invalid phone number",
      });
      return;
    }
    for (let key in sent_data) {
      if (!sent_data[key]) {
        console.log(`${key} is required`);
        setSnackbar({
          show: true,
          text: `${key} is required`,
        });
        return;
      }
    }

    try {
      const sendingmessage = await addDoc(collection(db, "delivery_app"), {
        phone: value,
        role: formData.get("role"),
        length: formData.get("length"),
        width: formData.get("width"),
        depth: formData.get("depth"),
        max_weight: formData.get("max_weight"),
        location_form: formData.get("location_form"),
        location_to: formData.get("location_to"),
        departure_date: formData.get("departure_date"),
        expected_price: formData.get("expected_price"),
        pickup_location: formData.get("pickup_location"),
        delivery_location: formData.get("delivery_location"),
        timestamp: serverTimestamp(),
      });
      console.log("Sent successfully to firebase");
      setSnackbar({
        show: true,
        text: "Successfully Posted",
      });
      //reset all field
      e.target.reset();
      setValue("");
    } catch (e) {
      console.error("Error : ", e);
    }
  };

  return (
    <div className="py-30">
      <div className="bg-(--background-secondary) mx-auto rounded-lg -md w-full max-w-98 flex items-center justify-center">
        <Snackbar show={snackbar.show} text={snackbar.text} />
        <form onSubmit={handleSend} className="w-full max-w-110">
          <div className="w-full max-w-110 mx-auto p-5">
            <h3 className="">Post form</h3>
            <div className="pb-4">
              <select
                name="role"
                className="w-50 focus:outline-none border-2 border-(--input-border) rounded-md p-2"
              >
                <option value="Traveller" className="">
                  As Traveller
                </option>
                <option value="Sender" className="">
                  As Sender
                </option>
              </select>
            </div>
            {/* Custome Dropdown */}
            {/* <Dropdown /> */}
            <div className="pb-4">
              <div>Enter Valid Phone Number</div>
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="BD"
                value={value}
                onChange={setValue}
                className=" flex-1 min-w-0  focus:outline-none outline-0  rounded-md py-2 px-4 placeholder:text-center border-2 border-(--input-border) "
              />
            </div>

            <div className=" pb-4 flex flex-col gap-1 w-full max-w-110 m-auto ">
              <label className="">Free Space Dimension (L × W × H)</label>
              <div className="flex gap-3 w-full">
                <input
                  name="length"
                  type="number"
                  placeholder="Length"
                  className=" flex-1 min-w-0 focus:outline-none rounded-md py-2 px-4 placeholder:text-center border-2 border-(--input-border)"
                />
                {/* <span className="text-gray-500 flex items-center">×</span> */}
                <input
                  name="width"
                  type="number"
                  placeholder="Width"
                  className=" flex-1 min-w-0 focus:outline-none rounded-md py-2 px-4 placeholder:text-center border-2 border-(--input-border)"
                />
                {/* <span className="text-gray-500 flex items-center">×</span> */}
                <input
                  name="depth"
                  type="number"
                  placeholder="Depth"
                  className=" flex-1 min-w-0 focus:outline-none border-2 border-(--input-border) rounded-md py-2 px-4 placeholder:text-center"
                />
              </div>
            </div>
            <div className="pb-4 flex flex-col gap-1 w-full max-w-110 min-w-0 m-auto ">
              <label className="">Free Space Weight (KG)</label>
              <input
                name="max_weight"
                type="number"
                placeholder="Weight in kg"
                className="w-full min-w-0 focus:outline-none border-2 border-(--input-border) rounded-md py-2 px-4  placeholder:text-center"
              />
            </div>
            <div className="pb-4 flex flex-col gap-1 w-full max-w-110 m-auto ">
              <label className="">From Airport</label>
              <input
                name="location_form"
                type="text"
                placeholder="Departure airport or select from dropdown"
                className=" min-w-0 focus:outline-none border-2 border-(--input-border) rounded-md py-2 px-4  placeholder:text-center"
              />
            </div>
            <div className="pb-4 flex flex-col gap-1 w-full max-w-110 m-auto ">
              <label className="">To Airport</label>
              <input
                name="location_to"
                type="text"
                placeholder="Arrival airport or select from dropdown"
                className=" min-w-0 focus:outline-none border-2 border-(--input-border) rounded-md py-2 px-4  placeholder:text-center"
              />
            </div>
            <div className="pb-4 flex flex-col gap-1 w-full max-w-110 m-auto ">
              <label className="">Departure Date</label>
              <input
                name="departure_date"
                type="date"
                className="rounded-md py-2 px-4 focus:outline-none border-2 border-(--input-border) w-full"
              />
            </div>
            <div className="pb-4 flex flex-col gap-1 w-full max-w-110 m-auto ">
              <label className="">Expected Price</label>
              <input
                name="expected_price"
                type="number"
                placeholder="e.g., $50 or negotiable"
                className="min-w-0 focus:outline-none border-2 border-(--input-border) rounded-md py-2 px-4  placeholder:text-center"
              />
            </div>
            <div className="pb-4 flex flex-col gap-1 w-full max-w-110 m-auto ">
              <label className="">Pickup Location</label>
              <input
                name="pickup_location"
                type="text"
                placeholder="City or area for pickup"
                className="min-w-0 focus:outline-none border-2 border-(--input-border) rounded-md py-2 px-4  placeholder:text-center"
              />
            </div>
            <div className="pb-4 flex flex-col gap-1 w-full max-w-110 m-auto ">
              <label className="">Delivery Location</label>
              <input
                name="delivery_location"
                type="text"
                placeholder="City or area for delivery"
                className="min-w-0 focus:outline-none border-2 border-(--input-border) rounded-md py-2 px-4  placeholder:text-center"
              />
            </div>
          </div>

          <button
            type="submit"
            className="block bg-sky-400 cursor-pointer w-full max-w-50 p-3 mx-auto mb-8 rounded-md"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
