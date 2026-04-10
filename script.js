const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });

// Smooth Planet Parallax Movement
const planetObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const pos = entry.target.dataset.pos;
            const planet = document.getElementById('central-planet');
            if(planet) planet.style.left = pos + '%';
        }
    });
}, { threshold: 0.15 });

function startPortfolio() {
    const splash = document.getElementById('splash-overlay');
    splash.style.opacity = '0';
    setTimeout(() => {
        splash.style.display = 'none';
        document.getElementById('main-view').classList.add('ready');
        document.body.style.overflow = 'auto';
        startTerminal();
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
        document.querySelectorAll('.section-trigger').forEach(el => planetObserver.observe(el));
    }, 1200);
}

const terminalLines = [
    { t: "> Initializing universe... ", c: "syntax-cmt" }, { t: "het_patel.py", c: "syntax-str" }, { t: "...\n", c: "syntax-cmt" },
    { t: "> ", c: "syntax-cmt" }, { t: "from", c: "syntax-kw" }, { t: " pes_university ", c: "" }, { t: "import", c: "syntax-kw" }, { t: " mca_student\n", c: "" },
    { t: "> stack: ", c: "syntax-kw" }, { t: "python, pandas, numpy, react\n", c: "syntax-str" },
    { t: "> mission_status: ", c: "syntax-kw" }, { t: "mastering_data_intelligence\n", c: "syntax-str" },
    { t: "> deployment: ", c: "syntax-kw" }, { t: "active_v2.0_kernel\n", c: "syntax-str" },
    { t: "> status: ", c: "syntax-kw" }, { t: "ready_to_explore\n", c: "syntax-str" },
    { t: "> location: ", c: "syntax-kw" }, { t: "Earth.py", c: "syntax-str" }
];

let lineIdx = 0, charIdx = 0;
function startTerminal() {
    const termEl = document.getElementById('terminal-content');
    if (!termEl) return;
    if (lineIdx < terminalLines.length) {
        if (charIdx === 0) {
            const span = document.createElement('span');
            if (terminalLines[lineIdx].c) span.className = terminalLines[lineIdx].c;
            span.id = `line-${lineIdx}`;
            termEl.appendChild(span);
        }
        document.getElementById(`line-${lineIdx}`).textContent += terminalLines[lineIdx].t[charIdx];
        charIdx++;
        if (charIdx === terminalLines[lineIdx].t.length) { lineIdx++; charIdx = 0; }
        setTimeout(startTerminal, 25);
    } else {
        const cursor = document.createElement('span');
        cursor.className = 'w-1.5 h-4 bg-purple-500 inline-block ml-1 animate-pulse align-middle';
        termEl.appendChild(cursor);
    }
}

const genStars = (id, count) => {
    const el = document.getElementById(id);
    if (!el) return;
    let shadows = [];
    for(let i=0; i<count; i++) shadows.push(`${Math.random()*2000}px ${Math.random()*2000}px #fff`);
    el.style.boxShadow = shadows.join(',');
}

document.addEventListener('DOMContentLoaded', () => {
    genStars('stars-far', 600); genStars('stars-mid', 300); genStars('stars-near', 150); genStars('splash-stars', 300);
});

window.filterProjects = (category) => {
    document.querySelectorAll('.proj-filter-btn').forEach(btn => {
        btn.className = (btn.dataset.filter === category) ? 
        "proj-filter-btn px-8 py-3 rounded-xl text-xs font-black uppercase transition-all bg-purple-600 text-white shadow-xl" : 
        "proj-filter-btn px-8 py-3 rounded-xl text-xs font-black uppercase transition-all text-slate-500 hover:bg-white/5";
    });
    document.querySelectorAll('#project-grid .card').forEach(card => {
        card.style.display = (category === 'all' || card.dataset.category === category) ? 'flex' : 'none';
    });
};

window.copyToClipboard = (text, id) => {
    const el = document.createElement('textarea'); el.value = text; document.body.appendChild(el); el.select();
    document.execCommand('copy'); document.body.removeChild(el);
    const btn = document.getElementById(`btn-copy-${id}`);
    if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check text-green-500"></i>';
        setTimeout(() => btn.innerHTML = original, 2000);
    }
};
