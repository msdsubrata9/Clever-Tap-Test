document.getElementById("loginButton").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const dob = document.getElementById("dob").value;

  clevertap.onUserLogin.push({
    Site: {
      Name: name,
      Email: email,
      Phone: phone,
      DOB: new Date(dob),
    },
  });

  alert("Login details sent to CleverTap!");
});

document.getElementById("profileButton").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const dob = document.getElementById("dob").value;

  clevertap.profile.push({
    Site: {
      Name: name,
      Email: email,
      Phone: phone,
      DOB: new Date(dob),
    },
  });

  alert("Profile details pushed to CleverTap!");
});

document.getElementById("eventButton").addEventListener("click", () => {
  clevertap.event.push("Custom Event", {
    StringValue: "Example String",
    IntegerValue: 123,
    FloatValue: 123.45,
    DateValue: new Date(),
  });

  alert("Custom event raised form CleverTap!");
});

document.getElementById("askPushButton").addEventListener("click", () => {
  clevertap.notifications.push({
    titleText: "Would you like to receive Push Notifications?",
    bodyText: "We promise to only send you relevant content and updates.",
    okButtonText: "Sign me up!",
    rejectButtonText: "No thanks",
    askAgainTimeInSeconds: 5,
    okButtonColor: "#f28046",
  });

  alert("Push notification prompt triggered form CleverTap!");
});
