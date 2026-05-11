function Feed() {
  const allPosts = JSON.parse(localStorage.getItem("sent_data")) || [];
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
  return (
    <div>
      <h2 className="bg-amber-500">Helo 2</h2>
      {allPosts.map((data, index) => {
        return (
          <div
            key={index}
            className="p-4 m-4 bg-red-300 mx-auto rounded-lg -md w-full max-w-110 flex flex-col "
          >
            <div>Role: {data.role}</div>
            <div>Phone: {data.phone}</div>
            <div>L: {data.length}</div>
            <div>W: {data.width}</div>
            <div>D: {data.depth}</div>
            <div>Max Weight: {data.max_weight}</div>
            <div>Location From: {data.location_form}</div>
            <div>Departure Date: {data.departure_date}</div>
            <div>Price: {data.expected_price}</div>
            <div>Pickup From: {data.pickup_location}</div>
            <div>Deliver To: {data.delivery_location}</div>
          </div>
        );
      })}
      <div></div>
      <div></div>
      <div></div>
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
