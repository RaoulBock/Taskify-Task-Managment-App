export const ApiServices = {
  onReg: async ({ phone_number }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      phone_number: phone_number,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch("https://nfserver-1fda.onrender.com/api/users", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        //  console.log(result);
        return JSON.parse(result);
      })
      .catch((error) => console.log("error", error));
  },
};
