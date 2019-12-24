function getNthDayOf(e, a, t, n) {
    const s = new Date(Date.parse(`${t}/1/${n} GMT`));
    let d = s.getUTCDay() - a;
    d = d > 0 ? 7 - d : -d;
    const D = s.getUTCDate() + d + 7 * (e - 1);
    return new Date(Date.parse(`${t}/${D}/${n} GMT`))
}

function getLastDayOf(e, a, t) {
    const n = getNthDayOf(1, e, a, t).getUTCDate(),
        s = new Date(t, a, 0).getUTCDate() - 7;
    let d = n;
    for (; d <= s;) d += 7;
    return new Date(Date.parse(`${a}/${d}/${t} GMT`))
}

function allFederalHolidaysForYear(e = (new Date).getFullYear(), {
    shiftSaturdayHolidays: a = !0,
    shiftSundayHolidays: t = !0
} = {}) {
    const n = [];
    return n.push({
        name: "New Year's Day",
        date: new Date(Date.parse(`1/1/${e} GMT`))
    }), n.push({
        name: "Birthday of Martin Luther King, Jr.",
        date: getNthDayOf(3, 1, 1, e)
    }), n.push({
        name: "Washington's Birthday",
        date: getNthDayOf(3, 1, 2, e)
    }), n.push({
        name: "Memorial Day",
        date: getLastDayOf(1, 5, e)
    }), n.push({
        name: "Independence Day",
        date: new Date(Date.parse(`7/4/${e} GMT`))
    }), n.push({
        name: "Labor Day",
        date: getNthDayOf(1, 1, 9, e)
    }), n.push({
        name: "Columbus Day",
        date: getNthDayOf(2, 1, 10, e)
    }), n.push({
        name: "Veterans Day",
        date: new Date(Date.parse(`11/11/${e} GMT`))
    }), n.push({
        name: "Thanksgiving Day",
        date: getNthDayOf(4, 4, 11, e)
    }), n.push({
        name: "Christmas Day",
        date: new Date(Date.parse(`12/25/${e} GMT`))
    }), (a || t) && n.forEach(e => {
        const n = e.date.getUTCDay();
        0 === n && t ? e.date = new Date(Date.UTC(e.date.getUTCFullYear(), e.date.getUTCMonth(), e.date.getUTCDate() + 1)) : 6 === n && a && (e.date = new Date(Date.UTC(e.date.getUTCFullYear(), e.date.getUTCMonth(), e.date.getUTCDate() - 1)))
    }), n.forEach(e => {
        e.dateString = `${e.date.getUTCFullYear()}-${e.date.getUTCMonth()+1}-${e.date.getUTCDate()}`
    }), n
}

function isAHoliday(e = new Date, {
    shiftSaturdayHolidays: a = !0,
    shiftSundayHolidays: t = !0,
    utc: n = !1
} = {}) {
    const s = n ? e.getUTCFullYear() : e.getFullYear(),
        d = {
            shiftSaturdayHolidays: a,
            shiftSundayHolidays: t
        },
        D = allFederalHolidaysForYear(s, d),
        r = allFederalHolidaysForYear(s + 1, d);
    r[0].date.getUTCFullYear() === s && D.push(r[0]);
    const o = n ? e.getUTCMonth() : e.getMonth(),
        g = n ? e.getUTCDate() : e.getDate();
    return D.find(e => e.date.getUTCMonth() === o && e.date.getUTCDate() === g) || false
}
