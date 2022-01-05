namespace client {
    const table: HTMLElement = document.getElementById("table");
    const tagesausflug: HTMLInputElement = <HTMLInputElement>(document.getElementById("input-event"));
    const priceInput: HTMLInputElement = <HTMLInputElement>(document.getElementById("input-preis"));
    const dateInput: HTMLInputElement = <HTMLInputElement>(document.getElementById("eventtime"));
    const enter: HTMLButtonElement = <HTMLButtonElement>(document.getElementById("enter"));

    const _url: string = "http://localhost:3000/";
    const portSingle: string = "concertEvent";
    const portAll: string = "concertEvents";

    interface ConcertEvent {
        index: number;
        artist: string;
        date: string;
        time: string;
        price: string;
    }
    let tagesausglügeFromServer: ConcertEvent[] = [];

    window.addEventListener("load", () => {
        getEventsFromServer();
    });
    enter.addEventListener("click", onSubmitEvent);


    async function getEventsFromServer(): Promise<void> {
        let response: Response = await fetch(_url + portAll);
        let text: string = await response.text();
        tagesausglügeFromServer = JSON.parse(text);
        console.log(tagesausglügeFromServer);

        for (let i: number = 0; i < tagesausglügeFromServer.length; i++) {
            createEvent(tagesausglügeFromServer[i].artist, tagesausglügeFromServer[i].price, 
                        tagesausglügeFromServer[i].date, tagesausglügeFromServer[i].time);
        }
    }

    async function onSubmitEvent(event: Event): Promise<void> {
        event.preventDefault();

        let concertEvent: ConcertEvent = {
            index: tagesausglügeFromServer.length - 1,
            artist: tagesausflug.value,
            date: dateInput.value.substring(0, 10),
            time: dateInput.value.substring(11, 16),
            price: priceInput.value
        };
        tagesausglügeFromServer.push(concertEvent);
        console.log(concertEvent);

        createEvent(concertEvent.artist, concertEvent.price, concertEvent.date, concertEvent.time);

        sendJSONStringWithPost(_url + portSingle, JSON.stringify(concertEvent));

        setTimeout(() => {
            clearInput();
        },         100);
    }

    async function sendJSONStringWithPost(url: RequestInfo, jsonString: string): Promise<void> {
        await fetch(url, {
            method: "POST",
            body: jsonString
        });
        console.log("event sent");
    }

    function createEvent(artistText: string, priceText: string, dateText: string, timeText: string): void {
        let tableRow: HTMLElement = document.createElement("tr");
        let artist: HTMLElement = document.createElement("td");
        artist.textContent = artistText;
        let price: HTMLElement = document.createElement("td");
        price.textContent = priceText;
        let date: HTMLElement = document.createElement("td");
        date.textContent = dateText;
        let time: HTMLElement = document.createElement("td");
        time.textContent = timeText;
        let trashContainer: HTMLElement = document.createElement("td");
        let trash: HTMLElement = document.createElement("i");
        trash.className = "fa fa-trash";

        table.appendChild(tableRow);
        tableRow.appendChild(artist);
        tableRow.appendChild(date);
        tableRow.appendChild(time);
        tableRow.appendChild(price);
        tableRow.appendChild(trashContainer);
        trashContainer.appendChild(trash);

        trash.addEventListener("click", (): void => {
            table.removeChild(tableRow);
        });
    }

    function clearInput(): void {
        tagesausflug.value = "";
        priceInput.value = "";
        dateInput.value = "";
    }
}