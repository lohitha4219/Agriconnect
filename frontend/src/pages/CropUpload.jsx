import { useEffect, useState } from "react";
import FarmerLayout from "./FarmerLayout";
import API from "../api/axios";

function CropUpload() {

  const farmer = JSON.parse(localStorage.getItem("farmer"));

  const [myCrops, setMyCrops] = useState([]);

  const [form, setForm] = useState({
    farmer_name: farmer?.name || "",
    mobile: farmer?.mobile || "",
    village: "",
    email: farmer?.email || "",
    crop_name: "Paddy",
    quantity: "",
    price: "",
  });

  const fetchCrops = async () => {

    try {

      const res = await API.get("/crop/uploads/");

      const filtered = res.data.filter(
        (crop) => crop.farmer_name === farmer?.name
      );

      setMyCrops(filtered);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    // fetch once on mount
    fetchCrops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const uploadCrop = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/crop/upload/",
        {
          farmer_name: form.farmer_name,
          crop_name: form.crop_name,
          village: form.village,
          quantity: form.quantity,
          price: form.price,
        }
      );

      alert(res.data.message);

      setForm({
        ...form,
        village: "",
        crop_name: "",
        quantity: "",
        price: "",
      });

      fetchCrops();

    } catch (error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Crop upload failed"
      );
    }
  };

  return (

    <FarmerLayout activePage="upload">

      <h1 className="page-heading">
        Upload Your Crops
      </h1>

      <div className="form-card">

        <form
          className="crop-form-grid"
          onSubmit={uploadCrop}
        >

          <div>
            <label>Your Name</label>

            <input
              type="text"
              name="farmer_name"
              value={form.farmer_name}
              readOnly
            />
          </div>

          <div>
            <label>Mobile</label>

            <input
              type="text"
              name="mobile"
              value={form.mobile}
              readOnly
            />
          </div>

          <div>
            <label>Village</label>

            <input
              type="text"
              name="village"
              placeholder="Enter Village"
              value={form.village}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              readOnly
            />
          </div>
          <div>
  <label>Crop Name</label>

  <input
    type="text"
    name="crop_name"
    placeholder="Enter Crop Name"
    value={form.crop_name}
    onChange={handleChange}
    required
  />
</div>

          <div>
            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              placeholder="e.g. 50 Quintals"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="full-row">
            <label>Expected Price</label>

            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="full-row"
            type="submit"
          >
            Submit Crop
          </button>

        </form>

      </div>

      <div className="table-card">

        <h2>My Uploads</h2>

        <table>

          <thead>
            <tr>
              <th>CROP</th>
              <th>VILLAGE</th>
              <th>QTY</th>
              <th>PRICE</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>

            {myCrops.length === 0 ? (

              <tr>
                <td colSpan="5">
                  No uploads yet.
                </td>
              </tr>

            ) : (

              myCrops.map((crop) => (

                <tr key={crop.id}>

                  <td>{crop.crop_name}</td>

                  <td>{crop.village}</td>

                  <td>{crop.quantity}</td>

                  <td>₹{crop.price}</td>

                  <td>{crop.status}</td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </FarmerLayout>
  );
}

export default CropUpload;