const UI = {
    next: function(step) {
        const u = document.getElementById('username').value;
        const i = document.getElementById('userid').value;
        if (step === 2 && (!u || !i)) return alert("Details required.");
        
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById('section' + step).classList.add('active');
    },
    notify: function() {
        const n = document.getElementById('notification');
        n.style.display = 'block';
        setTimeout(() => { location.reload(); }, 3000);
    }
};

document.getElementById('submitBtn').addEventListener('click', async (e) => {
    const btn = e.target;
    const username = document.getElementById('username').value;
    const userid = document.getElementById('userid').value;
    const reason = document.getElementById('whyunban').value;
    const banReason = document.getElementById('whyban').value;

    if (!reason) return alert("Please provide a reason.");

    btn.innerText = "Processing...";
    btn.disabled = true;

    const data = {
        embeds: [{
            title: "📂 New Appeal Received",
            color: 10655742,
            fields: [
                { name: "Identity", value: `${username} (${userid})` },
                { name: "Statement", value: reason },
                { name: "Previous Log", value: banReason || "None" }
            ],
            timestamp: new Date()
        }]
    };

    try {
        const res = await fetch(__SECRET_CORE__.getKey(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) UI.notify();
    } catch (err) {
        alert("Transmission error.");
        btn.innerText = "Submit Appeal";
        btn.disabled = false;
    }
});