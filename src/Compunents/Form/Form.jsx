import Dropdown from "../Ui/Dropdown";
import { db } from "../../Firebase/Firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Form() {
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
      phone: formData.get("phone"),
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
    for (let key in sent_data) {
      if (!sent_data[key]) {
        console.log(`${key} is required`);
        console.log("here are we");
        return;
      }
    }
    try {
      const sendingmessage = await addDoc(collection(db, "delivery_app"), {
        phone: formData.get("phone"),
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
    } catch (e) {
      console.error("Error : ", e);
    }
  };

  return (
    <div className="bg-red-300 mx-auto rounded-lg -md w-full max-w-110 flex items-center justify-center">
      <form onSubmit={handleSend} className="w-full max-w-110">
        <div className="w-full max-w-110 mx-auto p-5">
          <h3 className="">Post form</h3>
          <div>
            <select
              name="role"
              className="w-50 border-0 focus:outline-none bg-amber-600 rounded-md p-2"
            >
              <option value="Traveller" className="bg-sky-100 hover:bg-red-500">
                As Traveller
              </option>
              <option value="Sender" className="bg-sky-100">
                As Sender
              </option>
            </select>
          </div>

          {/* Custome Dropdown */}
          <Dropdown />

          <div className="flex flex-col gap-1 w-full max-w-110 m-auto ">
            <label className="">Phone number</label>
            <div className="flex gap-3">
              <input
                name="phone"
                type="number"
                placeholder="01XXX…123"
                className=" bg-amber-600 flex-1 focus:outline-none border-none focus:ring-2 focus:ring-red-400 border border-gray-300 rounded-md p-2  placeholder:text-center"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full max-w-110 m-auto ">
            <label className="">Free Space Dimension (L × W × H)</label>
            <div className="flex gap-3 w-full">
              <input
                name="length"
                type="number"
                placeholder="Length"
                className=" bg-amber-600 flex-1 min-w-0 focus:outline-none border-none focus:ring-2 focus:ring-red-400 border border-gray-300 rounded-md p-2  placeholder:text-center"
              />
              {/* <span className="text-gray-500 flex items-center">×</span> */}
              <input
                name="width"
                type="number"
                placeholder="Width"
                className="bg-amber-600 flex-1 min-w-0 focus:outline-none border-none focus:ring-2 focus:ring-red-400 border border-gray-300 rounded-md p-2  placeholder:text-center"
              />
              {/* <span className="text-gray-500 flex items-center">×</span> */}
              <input
                name="depth"
                type="number"
                placeholder="Depth"
                className="bg-amber-600 flex-1 min-w-0 focus:outline-none border-none focus:ring-2 focus:ring-red-400 border border-gray-300 rounded-md p-2 placeholder:text-center"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full max-w-110 min-w-0 m-auto ">
            <label className="">Free Space Weight (KG)</label>
            <input
              name="max_weight"
              type="number"
              placeholder="Weight in kg"
              className="w-full min-w-0 bg-amber-600 focus:outline-none border-none focus:ring-2 focus:ring-red-400 border border-gray-300 rounded-md p-2  placeholder:text-center"
            />
          </div>
          <div className="flex flex-col gap-1 w-full max-w-110 m-auto ">
            <label className="">From Airport</label>
            <input
              name="location_form"
              type="text"
              placeholder="Departure airport or select from dropdown"
              className="bg-amber-600 min-w-0 focus:outline-none border-none focus:ring-2 focus:ring-red-400 border border-gray-300 rounded-md p-2  placeholder:text-center"
            />
          </div>
          <div className="flex flex-col gap-1 w-full max-w-110 m-auto ">
            <label className="">To Airport</label>
            <input
              name="location_to"
              type="text"
              placeholder="Arrival airport or select from dropdown"
              className="bg-amber-600 min-w-0 focus:outline-none border-none focus:ring-2 focus:ring-red-400 border border-gray-300 rounded-md p-2  placeholder:text-center"
            />
          </div>
          <div className="flex flex-col gap-1 w-full max-w-110 m-auto ">
            <label className="">Departure Date</label>
            <input
              name="departure_date"
              type="date"
              className="bg-amber-600 rounded-md p-2 focus:outline-none border-none w-full"
            />
          </div>
          <div className="flex flex-col gap-1 w-full max-w-110 m-auto ">
            <label className="">Expected Price</label>
            <input
              name="expected_price"
              type="text"
              placeholder="e.g., $50 or negotiable"
              className="bg-amber-600 min-w-0 focus:outline-none border-none focus:ring-2 focus:ring-red-400 border border-gray-300 rounded-md p-2  placeholder:text-center"
            />
          </div>
          <div className="flex flex-col gap-1 w-full max-w-110 m-auto ">
            <label className="">Pickup Location</label>
            <input
              name="pickup_location"
              type="text"
              placeholder="City or area for pickup"
              className="bg-amber-600 min-w-0 focus:outline-none border-none focus:ring-2 focus:ring-red-400 border border-gray-300 rounded-md p-2  placeholder:text-center"
            />
          </div>
          <div className="flex flex-col gap-1 w-full max-w-110 m-auto ">
            <label className="">Delivery Location</label>
            <input
              name="delivery_location"
              type="text"
              placeholder="City or area for delivery"
              className="bg-amber-600 min-w-0 focus:outline-none border-none focus:ring-2 focus:ring-red-400 border border-gray-300 rounded-md p-2  placeholder:text-center"
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
  );
}

export default Form;
