const generate = document.querySelector("#generate");
const today = new Date();
const newDate = `${today.getDate()}/${
  today.getMonth() + 1
}/${today.getFullYear()}`;
generate.addEventListener("click", getData);

async function getData(event) {
  event.preventDefault();
  const apiKey = "db83fefb74880671054af406b9df1364";
  const zip = document.querySelector("#zip").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&zip=${zip}&appid=${apiKey}`;
  const returnData = await getURL(url)
    .then(function (returnData) {
      const temperature = returnData.main.temp;
      const userResponse = document.querySelector("#feel").value;
      const weatherData = {
        temperature: temperature,
        date: newDate,
        userMessage: userResponse,
        city: returnData.name,
      };
      postData("/userData", weatherData);
    })
    .then(function () {
      updateUI();
    });
}

const updateUI = async () => {
  const request = await fetch("/userData");
  try {
    const allData = await request.json();
    document.querySelector(".date").textContent = allData[0].date;
    let padding = String(allData[0].temp);
    padding= padding.padEnd(7, "ºC");
    document.querySelector(".temp").textContent = padding;
    document.querySelector(".city").textContent = allData[0].city;
    document.querySelector(".feel").textContent = allData[0].message;
  } catch (error) {
    console.log("error", error);
  }
};

async function getURL(url) {
  const response = await fetch(url);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
