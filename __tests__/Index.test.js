const { JSDOM } = require("jsdom");

describe("Index.js tests", () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <input id="name" value="John Doe" />
          <input id="email" value="john@example.com" />
          <input id="phone" value="1234567890" />
          <input id="dob" value="1990-01-01" />
          <button id="loginButton">Login</button>
          <button id="profileButton">Profile</button>
          <button id="eventButton">Event</button>
          <button id="askPushButton">Ask Push</button>
        </body>
      </html>
    `);
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
    global.clevertap = {
      onUserLogin: { push: jest.fn() },
      profile: { push: jest.fn() },
      event: { push: jest.fn() },
      notifications: { push: jest.fn() },
    };
    jest.resetModules(); // Clear the require cache
    require("../Index.js");
  });

  test("loginButton click should push user login details to CleverTap", () => {
    document.getElementById("loginButton").click();
    expect(clevertap.onUserLogin.push).toHaveBeenCalledWith({
      Site: {
        Name: "John Doe",
        Email: "john@example.com",
        Phone: "1234567890",
        DOB: new Date("1990-01-01"),
      },
    });
  });

  test("profileButton click should push profile details to CleverTap", () => {
    document.getElementById("profileButton").click();
    expect(clevertap.profile.push).toHaveBeenCalledWith({
      Site: {
        Name: "John Doe",
        Email: "john@example.com",
        Phone: "1234567890",
        DOB: expect.any(Date),
      },
    });
  });

  test("eventButton click should push custom event to CleverTap", () => {
    document.getElementById("eventButton").click();
    expect(clevertap.event.push).toHaveBeenCalledWith("Custom Event", {
      StringValue: "Example String",
      IntegerValue: 123,
      FloatValue: 123.45,
      DateValue: expect.any(Date),
    });
  });

  test("askPushButton click should push notification prompt to CleverTap", () => {
    document.getElementById("askPushButton").click();
    expect(clevertap.notifications.push).toHaveBeenCalledWith({
      titleText: "Would you like to receive Push Notifications?",
      bodyText: "We promise to only send you relevant content and updates.",
      okButtonText: "Sign me up!",
      rejectButtonText: "No thanks",
      askAgainTimeInSeconds: 5,
      okButtonColor: "#f28046",
    });
  });
});
