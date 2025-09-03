"use client";
import { useState } from "react";

export default function EventForm({ priceParam, kmParam }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emc: "",
    amount: priceParam,
    country: "",
    date_of_birth: "",
    t_shirt_size: "",
    km: kmParam,
    gender: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Trim spaces from form fields to prevent issues with extra spaces
      const cleanedFormData = {
        name: formData.name.trim(),
        amount: priceParam.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        emc: formData.emc.trim(),
        country: formData.country.trim(),
        date_of_birth: formData.date_of_birth.trim(),
        t_shirt_size: formData.t_shirt_size.trim(),
        km: formData.km.trim(),
        gender: formData.gender.trim(),
      };

      const body = { ...cleanedFormData };

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData); // Log the error response
        throw new Error(errorData.error || `API Error: ${res.status}`);
      }

      const data = await res.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("❌ Payment initiation failed.");
      }
    } catch (error) {
      console.error("Error:", error.message); // General error logging
      alert(`Error: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-start justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Payment Now</h2>

        <label className="block">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </label>

        <label className="block">
          Your Email
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </label>

        <label className="block">
          Your Phone
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </label>

        <label className="block">
          Emergency Contact
          <input
            type="tel"
            name="emc"
            placeholder="Emergency Contact"
            value={formData.emc}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </label>

        <label className="block">
          Country
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Country</option>
            <option value="Bangladesh">Bangladesh</option>
          </select>
        </label>

        <label className="block">
          Date of Birth
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </label>

        <label className="block">
          T-shirt Size
          <select
            name="t_shirt_size"
            className="w-full p-2 border"
            value={formData.t_shirt_size || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select T-shirt Size</option>
            <optgroup label="Adult Sizes">
              <option value="XS">XS - 36”/25”</option>
              <option value="S">S - 38”/26”</option>
              <option value="M">M - 40”/27”</option>
              <option value="L">L - 42”/28”</option>
              <option value="XL">XL - 44”/29”</option>
              <option value="2XL">2XL - 46”/30”</option>
              <option value="3XL">3XL - 48”/31”</option>
              <option value="4XL">4XL - 50/32”</option>
            </optgroup>
            <optgroup label="Kids Sizes">
              <option value="3-4 Years">3-4 Years - 26”/18”</option>
              <option value="5-6 Years">5-6 Years - 28”/19”</option>
              <option value="7-8 Years">7-8 Years - 30”/20”</option>
              <option value="9-10 Years">9-10 Years - 32”/22”</option>
              <option value="11-12 Years">11-12 Years - 34”/24”</option>
            </optgroup>
          </select>
        </label>

        <label className="block">
          Gender
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Redirecting..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
