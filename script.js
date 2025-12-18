// Clock Logic
    function updateClock(){
        const now = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const pad = (n) => n < 10 ? '0'+n : n;

        const dateStr = `${days[now.getDay()]}, ${pad(now.getDate())} ${months[now.getMonth()]} ${now.getFullYear()}`;
        let h = now.getHours();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        const timeStr = `${pad(h)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`;

        document.getElementById('header-clock').innerHTML = `${dateStr}<br>${timeStr}`;
    }

    // Dynamic Greeting
    function setGreeting() {
        const hour = new Date().getHours();
        const el = document.getElementById('dynamic-greeting');
        if (hour < 12) el.innerText = "Good Morning! ☀️";
        else if (hour < 18) el.innerText = "Good Afternoon! 🌤️";
        else el.innerText = "Good Evening! 🌙";
    }

    // UNIVERSAL TOGGLE FUNCTION
    function toggleSection(id) {
        const content = document.getElementById(id);
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        updateClock();
        setInterval(updateClock, 1000);
        setGreeting();
    });