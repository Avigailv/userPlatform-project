import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/loginAndRegister.css";
import * as apiService from "../../apiService.js";

function FullRegister() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    address: {
      street: currentUser.address?.street || '',
      suite: currentUser.address?.suite || '',
      city: currentUser.address?.city || '',
    },
  });

  // פונקציה לעדכון השדות בטופס
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      // אם השדה שייך לכתובת, עדכון כתובת
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      // אחרת, עדכון השדה הכללי
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  async function handleUpdeteUser(e) {
    e.preventDefault();

    const updatedData = {
      name: formData.name || currentUser.name,
      email: formData.email || currentUser.email,
      phone: formData.phone || currentUser.phone,
      address: {
        street: formData.address.street || currentUser.address.street,
        suite: formData.address.suite || currentUser.address.suite,
        city: formData.address.city || currentUser.address.city,
      },
    };

    try {
      const updatedUser = await apiService.UpdateData(`users/${currentUser.id}`, updatedData);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      alert('המשתמש עודכן בהצלחה!');
      navigate(`/home/users/${currentUser.id}`);
    } catch (error) {
      alert(`שגיאה במהלך עדכון המשתמש: ${error.message}`);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleUpdeteUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.address.street}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="suite"
          placeholder="Suite"
          value={formData.address.suite}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleChange}
          required
        />
        <button type="submit" className="connect">Update</button>
      </form>
    </div>
  );
}
export default FullRegister;