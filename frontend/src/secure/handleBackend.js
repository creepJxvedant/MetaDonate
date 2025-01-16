function handleRegistration(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const gmail = document.getElementById("gmail").value;
  const password = document.getElementById("password").value;

  const payload = {
    username: username,
    gmail: gmail,
    password: password,
  };

  fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Registration successful!");
        window.location.href = "/login";
      } else {
        alert("Registration failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    });
}

export const handleLogin = async (email, password) => {
  const payload = {
    gmail: email,
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

    for (let i = 0; i < 10; i++) {
      console.log(i);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};
