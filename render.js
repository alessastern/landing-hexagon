var items = [
  {
    id: 0,
    date: "30 мая",
    place: "Стадион",
    time: "10:00",
    contestans: ["Соперник 1", "Соперник 2"],
  },
  {
    id: 1,
    date: "17 июня",
    place: "Стадион",
    time: "11:00",
    contestans: ["Соперник 3", "Соперник 4"],
  },
  {
    id: 2,
    date: "26 июня",
    place: "Стадион",
    time: "19:00",
    contestans: ["Соперник 5", "Соперник 6"],
  },
  {
    id: 3,
    date: "16 июля",
    place: "Стадион",
    time: "20:00",
    contestans: ["Соперник 7", "Соперник 8"],
  },
  {
    id: 4,
    date: "30 сентября",
    place: "Стадион",
    time: "12:00",
    contestans: ["Соперник 9", "Соперник 10"],
  },
];
var currentCenter = 2;

var next = 3;
var next_2 = 4;
var prev = 1;
var prev_2 = 0;

var setIndex = (currentCenter) => {
  next = currentCenter + 1;
  next_2 = currentCenter + 2;
  prev = currentCenter - 1;
  prev_2 = currentCenter - 2;
};

var contest_1 = document.querySelector("#c1");
var contest_2 = document.querySelector("#c2");

var addClasses = (i, hex) => {
  if (i === next) {
    hex.classList.add("next");
  }
  if (i === next_2) {
    hex.classList.add("next_2");
  }

  if (i === prev) {
    hex.classList.add("prev");
  }
  if (i === prev_2) {
    hex.classList.add("prev_2");
  }
  if (i === currentCenter) {
    hex.classList.add("center");
    hex.innerHTML = `
        <h3>${items[i].place}</h3>
          <h2>${items[i].date}</h2>
          <h3>${items[i].time}</h3>
          <button>Купить билет</button>
  `;
    contest_1.textContent = items[i].contestans[0];
    contest_2.textContent = items[i].contestans[1];
  } else {
    hex.innerHTML = `<h2 class="date">${items[i].date}</h2>`;
  }
};

var wrapper = document.querySelector(".list");

var render = () => {
  for (i = 0; i < items.length; i++) {
    let hex = document.createElement("div");
    hex.classList.add("tile");

    addClasses(i, hex);

    hex.setAttribute("data-index", i);

    hex.addEventListener("click", (e) => {
      const index = Number(e.currentTarget.dataset.index);
      currentCenter = index;
      updatePosition();
    });

    wrapper.appendChild(hex);
  }
};

function updatePosition(direction) {
  if (
    (direction === "next" && currentCenter >= items.length - 1) ||
    (direction === "prev" && currentCenter <= 0)
  )
    return;

  var hexes = document.querySelectorAll(".tile");

  if (direction === "next") {
    currentCenter++;
  } else if (direction === "prev") {
    currentCenter--;
  }

  setIndex(currentCenter);

  hexes.forEach((hex, index) => {
    hex.classList.remove("center", "next", "next_2", "prev", "prev_2");
    addClasses(index, hex);
  });
}

document.addEventListener("wheel", (e) => {
  if (e.deltaY > 0) {
    updatePosition("next");
  } else {
    updatePosition("prev");
  }
});

render();
