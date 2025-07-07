import { useState } from "react";
import emailjs from "@emailjs/browser";

const useEmailSender = ({
  serviceId,
  templateId,
  publicKey,
  resetDelay = 2000,
}) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = async (formData, onSuccess) => {
    setLoading(true);
    setError(null);

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        formData,
        publicKey,
      );
      console.log("Email sent:", result.text);
      setSubmitted(true);
      onSuccess?.();
      setTimeout(() => setSubmitted(false), resetDelay);
    } catch (err) {
      console.error("Email error:", err.text || "Network ");
      setError(
        (err.text && "Internal server error occurred") || "Email send failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submitted,
    error,
    sendEmail,
  };
};

export default useEmailSender;
