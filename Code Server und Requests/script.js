"use strict";
var script;
(function (script) {
    const table = document.getElementById("Tabelle");
    const tagesausflugInput = (document.getElementById("Tagesausflug"));
    const preisInput = (document.getElementById("Preis"));
    const datumInput = (document.getElementById("Datum"));
    const submit = (document.getElementById("submit"));
    const clear = (document.getElementById("clear"));
    let rows = [];
    let loadRows = [];
    let savedRows;
    window.addEventListener("load", () => {
        loadTable();
    });
    submit.addEventListener("click", () => {
        console.log("test");
        createEvent(tagesausflugInput.value, preisInput.value, datumInput.value.substring(0, 10), datumInput.value.substring(11, 16), true);
        setTimeout(function () {
            clearInput();
        }, 100);
    });
    function createEvent(tagesausflugText, preisText, datumText, tageszeitText, save) {
        let tabellenEintrag = document.createElement("tr");
        let tagesausflug = document.createElement("td");
        tagesausflug.textContent = tagesausflugText;
        let preis = document.createElement("td");
        preis.textContent = preisText;
        let datum = document.createElement("td");
        datum.textContent = datumText;
        let tageszeit = document.createElement("td");
        tageszeit.textContent = tageszeitText;
        let löschZeile = document.createElement("td");
        let löschButton = document.createElement("button");
        löschButton.innerHTML = "Löschen";
        table.appendChild(tabellenEintrag);
        tabellenEintrag.appendChild(tagesausflug);
        tabellenEintrag.appendChild(preis);
        tabellenEintrag.appendChild(datum);
        tabellenEintrag.appendChild(tageszeit);
        tabellenEintrag.appendChild(löschZeile);
        löschZeile.appendChild(löschButton);
        if (save) {
            let saveRow = {
                tagesausflug: tabellenEintrag.textContent,
                preis: preis.textContent,
                datum: datum.textContent,
                tageszeit: tageszeit.textContent
            };
            rows.push(saveRow);
            savedRows = JSON.stringify(rows);
            console.log(savedRows);
            localStorage.setItem("savedRows", savedRows);
        }
        löschButton.addEventListener("click", () => {
            table.removeChild(tabellenEintrag);
        });
    }
    function clearInput() {
        tagesausflugInput.value = "";
        preisInput.value = "";
        datumInput.value = "";
    }
    function loadTable() {
        if (localStorage.length < 1)
            return;
        loadRows = JSON.parse(localStorage.getItem("savedRows"));
        console.log(loadRows);
        for (let i = 0; i < loadRows.length; i++) {
            createEvent(loadRows[i].tagesausflug, loadRows[i].preis, loadRows[i].datum, loadRows[i].tageszeit, false);
        }
        rows = loadRows;
        loadRows = [];
    }
})(script || (script = {}));
//# sourceMappingURL=script.js.map