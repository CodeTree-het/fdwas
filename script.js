const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });

function startPortfolio() {
    const splash = document.getElementById('splash-overlay');
    const main = document.getElementById('main-view');
    splash.style.opacity = '0';
    setTimeout(() => {
        splash.style.display = 'none';
        main.classList.add('ready');
        document.body.style.overflow = 'auto';
        startTerminal();
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }, 1000);
}

const terminalLines = [
    { t: "> initializing ", c: "syntax-cmt" }, { t: "het_patel.ipynb", c: "syntax-str" }, { t: "...\n", c: "syntax-cmt" },
    { t: "> ", c: "syntax-cmt" }, { t: "from", c: "syntax-kw" }, { t: " pes_university ", c: "" }, { t: "import", c: "syntax-kw" }, { t: " mca_student\n", c: "" },
    { t: "> mission_status: ", c: "syntax-kw" }, { t: "optimizing_ai_logic\n", c: "syntax-str" },
    { t: "> deploying: ", c: "syntax-kw" }, { t: "service_provider_sys\n", c: "syntax-str" },
    { t: "> status: ", c: "syntax-kw" }, { t: "ready_to_explore\n", c: "syntax-str" },
    { t: "> kernel: ", c: "syntax-kw" }, { t: "active_v2.0\n", c: "syntax-str" },
    { t: "> location: ", c: "syntax-kw" }, { t: "Earth.py", c: "syntax-str" }
];

let lineIdx = 0, charIdx = 0;
const termEl = document.getElementById('terminal-content');

function startTerminal() {
    if (lineIdx < terminalLines.length) {
        if (charIdx === 0) {
            const span = document.createElement('span');
            if (terminalLines[lineIdx].c) span.className = terminalLines[lineIdx].c;
            span.id = `line-${lineIdx}`;
            termEl.appendChild(span);
        }
        const currentLine = document.getElementById(`line-${lineIdx}`);
        currentLine.textContent += terminalLines[lineIdx].t[charIdx];
        charIdx++;
        if (charIdx === terminalLines[lineIdx].t.length) { lineIdx++; charIdx = 0; }
        setTimeout(startTerminal, 25);
    } else {
        const cursor = document.createElement('span');
        cursor.className = 'w-1.5 h-3 bg-indigo-500 inline-block ml-1 animate-pulse align-middle';
        termEl.appendChild(cursor);
    }
}

window.filterProjects = (category) => {
    document.querySelectorAll('.proj-filter-btn').forEach(btn => {
        btn.className = (btn.dataset.filter === category) ?
        "proj-filter-btn px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" :
        "proj-filter-btn px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 hover:bg-white/5";
    });

    document.querySelectorAll('#project-grid .card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
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

// Starfield generation
document.addEventListener('DOMContentLoaded', () => {
    const starfield = document.getElementById('starfield');
    if (starfield) {
        let shadowList = '';
        for (let i = 0; i < 200; i++) {
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            shadowList += `${x}px ${y}px #fff${i < 199 ? ', ' : ''}`;
        }
        starfield.style.boxShadow = shadowList;
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-nav');
            navbar.classList.remove('py-6');
            navbar.classList.add('py-3');
        } else {
            navbar.classList.remove('glass-nav');
            navbar.classList.remove('py-3');
            navbar.classList.add('py-6');
        }
    });
});
