const inputsFilter = document.getElementsByClassName("filter__input");
const mfgList = document.getElementById("mfg");
const itemList = mfgList.getElementsByClassName("mfg__item");
const elementTemplate = document.getElementById("element-template");
let filterState = localStorage.getItem("filterState");

//Проверяем есть ли filterState в localStorage
if (filterState === null) {
    filterState = "";
    localStorage.setItem("filterState", filterState);
}

for (let i = 0; i < inputsFilter.length; i++) {
    const element = inputsFilter[i];

    if (element.value === filterState) element.checked = true;

    element.addEventListener("change", () => {
        localStorage.setItem("filterState", element.value);
        updateVisibility(localStorage.getItem("filterState"));
    });
}

seriesData.forEach((series) => {
    const instance = elementTemplate.content.cloneNode(true);

    const itemElement = instance.querySelector(".mfg__item");
    itemElement.classList.add(series.duration.state ? "mfg__item--watched" : "mfg__item--watching");

    const linkElement = instance.querySelector(".mfg__link");
    linkElement.href = `https://www.google.com/search?q=сериал+${encodeURIComponent(series.name)}`;

    const imgElement = instance.querySelector(".mfg__img");
    imgElement.src = `./img/${series.picture.local}.jpg`;
    imgElement.alt = series.name;
    imgElement.title = series.name;

    const durationElement = instance.querySelector(".mfg__duration");
    durationElement.textContent =
        (series.duration.season > 0 ? `${series.duration.season} сезон` : "") +
        (series.duration.episode > 0 ? ` ${series.duration.episode} серия` : "");

    mfgList.appendChild(instance);
});

updateVisibility(filterState);

function updateVisibility(filterValue) {
    for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];

        if (filterValue === "") {
            item.style.display = "block";
        } else if (filterValue === "watched" && item.classList.contains("mfg__item--watching")) {
            item.style.display = "none";
        } else if (filterValue === "watching" && item.classList.contains("mfg__item--watched")) {
            item.style.display = "none";
        } else {
            item.style.display = "block";
        }
    }
}