/* BovineID Ops — shared static app
 * Injects accessibility bar, header, footer.
 * Loads data.json once and exposes per-page renderers via data-page attribute.
 */
(function () {
  const ICONS = {
    clock:'⏱', check:'✓', 'wifi-off':'⚠', users:'👥', scan:'📷', fingerprint:'🪪',
    shield:'🛡', refresh:'↻', cpu:'⚙', alert:'!', wifi:'📶', cloud:'☁', drive:'💾',
    user:'👤', pin:'📍', calendar:'📅', play:'▶', book:'📖', cap:'🎓', phone:'📞',
    mail:'✉', chat:'💬', lang:'🌐', sun:'☀', focus:'◎', eye:'👁', rotate:'↺',
    upload:'↥', camera:'◉', spark:'✦', mobile:'📱', life:'🛟', search:'🔎',
    filter:'⛃', download:'⬇', xmark:'✕'
  };
  const icon = (k) => `<span class="ic" aria-hidden="true">${ICONS[k] || '•'}</span>`;

  const STATUS_TONE = { Online:'success', Offline:'destructive', Syncing:'primary', Idle:'warning' };
  const HISTORY_TONE = { Match:'success', Review:'warning', Mismatch:'destructive' };

  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

  function buildAccessibilityBar() {
    return `
      <div class="a11y">
        <div class="a11y-inner">
          <span>NDDB · National Digital Livestock Mission</span>
          <div class="a11y-controls" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
            <div class="group">
              ${icon('focus')}
              <button data-font="90">A-</button>
              <button data-font="100">A</button>
              <button data-font="115">A+</button>
              <span id="a11y-size" style="opacity:.7;margin-left:4px">100%</span>
            </div>
            <button id="a11y-lang" class="group">${icon('lang')} English</button>
            <button id="a11y-contrast" class="group">${icon('eye')} High Contrast</button>
            <a href="/support" class="group">${icon('life')} Help</a>
          </div>
        </div>
      </div>`;
  }

  function buildHeader(data, currentPath) {
    const navHtml = data.nav.map(n => {
      const isActive = n.href === currentPath || (n.href !== '/' && currentPath.startsWith(n.href));
      return `<a href="${n.href}" class="${isActive ? 'active' : ''}">${n.label}</a>`;
    }).join('');
    const op = data.brand.operator;
    const initials = op.name.split(' ').map(s => s[0]).slice(0,2).join('');
    return `
      <header class="header">
        <div class="header-inner">
          <a href="/" class="brand">
            <div class="brand-mark">${icon('scan')}</div>
            <div class="brand-text">
              <div class="name">${data.brand.name}</div>
              <div class="sub">${data.brand.tagline}</div>
            </div>
          </a>
          <nav class="nav">${navHtml}</nav>
          <div class="header-right">
            <div class="pill-status"><span class="dot"></span> Online · Sync OK</div>
            <div class="operator">
              <div class="avatar">${initials}</div>
              <div class="meta">
                <div class="n">${op.name}</div>
                <div class="s">${op.id} · ${op.region}</div>
              </div>
            </div>
          </div>
        </div>
      </header>`;
  }

  function buildFooter(data) {
    const f = data.footer;
    return `
      <footer class="footer">
        <div class="footer-inner">
          <div>© ${new Date().getFullYear()} National Dairy Development Board · NDLM Pilot Operations</div>
          <div class="tags"><span>${f.build}</span><span>${f.sla}</span><span>${f.compliance}</span></div>
        </div>
      </footer>`;
  }

  function wireA11y() {
    const setSize = (n) => {
      document.documentElement.style.fontSize = n + '%';
      const lbl = document.getElementById('a11y-size'); if (lbl) lbl.textContent = n + '%';
    };
    document.querySelectorAll('[data-font]').forEach(b =>
      b.addEventListener('click', () => setSize(parseInt(b.dataset.font, 10))));
    const langBtn = document.getElementById('a11y-lang');
    if (langBtn) langBtn.addEventListener('click', () => {
      const isEn = langBtn.textContent.includes('English');
      langBtn.innerHTML = `${ICONS.lang} ${isEn ? 'हिंदी' : 'English'}`;
    });
    const cBtn = document.getElementById('a11y-contrast');
    if (cBtn) cBtn.addEventListener('click', () => {
      const on = document.documentElement.classList.toggle('hc');
      cBtn.innerHTML = `${ICONS.eye} ${on ? 'Standard' : 'High Contrast'}`;
    });
  }

  /* -------- Page renderers -------- */
  const Renderers = {};

  Renderers.dashboard = (root, data) => {
    const d = data.dashboard;
    const statHtml = d.stats.map(s => `
      <div class="stat">
        <div class="stat-head">
          <div class="stat-icon tone-${s.tone}">${icon(s.icon)}</div>
          ${s.delta ? `<span class="delta">↗ ${s.delta}</span>` : ''}
        </div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join('');

    const qaHtml = d.quickActions.map(q => `
      <a href="${q.href}" class="qa">
        <div class="qa-icon tone-${q.accent}">${icon(q.icon)}</div>
        <div class="qa-text"><div class="qa-title">${q.title}</div><div class="qa-sub">${q.sub}</div></div>
        <span class="qa-arrow">↗</span>
      </a>`).join('');

    const insightHtml = d.insights.map(i => `
      <div class="insight">
        <div class="l">${i.label}</div>
        <div class="v">${i.value}</div>
        <div class="bar ${i.tone}"><span style="width:${i.bar}%"></span></div>
        <div class="f">${i.foot}</div>
      </div>`).join('');

    const histoHtml = d.histogram.map(h => `<div style="height:${h}%"></div>`).join('');

    const feedHtml = d.feed.map(f => `
      <li>
        <div class="dot tone-${f.tone}">${icon(f.icon)}</div>
        <div><div class="t">${f.text}</div><div class="m">${f.meta}</div></div>
      </li>`).join('');

    const deviceRows = d.devices.map(dv => `
      <tr>
        <td class="mono">${dv.id}</td><td>${dv.op}</td><td class="muted">${dv.district}</td>
        <td>${dv.pending}</td><td class="muted">${dv.last}</td>
        <td><span class="pill tone-${STATUS_TONE[dv.status]}"><span class="pd"></span>${dv.status}</span></td>
      </tr>`).join('');

    root.innerHTML = `
      <section class="hero">
        <div class="hero-inner">
          <div>
            <span class="badge">${icon('spark')} NDLM Pilot · Phase II live in 6 districts</span>
            <h1>Bovine Biometric Verification Operations</h1>
            <p>AI-assisted muzzle &amp; face recognition for cattle and buffalo, built for field workers, slow networks and rural deployment under the National Digital Livestock Mission.</p>
            <div class="hero-actions">
              <a href="/capture" class="btn btn-light">${icon('camera')} Start Capture</a>
              <a href="/verify" class="btn btn-outline-white">${icon('fingerprint')} Verify Animal</a>
            </div>
          </div>
          <div class="hero-stats">
            <div class="hero-stat"><div class="k">Operator</div><div class="v">Meena Chauhan</div><div class="s">FLW-2201 · Jaipur Cluster</div></div>
            <div class="hero-stat"><div class="k">Avg Verification TAT</div><div class="v">4.2 sec</div><div class="s">↓ 0.6s vs last week</div></div>
            <div class="hero-stat"><div class="k">Last Animal</div><div class="v">NDLM-RJ-88219</div><div class="s">Match · 98.4%</div></div>
            <div class="hero-stat"><div class="k">Model</div><div class="v">MuzzleNet v3.2</div><div class="s">On-device · Quantised</div></div>
          </div>
        </div>
      </section>

      <div class="container">
        <section class="section">
          <div class="section-head"><div><h2>Operational Dashboard</h2><div class="sub">Live state across the pilot. Updated every 30 seconds.</div></div></div>
          <div class="grid g4">${statHtml}</div>
        </section>

        <section class="section">
          <div class="section-head"><div><h2>Quick Actions</h2><div class="sub">One-tap entry points for field workflows.</div></div></div>
          <div class="grid g4">${qaHtml}</div>
        </section>

        <section class="section grid g32">
          <div class="card">
            <div class="section-head" style="margin-bottom:0">
              <div><h3>AI Verification Insights</h3><div class="card-sub">Last 24 hours · MuzzleNet v3.2</div></div>
              <span class="pill tone-success"><span class="pd"></span>Healthy</span>
            </div>
            <div class="grid g3" style="margin-top:18px">${insightHtml}</div>
            <div class="histo-wrap">
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:8px">
                <strong>Confidence distribution (last 500 captures)</strong>
                <span class="muted">Avg 96.7%</span>
              </div>
              <div class="histo">${histoHtml}</div>
              <div class="histo-axis"><span>50%</span><span>70%</span><span>85%</span><span>95%</span><span>100%</span></div>
            </div>
          </div>
          <div class="card">
            <div class="section-head" style="margin-bottom:0">
              <h3>Pilot Activity Feed</h3>
              <a href="/history" class="btn-ghost">View all</a>
            </div>
            <ol class="feed">${feedHtml}</ol>
          </div>
        </section>

        <section class="section">
          <div class="card">
            <div class="section-head" style="margin-bottom:0">
              <div><h3>Device Synchronization Status</h3><div class="card-sub">325 devices deployed across 6 districts</div></div>
              <a href="/sync" class="chip-btn">${icon('cpu')} Open Sync Console</a>
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>Device ID</th><th>Operator</th><th>District</th><th>Pending</th><th>Last Sync</th><th>Status</th></tr></thead>
                <tbody>${deviceRows}</tbody>
              </table>
            </div>
          </div>
        </section>
      </div>`;
  };

  Renderers.capture = (root, data) => {
    root.innerHTML = `
      <div class="container">
        <div class="page-head">
          <div class="eyebrow">Field Operation</div>
          <h1>Mobile Capture · AI-Assisted</h1>
          <p>Hold the device steady. Live AI guidance will frame the muzzle automatically.</p>
        </div>
        <div class="section grid g32">
          <div class="card phone-wrap-card">
            <div class="phone-wrap">
              <div class="phone">
                <div class="viewport">
                  <div class="vp-top"><span>FLW-2201</span><span><span class="rec-dot"></span>REC · 00:03</span><span>4G · 78%</span></div>
                  <div class="guide-bubble">
                    <div class="b">${icon('spark')} Muzzle aligned · Hold still</div>
                    <div class="s">Confidence rising · 92% → ready in 1.2s</div>
                  </div>
                  <div class="reticle">
                    <div class="corner c1"></div><div class="corner c2"></div><div class="corner c3"></div><div class="corner c4"></div>
                    <div class="muzzle">
                      <div class="nostril n1"></div><div class="nostril n2"></div>
                    </div>
                  </div>
                  <div class="vp-bottom">
                    <div class="chips">
                      <div class="chip ok">Lighting OK</div>
                      <div class="chip ok">Distance 28cm</div>
                      <div class="chip warn">Hold steady</div>
                    </div>
                    <div class="ctrls">
                      <button class="ctrl-sm">${icon('rotate')}</button>
                      <button class="shutter">${icon('camera')}</button>
                      <button class="ctrl-sm">${icon('upload')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="text-align:center;font-size:12px;color:var(--muted);margin-top:14px">
              Animal: <span class="mono" style="color:var(--fg)">NDLM-RJ-88219</span> · Operator <strong>Meena Chauhan</strong>
            </div>
          </div>
          <div>
            <div class="card"><h3>Live AI Guidance</h3>
              <ul class="guide-list">
                <li><span class="ic" style="color:var(--success)">${ICONS.focus}</span> Muzzle centred in frame</li>
                <li><span class="ic" style="color:var(--success)">${ICONS.sun}</span> Lighting sufficient (520 lux)</li>
                <li><span class="ic" style="color:var(--success)">${ICONS.eye}</span> Both nostrils visible</li>
                <li><span class="ic" style="color:var(--warning)">${ICONS.alert}</span> Slight motion blur — hold 0.5s</li>
              </ul>
            </div>
            <div class="card" style="margin-top:14px">
              <h3>Capture Mode</h3>
              <div class="mode-grid">
                <button class="mode-btn active">${icon('fingerprint')} Muzzle</button>
                <button class="mode-btn">${icon('mobile')} Face</button>
              </div>
              <div class="note">On-device inference · MuzzleNet v3.2 · No image leaves device until sync.</div>
            </div>
            <a href="/verify" class="btn btn-primary" style="margin-top:14px;width:100%;justify-content:center">${icon('check')} Capture &amp; Verify</a>
          </div>
        </div>
      </div>`;
  };

  Renderers.verify = (root, data) => {
    const v = data.verify;
    const fieldsHtml = v.animal.fields.map(f => `
      <div class="field"><div class="l">${icon(f.icon)}${f.label}</div><div class="v">${f.value}</div></div>`).join('');
    const auditHtml = v.audit.map(a => `<li><span class="t">${a.time}</span><span class="${a.ok ? 'ok' : ''}">${a.text}</span></li>`).join('');
    root.innerHTML = `
      <div class="container">
        <div class="page-head page-head-row">
          <div><div class="eyebrow">Result</div><h1>Verification Successful</h1></div>
          <div class="muted" style="font-size:12px">⏱ Completed in 4.2 seconds</div>
        </div>
        <div class="section grid g32">
          <div class="card verify-card">
            <div class="verify-head">
              <div class="verify-icon">${icon('check')}</div>
              <div style="flex:1">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                  <span class="tag-match">MATCH</span>
                  <span class="muted" style="font-size:12px">Confidence ${v.animal.confidence}% · Threshold 92%</span>
                </div>
                <h2 style="margin:8px 0 2px;font-size:20px">${v.animal.id}</h2>
                <p class="muted" style="margin:0;font-size:14px">${v.animal.breed}</p>
                <div class="field-grid">${fieldsHtml}</div>
                <div class="conf-block">
                  <div class="row"><span><strong>Match confidence</strong></span><span class="v">${v.animal.confidence}%</span></div>
                  <div class="bar primary"><span style="width:${v.animal.confidence}%"></span></div>
                  <div class="triplet">
                    <div>Muzzle similarity<span class="v">98.7%</span></div>
                    <div>Face geometry<span class="v">96.1%</span></div>
                    <div>Liveness check<span class="v" style="color:var(--success)">Passed</span></div>
                  </div>
                </div>
                <div class="cta-row">
                  <button class="btn btn-primary">Confirm &amp; Log →</button>
                  <a href="/capture" class="btn btn-outline">Re-capture</a>
                  <button class="btn btn-danger-outline">Flag mismatch</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="card"><h3>Audit Trail</h3><ol class="audit">${auditHtml}</ol></div>
            <div class="divider-warn" style="margin-top:14px">
              <div class="h">${icon('alert')} Duplicate Watch</div>
              <p>No duplicates found in 50km radius. Last 30-day collisions: 0.</p>
            </div>
          </div>
        </div>
      </div>`;
  };

  Renderers.sync = (root, data) => {
    const s = data.sync;
    const tilesHtml = s.tiles.map(t => `
      <div class="stat">
        <div class="stat-icon tone-${t.tone}">${icon(t.icon)}</div>
        <div class="stat-value">${t.value}</div>
        <div class="stat-label">${t.label}</div>
      </div>`).join('');
    const clustersHtml = s.clusters.map(c => `
      <div class="cluster-row">
        <div class="hd"><span><strong>${c.name}</strong></span><span class="s">${c.synced} / ${c.total} synced</span></div>
        <div class="bar primary"><span style="width:${(c.synced/c.total*100).toFixed(1)}%"></span></div>
      </div>`).join('');
    const conflictsHtml = s.conflicts.map(c => `
      <li>
        <span style="color:${c.ok?'var(--success)':'var(--warning)'};margin-top:2px">${c.ok?'✓':'!'}</span>
        <div><div>${c.title}</div><div class="sub">${c.sub}</div></div>
      </li>`).join('');
    const queueHtml = s.queue.map(q => `
      <tr>
        <td class="mono">${q.id}</td><td>${q.op}</td><td><strong>${q.pending}</strong></td>
        <td class="muted">${q.bw}</td><td class="muted">${q.eta}</td>
        <td><button class="chip-btn">Push</button></td>
      </tr>`).join('');
    root.innerHTML = `
      <div class="container">
        <div class="page-head page-head-row">
          <div>
            <div class="eyebrow">Operations</div>
            <h1>Device Sync Dashboard</h1>
            <p>Resilient sync built for low-bandwidth rural deployments.</p>
          </div>
          <button class="btn btn-primary">${icon('refresh')} Force Sync All</button>
        </div>
        <div class="section">
          <div class="grid g4">${tilesHtml}</div>
          <div class="grid g32" style="margin-top:24px">
            <div class="card">
              <h3>Cluster Sync Health</h3>
              <div class="card-sub">By district · last 6 hours</div>
              <div style="margin-top:18px">${clustersHtml}</div>
            </div>
            <div class="card">
              <h3>Sync Conflicts</h3>
              <ul class="conflicts">${conflictsHtml}</ul>
            </div>
          </div>
          <div class="card" style="margin-top:24px">
            <h3>Per-Device Queue</h3>
            <div class="table-wrap">
              <table>
                <thead><tr><th>Device</th><th>Operator</th><th>Pending</th><th>Bandwidth</th><th>ETA</th><th>Actions</th></tr></thead>
                <tbody>${queueHtml}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`;
  };

  Renderers.history = (root, data) => {
    const rowsHtml = data.history.map(r => {
      const tone = r.conf >= 92 ? 'success' : r.conf >= 75 ? 'warning' : 'destructive';
      const sIcon = r.status === 'Match' ? '✓' : r.status === 'Review' ? '!' : '✕';
      return `<tr>
        <td class="muted">${r.time}</td><td class="mono">${r.id}</td><td>${r.op}</td>
        <td class="muted">${r.dist}</td>
        <td><div class="conf-mini"><div class="bar ${tone}"><span style="width:${r.conf}%"></span></div><span class="mono">${r.conf}%</span></div></td>
        <td class="muted">${r.tat}s</td>
        <td><span class="pill tone-${HISTORY_TONE[r.status]}">${sIcon} ${r.status}</span></td>
      </tr>`;
    }).join('');
    root.innerHTML = `
      <div class="container">
        <div class="page-head"><div class="eyebrow">Records</div><h1>Verification History</h1></div>
        <div class="section">
          <div class="card" style="padding:0">
            <div class="toolbar">
              <div class="search"><span class="si">${ICONS.search}</span><input placeholder="Search NDLM ID, operator, village…"></div>
              <button class="chip-btn">${icon('filter')} District: All</button>
              <button class="chip-btn">${icon('filter')} Status: All</button>
              <button class="btn btn-primary" style="padding:7px 12px;font-size:12px">${icon('download')} Export CSV</button>
            </div>
            <div class="table-wrap" style="border:0;border-radius:0;margin:0">
              <table>
                <thead><tr><th>Time</th><th>Animal ID</th><th>Operator</th><th>District</th><th>Confidence</th><th>TAT</th><th>Status</th></tr></thead>
                <tbody>${rowsHtml}</tbody>
              </table>
            </div>
            <div class="pager">
              <span>Showing 1–8 of 2,418 records · Today</span>
              <div class="pages"><button>Prev</button><button class="cur">1</button><button>2</button><button>3</button><button>Next</button></div>
            </div>
          </div>
        </div>
      </div>`;
  };

  Renderers.support = (root, data) => {
    const s = data.support;
    const cardsHtml = s.cards.map(c => `
      <div class="card">
        <div class="help-icon">${icon(c.icon)}</div>
        <h4 style="margin:12px 0 4px;font-size:14px">${c.title}</h4>
        <p class="muted" style="margin:0;font-size:12px">${c.body}</p>
        <button class="btn-ghost" style="margin-top:14px">${c.action} →</button>
      </div>`).join('');
    const faqsHtml = s.faqs.map((f, i) => `
      <details ${i===0 ? 'open' : ''}><summary>${f.q}</summary><p>${f.a}</p></details>`).join('');
    root.innerHTML = `
      <div class="container">
        <div class="page-head">
          <div class="eyebrow">Help Center</div>
          <h1>Support &amp; Training</h1>
          <p>Built for field workers — Hindi, English and 6 regional languages.</p>
        </div>
        <div class="section">
          <div class="grid g3">${cardsHtml}</div>
          <div class="grid g32" style="margin-top:24px">
            <div class="card"><h3>Frequently Asked</h3><div style="margin-top:8px">${faqsHtml}</div></div>
            <div>
              <div class="card">
                <h3>Helpline</h3>
                <ul class="help-list">
                  <li><span class="ic">${ICONS.phone}</span> 1800-180-1551 (toll free)</li>
                  <li><span class="ic">${ICONS.chat}</span> WhatsApp · +91 90000 11551</li>
                  <li><span class="ic">${ICONS.mail}</span> support@ndlm.gov.in</li>
                  <li><span class="ic">${ICONS.lang}</span> HI · EN · MR · GU · TA · TE</li>
                </ul>
                <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:12px">${icon('life')} Raise Ticket</button>
              </div>
              <div class="card" style="margin-top:14px;background:var(--secondary)">
                <p class="muted" style="margin:0;font-size:12px">Average response time: <strong style="color:var(--fg)">8 minutes</strong>. Tickets resolved in <strong style="color:var(--fg)">98.4%</strong> of cases within SLA.</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  };

  /* -------- Bootstrap -------- */
  async function init() {
    const data = await fetch('/data.json').then(r => r.json());
    const path = window.location.pathname.replace(/\.html$/, '') || '/';
    document.body.prepend(el(buildAccessibilityBar()));
    document.body.insertBefore(el(buildHeader(data, path)), document.body.children[1]);
    wireA11y();

    const main = document.getElementById('page');
    const page = document.body.dataset.page;
    if (main && Renderers[page]) Renderers[page](main, data);

    document.body.appendChild(el(buildFooter(data)));
  }
  document.addEventListener('DOMContentLoaded', init);
})();