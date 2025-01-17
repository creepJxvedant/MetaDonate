export const handleRegister = async (username, email, password) => {
  const payload = {
    username: username,
    email: email,
    password: password,
  };

  console.log(payload);

  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setError(data.message || "Something went wrong");
      return;
    }
    window.location.href = "/login/signin";
  } catch (err) {
    console.error("Error:", err);
    setError("An error occurred while registering");
  }
};

export const handleLogin = async (email, password) => {
  const payload = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};
export const createRequest = async (title, amount, reason, address) => {
  const payload = {
    title,
    amount,
    reason,
    address,
  };

  try {
    const response = await fetch("http://localhost:8080/donations/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Added 'Bearer' for standard practice
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Handle non-2xx HTTP responses
      const errorData = await response.json();
      console.error("Error during createRequest:", errorData);
      return {
        success: false,
        message: errorData.message || "Failed to create the request.",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error during createRequest:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};
