let els = document.getElementsByClassName("activite");

let urlCompliance = (url) => {
    url = url.replaceAll(' ', '+');
    url = url.replaceAll('#', "%23");
    url = url.replaceAll("\n", "\n\n");
    url = url.replaceAll("\n", "%0A");
    return url;
}

let fetchDate = (el) => {
    date = el.querySelector("div > div.data > div > div.subtitle > span > span:nth-child(2)");
    const lang = document.querySelector("#language > a.EN");
    if (date) {
        date = date.textContent.trim();
        date = date.replaceAll(" ", "");
        date = date.replaceAll("\n", "");
        date = date.replaceAll(9, "");
        date = date.replaceAll("/", "");
        let dateStart;
        let dateEnd;
        if (lang.className.includes("ui-active"))
            dateEnd = `${date.slice(4, 8)}${date.slice(2, 4)}${date.slice(0, 2)}T${date.slice(15+1, 17+1)}${date.slice(18+1, 20+1)}00`;
        else
            dateEnd = `${date.slice(4, 8)}${date.slice(2, 4)}${date.slice(0, 2)}T${date.slice(15, 17)}${date.slice(18, 20)}00`;
        dateStart = `${date.slice(4, 8)}${date.slice(2, 4)}${date.slice(0, 2)}T${date.slice(9, 11)}${date.slice(12, 14)}00`;
        date = `${dateStart}/${dateEnd}`;
        return date;
    } else
        return undefined;
}

Array.prototype.forEach.call(els, function(el) {
    let event = el.querySelector("div.slide > div.eventzone");
    event = event.getElementsByClassName("event")
    let title = el.querySelector("div.item.title > h2 > span > a").innerText;
    title = urlCompliance(title);
    let link = el.querySelector("div.item.title > h2 > span > a").href;
    link = urlCompliance(link);
    let description = el.querySelector("div.slide > div.main > div.data > div.item.description > div").innerText
    description = urlCompliance(description);
    Array.prototype.forEach.call(event, function(element, index) {
        let a = document.createElement("a");
        let aManSpan = document.createElement("span");
        let iconSpan = document.createElement("span");
        let labelClass = document.createElement("span");
        labelClass.className = "label"
        labelClass.innerText = "Add to GCalendar"
        iconSpan.className = "icon"
        iconSpan.style.backgroundImage = "url(https://intra.epitech.eu/staticb9fb8d1bfc5560658755f90eb3680c3b47f50f17/img/sprite-common.png)"
        iconSpan.style.backgroundPositionX = "-211px";
        iconSpan.style.backgroundPositionY = "-372px";
        iconSpan.style.backgroundRepeat = "no-repeat";
        iconSpan.style.display = "inline-block"
        iconSpan.style.height = "16px";
        iconSpan.style.width = "16px";
        let parentRegister;
        a.className = "button"
        let location = el.querySelector(`div:nth-child(${index}) > div.data > div > div.item.location > span.label`);
        if (location) {
            location = location.innerText.trim();
            location = urlCompliance(location);
        }
        let date = fetchDate(element);
        a.href = `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${date}&details=${description}%0A%0ALocalisation:+${location}%0A%0A${link}`
        a.setAttribute("target", "_blank");
        let rButton = el.querySelector(`div:nth-child(${index}) > div.data > div > div.buttons > span > span.count`);
        if (rButton)
            parentRegister = rButton.parentNode;
        if (parentRegister)
            parentRegister.insertBefore(a, rButton.nextSibling);
        a.appendChild(aManSpan);
        aManSpan.appendChild(iconSpan);
        aManSpan.appendChild(labelClass);
    })
});