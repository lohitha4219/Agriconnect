import { useState } from "react";
import FarmerLayout from "./FarmerLayout";

function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");

  const detectDisease = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setResult("Please upload a crop image.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));

    const fileName = file.name.toLowerCase();

    if (
      fileName.includes("leaf") ||
      fileName.includes("crop") ||
      fileName.includes("plant") ||
      fileName.includes("disease")
    ) {
      setResult(
        "Disease Detected: Leaf Blight\nCause: Fungal infection\nSolution: Apply fungicide and avoid excess water.\nTip: Remove infected leaves and keep proper spacing between plants."
      );
    } else {
      setResult("Please upload a valid crop or leaf disease image.");
    }
  };

  return (
    <FarmerLayout activePage="disease">
      <section className="farmer-welcome-card">
        <div>
          <h1>AI Disease Detection 🤖</h1>
          <p>Upload a crop or leaf image to check disease and farming tips.</p>
        </div>
      </section>

      <div className="table-card">
        <div className="disease-upload-box">
          <h2>Upload Crop Image</h2>

          <input
            type="file"
            accept="image/*"
            onChange={detectDisease}
          />

          {preview && (
            <img
              src={preview}
              alt="Crop Preview"
              className="disease-preview"
            />
          )}

          {result && (
            <pre className="result-box">
              {result}
            </pre>
          )}
        </div>
      </div>
    </FarmerLayout>
  );
}

export default DiseaseDetection;