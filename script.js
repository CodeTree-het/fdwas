/**
 * Het Patel | MLExplorer Portfolio Logic
 * Handles animations, terminal effects, and interactions.
 */

// 1. Intersection Observer for Scroll Reveals
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); 
        }
    });
}, { threshold: 0.1 });

// 2. Splash Screen & Portfolio Initialization
function startPortfolio() {
    const splash = document.getElementById('splash-overlay');
    const main = document.getElementById('main-view');
    
    // Fade out splash
    splash.style.opacity = '0';
    
    setTimeout(() => {
        splash.style.display = 'none';
        main.classList.add('ready');
        
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
        
        // Start terminal and observers
        startTerminal();
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }, 1000);
}

// 3. Terminal Typing Engine
const terminalLines = [
    { t: "> initializing ", c: "syntax-cmt" }, 
    { t: "het_patel.ipynb", c: "syntax-str" }, 
    { t: "...\n", c: "syntax-cmt" },
    { t: "> ", c: "syntax-cmt" }, 
    { t: "from", c: "syntax-kw" }, 
    { t: " pes_university ", c: "" }, 
    { t: "import", c: "syntax-kw" }, 
    { t: " mca_student\n", c: "" },
    { t: "> mission_status: ", c: "syntax-kw" }, 
    { t: "optimizing_ai_logic\n", c: "syntax-str" },
    { t: "> deploying: ", c: "syntax-kw" }, 
    { t: "service_provider_sys\n", c: "syntax-str" },
    { t: "> status: ", c: "syntax-kw" }, 
    { t: "ready_to_explore\n", c: "syntax-str" },
    { t: "> kernel: ", c: "syntax-kw" }, 
    { t: "active_v2.0\n", c: "syntax-str" },
    { t: "> location: ", c: "syntax-kw" }, 
    { t: "Earth.py", c: "syntax-str" }
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
        
        if (charIdx === terminalLines[lineIdx].t.length) { 
            lineIdx++; 
            charIdx = 0; 
        }
        
        setTimeout(startTerminal, 25);
    } else {
        // Add flashing cursor at the end
        const cursor = document.createElement('span');
        cursor.className = 'w-1.5 h-3 bg-indigo-500 inline-block ml-1 animate-pulse align-middle';
        termEl.appendChild(cursor);
    }
}

// 4. Project Filter Logic
window.filterProjects = (category) => {
    // Update Button UI
    document.querySelectorAll('.proj-filter-btn').forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.className = "proj-filter-btn px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-indigo-600 text-white shadow-xl shadow-indigo-600/20";
        } else {
            btn.className = "proj-filter-btn px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 hover:bg-white/5";
        }
    });
    
    // Filter Cards
    document.querySelectorAll('#project-grid .card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
};

// 5. Utility: Copy to Clipboard
window.copyToClipboard = (text, id) => {
    const el = document.createElement('textarea'); 
    el.value = text; 
    document.body.appendChild(el); 
    el.select();
    document.execCommand('copy'); 
    document.body.removeChild(el);
    
    const btn = document.getElementById(`btn-copy-${id}`);
    if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check text-green-500"></i>';
        setTimeout(() => btn.innerHTML = original, 2000);
    }
};

// 6. Dynamic Starfield Generation
document.addEventListener('DOMContentLoaded', () => {
    const starfield = document.getElementById('starfield');
    let shadows = [];
    
    // Generate 200 random star positions
    for(let i=0; i<200; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        shadows.push(`${x}px ${y}px #fff`);
    }
    
    starfield.style.boxShadow = shadows.join(',');
});