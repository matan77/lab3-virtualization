from flask import Flask, render_template, jsonify
import socket
import psutil
import datetime

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/stats")
def stats():
    hostname = socket.gethostname()
    cpu = psutil.cpu_percent(interval=0.5)
    ram = psutil.virtual_memory().percent
    cores = psutil.cpu_count()

    uptime_seconds = datetime.datetime.now().timestamp() - psutil.boot_time()
    uptime = str(datetime.timedelta(seconds=int(uptime_seconds)))

    return jsonify({
        "hostname": hostname,
        "cpu": cpu,
        "ram": ram,
        "cores": cores,
        "uptime": uptime
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)