let appId = "d5c08124e00f3c1f12c6539a97899840"; // OpenWeatherMap API 的 appId,该 Key 已失效，请自行申请并替换，申请成功后需要等待一段时间，才能正常使用（这段时间出现 401错误，莫慌）。

let units = "metric"; // 温度单位
let searchMethod; // 搜索方法，可以是邮政编码（zip）或城市名称（q）

// 根据搜索词确定搜索方法
function getSearchMethod(searchTerm) {
  if (searchTerm.length === 5 && searchTerm.match(/^\d{5}$/)) {
    searchMethod = "zip";
  } else {
    searchMethod = "q";
  }
}

// 根据搜索词搜索当天天气信息
function searchWeather(searchTerm) {
  return new Promise((resolve, reject) => {
    showLoading();
    getSearchMethod(searchTerm);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`
    )
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        init(result);
        resolve();
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
        alert("Error fetching weather data. Please try again later.");
        reject(error);
      });
  });
}
// 初始化并显示天气信息
function init(resultFromServer) {
  console.log(resultFromServer);
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("./image/bg_image/clear.jpg")';
      break;
    case "Clouds":
      document.body.style.backgroundImage =
        'url("./image/bg_image/cloudy.jpg")';
      break;
    case "Rain":
      document.body.style.backgroundImage = 'url("./image/bg_image/rain.jpg")';
      break;
    case "Snow":
      document.body.style.backgroundImage = 'url("./image/bg_image/snow.jpg")';
      break;
    case "Drizzle":
      document.body.style.backgroundImage = 'url("./image/bg_image/clear.jpg")';
      break;
    case "mist":
      document.body.style.backgroundImage = 'url("./image/bg_image/rain.jpg")';

      break;
    case "Thounderstorm":
      document.body.style.backgroundImage = 'url("./image/bg_image/storm.jpg")';

      break;
    default:
      break;
  }

  let weatherDetails = document.getElementById("weatherDetails");
  let cityHeader = document.getElementById("cityHeader");
  let temperature = document.getElementById("temperature");
  let weatherIcon = document.getElementById("documentIconImg");

  weatherDetails.innerHTML = `${resultFromServer.weather[0].description}`;
  weatherIcon.src = `./image/weatherIcon/${resultFromServer.weather[0].icon.slice(
    0,
    2
  )}.png`;
  cityHeader.innerHTML = resultFromServer.name;
  temperature.innerHTML = `${Math.floor(resultFromServer.main.temp) + "&#176"}`;
}

function forecastWeather(searchTerm) {
  return new Promise((resolve, reject) => {
    getSearchMethod(searchTerm);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`
    )
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        forecast(result);
        resolve();
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
        alert("Error fetching weather data. Please try again later.");
        reject(error);
      })
      .finally(() => {
        hideLoading();
      });
  });
}

// 显示天气预报
function forecast(resultFromServer) {
  console.log("forecast Weather:", resultFromServer);
  let forecastList = document.getElementById("forecastList");
  forecastList.innerHTML = "";
  for (let i = 5; i < resultFromServer.list.length; i += 8) {
    console.log(resultFromServer.list[i]);
    // 创建一个预报项，某一天
    let forecastItem = document.createElement("div");
    forecastItem.classList.add("forecastItem");
    // 获取预报日期，并进行显示
    let forecastDate = new Date(resultFromServer.list[i].dt * 1000);
    let forecastDateStr = `${
      forecastDate.getMonth() + 1
    }/${forecastDate.getDate()}`;
    let forecastData = document.createElement("div");
    forecastData.classList.add("forecastDate");
    forecastData.innerHTML = forecastDateStr;
    // 获取预报天气图标，并创建img元素进行显示
    let forecastIcon = document.createElement("img");
    forecastIcon.src = `./image/weatherIcon/${resultFromServer.list[
      i
    ].weather[0].icon.slice(0, 2)}.png`;
    forecastIcon.classList.add("forecastIcon");

    forecastItem.appendChild(forecastIcon);
    forecastItem.appendChild(forecastData);

    // 将该天的预报信息添加到预报列表中
    forecastList.appendChild(forecastItem);
  }
}

function showLoading() {
  document.querySelector(".loader").style.visibility = "visible";
}

function hideLoading() {
  document.querySelector(".loader").style.visibility = "hidden";
}

// 搜索按钮点击事件处理函数
document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) {
    Promise.all([searchWeather(searchTerm), forecastWeather(searchTerm)]).then(
      () => {
        document.querySelector(".appContainer").style.visibility = "visible";
        document.getElementById("searchInput").value = "";
      }
    );
  }
});

// 搜索输入框键盘事件处理函数
document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    let searchTerm = document.getElementById("searchInput").value;
    if (searchTerm) {
      console.log("searchWeather");

      Promise.all([
        searchWeather(searchTerm),
        forecastWeather(searchTerm),
      ]).then(
        () => {
          console.log("visible");

          document.querySelector(".appContainer").style.visibility = "visible";
          document.getElementById("searchInput").value = "";
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
});
