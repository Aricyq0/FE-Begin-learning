// 监听页面加载事件
window.addEventListener("load", function () {
  const savedDate = localStorage.getItem("deadlineDate");
  const savedTime = localStorage.getItem("deadlineTime");

  if (savedDate) dates.value = savedDate;
  if (savedTime) times.value = savedTime;

  if (dates.value && times.value) {
    countdown();
  }
});

// 获取页面元素
const startBtn = document.querySelector(".start-btn");
const dates = document.getElementById("date");
const times = document.getElementById("time");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
let time1;

// 添加按钮点击事件监听
startBtn.addEventListener("click", countdown);

// 倒计时函数
function countdown() {
  if (time1) clearInterval(time1);

  const DeadLineDate = new Date(dates.value);
  const [hour, minute] = times.value.split(":");

  localStorage.setItem("deadlineDate", dates.value);
  localStorage.setItem("deadlineTime", times.value);

  const DeadLineTime = new Date(
    DeadLineDate.getFullYear(),
    DeadLineDate.getMonth(),
    DeadLineDate.getDate(),
    hour,
    minute,
    0
  ).getTime();

  const now = Date.now();
  const distance = DeadLineTime - now;

  if (distance <= 0) {
    alert("请检查日期时间是否正确");
    return;
  }

  time1 = setInterval(() => {
    const now = Date.now();
    const distance = DeadLineTime - now;

    if (distance <= 0) {
      alert("时间到！");
      clearInterval(time1);
      return;
    }

    if (isNaN(distance)) {
      alert("您还没有设置截止日期");
      clearInterval(time1);
      return;
    }

    updateCountdownDisplay(distance);
  }, 1000);
}

// 更新倒计时显示的函数
function updateCountdownDisplay(distance) {
  const leftDay = Math.floor(distance / (1000 * 60 * 60 * 24));
  const leftHour = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const leftMinute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const leftSecond = Math.floor((distance % (1000 * 60)) / 1000);

  days.innerText = String(leftDay).padStart(2, "0");
  hours.innerText = String(leftHour).padStart(2, "0");
  minutes.innerText = String(leftMinute).padStart(2, "0");
  seconds.innerText = String(leftSecond).padStart(2, "0");
}
