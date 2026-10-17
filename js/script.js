let data = [];

async function getData() {
  try {
    const response = await fetch("data.json");
    data = await response.json();
    render("monthly");
  } catch (error) {
    console.log(error);
  }
}

const labels = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

function render(period) {
  data.forEach((item) => {
    const card = document.querySelector(`[data-title="${item.title}"]`);
    const hour = card.querySelector(".hour");
    const previous = card.querySelector(".last-week");
    const label = card.querySelector(".period-label");

    hour.textContent = item.timeframes[period].current;
    previous.textContent = item.timeframes[period].previous;
    label.textContent = labels[period];
  });
}

const buttons = document.querySelectorAll(".date button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    render(button.dataset.period);
  });
});

getData();
