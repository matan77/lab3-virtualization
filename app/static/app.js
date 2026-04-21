const MAX_DASH = 188;

function setGauge(id, value) {
  const offset = MAX_DASH - (value / 100) * MAX_DASH;
  document.getElementById(id).style.strokeDashoffset = offset;
}

async function fetchStats() {
  try {
    const res = await fetch("/api/stats");
    const data = await res.json();

    document.getElementById("hostname").innerText = data.hostname;
    document.getElementById("cpu").innerText = data.cpu + "%";
    document.getElementById("ram").innerText = data.ram + "%";
    document.getElementById("uptime").innerText = data.uptime;
    document.getElementById("cores").innerText = data.cores;

    setGauge("cpuGauge", data.cpu);
    setGauge("ramGauge", data.ram);
  } catch (err) {
    console.error("Failed to fetch stats:", err);
  }
}

// initial load
fetchStats();

// refresh loop
setInterval(fetchStats, 2000);
