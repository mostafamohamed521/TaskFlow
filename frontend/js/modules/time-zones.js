/* ========================================
   TIME ZONES
   Shared by Create Workspace, My Profile and
   App Preferences.
======================================== */

export function formatUtcOffset(timeZone) {
    try {
        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone,
            timeZoneName: "longOffset"
        }).formatToParts(new Date());

        const offset = parts.find((part) => part.type === "timeZoneName")?.value || "GMT";

        return offset === "GMT" ? "UTC+00:00" : offset.replace("GMT", "UTC");
    } catch (error) {
        return "UTC";
    }
}


export function getTimeZoneLabel(timeZone) {
    if (!timeZone) {
        return "";
    }

    const city = timeZone.split("/").pop().replaceAll("_", " ");

    return `(${formatUtcOffset(timeZone)}) ${city}`;
}


export function getBrowserTimeZone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (error) {
        return "";
    }
}


/** Adds the zone to a <select> when it is not one of the listed options. */
export function ensureTimeZoneOption(select, timeZone) {
    if (!select || !timeZone || select.querySelector(`option[value="${timeZone}"]`)) {
        return;
    }

    const option = document.createElement("option");

    option.value = timeZone;
    option.textContent = getTimeZoneLabel(timeZone);
    select.prepend(option);
}
