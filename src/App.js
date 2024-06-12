import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!modalRef.current || !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    const handleMouseUp = () => {
      document.addEventListener("mousedown", handleOutsideClick);
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
    document.body.classList.remove("modal-open");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      setFormError(true);
    }

    if (!email.includes("@")) {
      setError(
        `Please include an '@' in the email address. ${email} is missing an '@'.`
      );
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(dob);

    if (selectedDate > today) {
      alert("Invalid date of birth. Date of birth cannot be in future.");
      return;
    }

    setUsername("");
    setEmail("");
    setDob("");
    setPhone("");
    setError(null);
    setIsOpen(false);
  };

  return (
    <div className="modal">
      <h2>User Details Modal</h2>
      <button className="open-form-button" onClick={openModal}>
        Open Form
      </button>
      {isOpen && (
        <div className="modal-content" ref={modalRef}>
          <h2>Fill Details</h2>
          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && error.includes("email") && (
              <p className="error">{error}</p>
            )}
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {error && error.includes("phone") && (
              <p className="error">{error}</p>
            )}
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            {error && error.includes("dob") && <p className="error">{error}</p>}

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default XModal;
