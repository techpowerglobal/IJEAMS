import React, { useState } from "react";
import "./MultiStepForm.css";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    email: "",
    organization: "",
    description: "",
    abstract: "",
    keywords: "",
    pdf: null,
    agreement: false,
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
    setError(""); // clear error when typing
  };

  // Step validation
  const validateStep = () => {
    if (step === 1) {
      if (!formData.title || !formData.author || !formData.email) {
        setError("Please fill all required fields in Step 1.");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.description || !formData.abstract) {
        setError("Please complete the Project Description and Abstract.");
        return false;
      }
    }
    if (step === 3) {
      if (!formData.pdf) {
        setError("Please upload a PDF file.");
        return false;
      }
      if (!formData.agreement) {
        setError("You must confirm ownership of your work.");
        return false;
      }
    }
    setError("");
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }

      // Build FormData
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "agreement") return; // skip checkbox in backend
        fd.append(key, value);
      });

      const res = await fetch("http://localhost:5000/api/submissions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      alert("Form Submitted Successfully!");
      console.log("Submission ID:", data.submissionId);

      // Reset form
      setFormData({
        title: "",
        author: "",
        email: "",
        organization: "",
        description: "",
        abstract: "",
        keywords: "",
        pdf: null,
        agreement: false,
      });
      setStep(1);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? "active" : ""} ${step > 1 ? "done" : ""}`}>1</div>
        <div className="line"></div>
        <div className={`step ${step >= 2 ? "active" : ""} ${step > 2 ? "done" : ""}`}>2</div>
        <div className="line"></div>
        <div className={`step ${step >= 3 ? "active" : ""} ${step > 3 ? "done" : ""}`}>3</div>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <h2>Step 1: Project Title</h2>
            <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required />
            <input type="text" name="author" placeholder="Author Name(s)" value={formData.author} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="organization" placeholder="Organization" value={formData.organization} onChange={handleChange} />
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h2>Step 2: Project & Abstract</h2>
            <textarea name="description" placeholder="Project Description" value={formData.description} onChange={handleChange} required />
            <textarea name="abstract" placeholder="Abstract" value={formData.abstract} onChange={handleChange} required />
            <input type="text" name="keywords" placeholder="Keywords (comma separated)" value={formData.keywords} onChange={handleChange} />
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h2>Step 3: Upload PDF</h2>
            <input type="file" name="pdf" accept="application/pdf" onChange={handleChange} required />
            <label>
              <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} /> I confirm this is my original work
            </label>
          </div>
        )}

        <div className="buttons">
          {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 3 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
}