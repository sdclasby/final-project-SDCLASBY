document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://www.eventbriteapi.com/v3/events/search/";
    const authToken = "7UEJ2CD5GJ5DXMCHRX64"; 
    const query = "charity";
    const location = "San Francisco";

    const fetchDataButton = document.getElementById("fetch-data-btn");
    const dataContainer = document.getElementById("data-container");

    fetchDataButton.addEventListener("click", () => {
        fetch(`${apiUrl}?q=${query}&location.address=${location}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then(data => {
                // Display event data
                dataContainer.innerHTML = data.events
                    .slice(0, 5) // Show the first 5 events
                    .map(
                        event => `
                        <div>
                            <h3>${event.name.text}</h3>
                            <p>${event.description.text || "No description available"}</p>
                            <p>Start: ${new Date(event.start.local).toLocaleString()}</p>
                            <p>End: ${new Date(event.end.local).toLocaleString()}</p>
                            <a href="${event.url}" target="_blank">View Event</a>
                        </div>
                    `
                    )
                    .join("");
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                dataContainer.innerHTML = "<p>Failed to load data. Please try again later.</p>";
            });
    });
});

