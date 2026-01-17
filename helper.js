// Catan Helper v1 - Cities & Knights Companion
// Loaded via tiny bookmarklet, cached in localStorage
(function() {
  if (!location.hostname.includes("csdu.co.uk")) {
    alert("Open this on g.csdu.co.uk with your game!");
    return;
  }

  var C = {
    200: { n: "Alchemist", c: "science", i: "🧪", d: "Choose dice result for resource production" },
    201: { n: "Crane", c: "science", i: "🏗️", d: "Build city improvement for 1 less commodity" },
    202: { n: "Engineer", c: "science", i: "⚙️", d: "Build a city wall for free" },
    203: { n: "Inventor", c: "science", i: "💡", d: "Swap 2 number tokens (not 6, 8, 2, 12)" },
    204: { n: "Irrigation", c: "science", i: "💧", d: "Each settlement on grain gets 2 grain" },
    205: { n: "Medicine", c: "science", i: "💊", d: "Upgrade settlement to city for 2 ore + 1 grain" },
    206: { n: "Mining", c: "science", i: "⛏️", d: "Each settlement on ore/mountains gets 2 ore" },
    207: { n: "Printer", c: "science", i: "📰", d: "+1 Victory Point (keep until played)" },
    208: { n: "Road Building", c: "science", i: "🛤️", d: "Build 2 roads for free" },
    209: { n: "Smith", c: "science", i: "🔨", d: "Promote 2 knights for free" },
    300: { n: "Commercial Harbor", c: "trade", i: "⚓", d: "Force opponents to give you 1 commodity each (1 per their VP)" },
    301: { n: "Master Merchant", c: "trade", i: "🎩", d: "Look at opponent hand, take 2 cards" },
    302: { n: "Merchant", c: "trade", i: "🧑‍💼", d: "Place merchant for 2:1 trade + 1 VP" },
    303: { n: "Merchant Fleet", c: "trade", i: "⛵", d: "Trade any resource 2:1 this turn" },
    304: { n: "Resource Monopoly", c: "trade", i: "💎", d: "Name a resource, each player gives you 2" },
    305: { n: "Trade Monopoly", c: "trade", i: "👑", d: "Name a commodity, each player gives you 1" },
    400: { n: "Bishop", c: "politics", i: "✝️", d: "Move robber, take 1 card from each adjacent player" },
    401: { n: "Constitution", c: "politics", i: "📜", d: "+1 Victory Point (keep until played)" },
    402: { n: "Deserter", c: "politics", i: "🏃", d: "Remove any opponent knight from the board" },
    403: { n: "Diplomat", c: "politics", i: "🤝", d: "Remove any open road (yours or opponent)" },
    404: { n: "Intrigue", c: "politics", i: "🗡️", d: "Displace opponent knight to move yours there" },
    405: { n: "Saboteur", c: "politics", i: "💣", d: "All opponents with more VP discard half their hand" },
    406: { n: "Spy", c: "politics", i: "🕵️", d: "Look at opponent progress cards, steal 1" },
    407: { n: "Warlord", c: "politics", i: "⚔️", d: "Activate all your knights for free" },
    408: { n: "Wedding", c: "politics", i: "💒", d: "Each player with more VP gives you 2 cards" }
  };

  var B = {
    road: { n: "Road", i: "🛣️", c: { lumber: 1, brick: 1 } },
    settlement: { n: "Settlement", i: "🏠", c: { lumber: 1, brick: 1, wool: 1, grain: 1 } },
    city: { n: "City", i: "🏰", c: { grain: 2, ore: 3 } },
    wall: { n: "Wall", i: "🧱", c: { brick: 2 } },
    knight: { n: "Knight", i: "⚔️", c: { wool: 1, ore: 1 } },
    activate: { n: "Activate", i: "🛡️", c: { grain: 1 } },
    promote: { n: "Strong", i: "💪", c: { wool: 1, ore: 1 } },
    mighty: { n: "Mighty", i: "🦸", c: { wool: 1, ore: 1 } }
  };

  var p = new URLSearchParams(location.search);
  var gid = p.get("game_id"), pid = parseInt(p.get("player_id")) || 1;

  if (!gid) {
    alert("No game_id found in URL!");
    return;
  }

  var wakeLock = null, noSleepVideo = null, playerData = null;

  function updateWakeInd(on) {
    var ind = document.getElementById("chWakeInd");
    if (ind) ind.style.opacity = on ? "1" : "0.3";
  }

  async function requestWakeLock() {
    if ("wakeLock" in navigator) {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", function() { updateWakeInd(false); });
        updateWakeInd(true);
      } catch (e) {
        startNoSleep();
      }
    } else {
      startNoSleep();
    }
  }

  function releaseWakeLock() {
    if (wakeLock) { wakeLock.release(); wakeLock = null; }
    stopNoSleep();
    updateWakeInd(false);
  }

  function startNoSleep() {
    if (noSleepVideo) return;
    noSleepVideo = document.createElement("video");
    noSleepVideo.setAttribute("playsinline", "");
    noSleepVideo.setAttribute("muted", "");
    noSleepVideo.muted = true;
    noSleepVideo.loop = true;
    noSleepVideo.style.cssText = "position:fixed;top:-1px;left:-1px;width:1px;height:1px;opacity:0.01;pointer-events:none;z-index:-1";
    noSleepVideo.src = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAA7RtZGF0AAACrwYF//+r3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMjg1NCBlOWE1OTAzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTMgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIzLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IGlwX3JhdGlvPTEuNDAgYXE9MToxLjAwAIAAAAAwZYiEAD//8m+P5OXfBeLGOfKE3xkODvFZuBflHv/+VwJIta6cbpIo8s6pycmMX+QQfQLtAAAACkGaJGxBD0kgAAAAB0GeQniEHwAAAAcBnmF0Qg8AAAAHAZpiakIPAAAADUGaZkmoQQ/+AQAAAAMAAAADZ2RvdmgAAAAMZHBpeAAAAACwAAAADW5vcm0AAAABAAAAAHdpZHRoAAAAgAAAABBoZWlnaHQAAACAAAAADHByb2oAAAAAAAAAbmNscwAAAAAAAAAAbWF0cgAAAAAAAAAAAAAAAAAAAABwbHVyAAAAHGRwcmMAAAAAAAAAAAAAAAAAAABpbnRlAAAAFGJsdXIAAAABAHByb3AAAAAKb3JkZXIAAAAB";
    document.body.appendChild(noSleepVideo);
    noSleepVideo.play().catch(function() {});
    updateWakeInd(true);
  }

  function stopNoSleep() {
    if (noSleepVideo) { noSleepVideo.pause(); noSleepVideo.remove(); noSleepVideo = null; }
  }

  function handleVisChange() {
    if (document.visibilityState === "visible" && document.getElementById("ch-overlay") && document.getElementById("ch-overlay").style.display !== "none") {
      requestWakeLock();
      if (!ws || ws.readyState !== 1) { connect(); }
    }
  }

  var clr = { Red: "#e53935", Blue: "#1e88e5", Green: "#43a047", Yellow: "#fdd835", Orange: "#fb8c00", Brown: "#6d4c41" };

  function updateFooter() {
    var f = document.getElementById("chFooter");
    if (f && playerData) {
      f.querySelector(".chFc").style.background = clr[playerData.colour] || "#666";
      f.querySelector(".chFc").textContent = (playerData.colour || "?")[0];
      f.querySelector(".chFn").textContent = playerData.colour;
    }
  }

  var o = document.createElement("div");
  o.id = "ch-overlay";
  o.innerHTML = '<style>*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0;padding:0}html.ch-open,body.ch-open{overflow:hidden!important;position:fixed!important;width:100%!important;height:100%!important;touch-action:none}#ch-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:#1a1210;font-family:-apple-system,system-ui,sans-serif;color:#f4e4bc;z-index:999999;display:flex;flex-direction:column;height:100%}.chScroll{flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:12px;padding-top:max(12px,env(safe-area-inset-top));padding-left:max(12px,env(safe-area-inset-left));padding-right:max(12px,env(safe-area-inset-right));padding-bottom:12px}.chS{background:rgba(244,228,188,.06);border-radius:10px;padding:12px;margin-bottom:10px}.chT{font-weight:600;color:#c9a227;font-size:18px;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px}.chRes{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}.chRi{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);padding:10px 14px;border-radius:20px}.chRi .em{font-size:32px}.chRi .num{font-weight:700;font-size:36px;min-width:22px;text-align:center}.chComm{margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,.08)}.chDv{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}.chDt{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.08);padding:8px 14px;border-radius:16px}.chDl{font-size:26px}.chDn{font-size:26px;font-weight:700}.chB{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.chBi{padding:12px;border-radius:8px;display:flex;align-items:center;gap:10px}.chBi.y{background:rgba(76,175,80,.2);border:1px solid rgba(76,175,80,.5)}.chBi.n{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);opacity:.35}.chBi .icon{font-size:36px}.chBi .info{flex:1;min-width:0}.chBi .name{font-weight:600;font-size:20px}.chBi .cost{font-size:18px;opacity:.7;margin-top:2px}.chCds{display:flex;flex-direction:column;gap:10px}.chCi{padding:12px 14px;border-radius:8px;border-left:4px solid}.chCi.science{border-color:#66bb6a;background:rgba(102,187,106,.1)}.chCi.trade{border-color:#ffeb3b;background:rgba(255,235,59,.08)}.chCi.politics{border-color:#42a5f5;background:rgba(66,165,245,.1)}.chCh{display:flex;gap:10px;align-items:center;margin-bottom:4px}.chCh .icon{font-size:28px}.chCn{font-weight:600;font-size:20px}.chCd-desc{font-size:18px;opacity:.8;line-height:1.4}.chF{background:linear-gradient(180deg,rgba(74,31,36,.95),rgba(44,24,16,.98));padding:10px 14px;padding-bottom:max(10px,env(safe-area-inset-bottom));padding-left:max(14px,env(safe-area-inset-left));padding-right:max(14px,env(safe-area-inset-right));display:flex;align-items:center;gap:10px;flex-shrink:0;border-top:1px solid rgba(201,162,39,.2)}.chFc{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;font-weight:700;flex-shrink:0;box-shadow:0 2px 4px rgba(0,0,0,.3)}.chFi{flex:1;min-width:0}.chFn{font-size:16px;font-weight:600;color:#f4e4bc}.chFs{font-size:12px;display:flex;align-items:center;gap:4px;margin-top:1px}.chFs.on{color:#4caf50}.chFs.off{color:#ff9800}.chTog{background:#c9a227;color:#2c1810;border:0;padding:10px 16px;border-radius:6px;font-weight:600;font-size:14px;cursor:pointer;flex-shrink:0}.chWake{opacity:0.3;transition:opacity 0.3s}</style><div class="chScroll" id="chScroll"><div id="chContent"><div style="text-align:center;padding:40px;opacity:.6">Connecting...</div></div></div><div class="chF" id="chFooter"><div class="chFc">?</div><div class="chFi"><div class="chFn">Connecting...</div><div class="chFs off" id="chStatus">● connecting<span id="chWakeInd" class="chWake"> ☀️</span></div></div><button class="chTog" id="chTogBtn">Show Game</button></div>';

  var existing = document.getElementById("ch-overlay");
  if (existing) {
    var isHidden = existing.style.display === "none";
    existing.style.display = isHidden ? "flex" : "none";
    document.documentElement.classList.toggle("ch-open", isHidden);
    document.body.classList.toggle("ch-open", isHidden);
    if (isHidden) {
      requestWakeLock();
      if (!ws || ws.readyState !== 1) connect();
    } else {
      releaseWakeLock();
    }
    return;
  }

  document.body.appendChild(o);
  document.documentElement.classList.add("ch-open");
  document.body.classList.add("ch-open");
  requestWakeLock();
  document.addEventListener("visibilitychange", handleVisChange);

  document.getElementById("chTogBtn").onclick = function() {
    if (intv) clearInterval(intv);
    if (reconnectTimer) clearTimeout(reconnectTimer);
    if (ws && ws.readyState === 1) ws.close();
    releaseWakeLock();
    document.removeEventListener("visibilitychange", handleVisChange);
    document.getElementById("ch-overlay").style.display = "none";
    document.documentElement.classList.remove("ch-open");
    document.body.classList.remove("ch-open");
  };

  var ws, ref = 0, jref, intv, reconnectAttempts = 0, reconnectTimer;

  function setStatus(txt, online) {
    var s = document.getElementById("chStatus");
    if (s) {
      var w = document.getElementById("chWakeInd");
      s.innerHTML = "● " + txt + (w ? "<span id='chWakeInd' class='chWake'" + ((w.style.opacity === "1") ? " style='opacity:1'" : "") + "> ☀️</span>" : "");
      s.className = "chFs " + (online ? "on" : "off");
    }
  }

  function connect() {
    if (reconnectTimer) clearTimeout(reconnectTimer);
    if (ws && ws.readyState < 2) return;
    setStatus("connecting...", false);
    try {
      ws = new WebSocket("wss://fern-service.csdu.co.uk/socket/websocket?vsn=2.0.0");
    } catch (e) {
      scheduleReconnect();
      return;
    }
    ws.onopen = function() {
      reconnectAttempts = 0;
      setStatus("live", true);
      jref = String(++ref);
      ws.send(JSON.stringify([jref, String(++ref), "catan_game:" + gid, "phx_join", { client_id: "CH_" + Math.random().toString(36).substr(2, 5) }]));
    };
    ws.onmessage = function(e) {
      try {
        var m = JSON.parse(e.data);
        if (m[3] === "phx_reply" && m[4].status === "ok" && m[1] === "2") {
          if (intv) clearInterval(intv);
          setTimeout(function() {
            if (ws && ws.readyState === 1) {
              ws.send(JSON.stringify([jref, String(++ref), "catan_game:" + gid, "game_state", ""]));
              intv = setInterval(function() {
                if (ws && ws.readyState === 1) ws.send(JSON.stringify([jref, String(++ref), "catan_game:" + gid, "game_state", ""]));
              }, 5000);
            }
          }, 300);
        }
        if (m[4] && m[4].game_state) render(m[4].game_state);
      } catch (x) {}
    };
    ws.onerror = function() { setStatus("error", false); };
    ws.onclose = function() {
      setStatus("offline", false);
      if (intv) { clearInterval(intv); intv = null; }
      scheduleReconnect();
    };
  }

  function scheduleReconnect() {
    var ov = document.getElementById("ch-overlay");
    if (ov && ov.style.display !== "none" && reconnectAttempts < 20) {
      var delay = Math.min(2000 * Math.pow(1.5, reconnectAttempts), 60000);
      reconnectAttempts++;
      setStatus("reconnecting in " + Math.round(delay / 1000) + "s...", false);
      reconnectTimer = setTimeout(connect, delay);
    }
  }

  connect();

  function render(gs) {
    var pl = gs.players.find(function(x) { return x.id === pid; }) || gs.players[0];
    playerData = pl;
    updateFooter();
    var ck = pl.cities_knights || {};
    var r = { lumber: pl.lumber || 0, brick: pl.brick || 0, wool: pl.wool || 0, grain: pl.grain || 0, ore: pl.ore || 0, cloth: ck.cloth || 0, coin: ck.coin || 0, paper: ck.paper || 0 };
    var tLv = ck.trade || 0, sLv = ck.science || 0, pLv = ck.politics || 0;
    var h = "<div class='chS'><div class='chT'>Resources</div><div class='chRes'>";
    h += "<div class='chRi'><span class='em'>🪵</span><span class='num'>" + r.lumber + "</span></div>";
    h += "<div class='chRi'><span class='em'>🧱</span><span class='num'>" + r.brick + "</span></div>";
    h += "<div class='chRi'><span class='em'>🐑</span><span class='num'>" + r.wool + "</span></div>";
    h += "<div class='chRi'><span class='em'>🌾</span><span class='num'>" + r.grain + "</span></div>";
    h += "<div class='chRi'><span class='em'>🪨</span><span class='num'>" + r.ore + "</span></div></div>";
    h += "<div class='chRes chComm'>";
    h += "<div class='chRi'><span class='em'>🧶</span><span class='num'>" + r.cloth + "</span></div>";
    h += "<div class='chRi'><span class='em'>🪙</span><span class='num'>" + r.coin + "</span></div>";
    h += "<div class='chRi'><span class='em'>📜</span><span class='num'>" + r.paper + "</span></div></div></div>";
    h += "<div class='chS'><div class='chT'>Development</div><div class='chDv'>";
    h += "<div class='chDt'><span class='chDl'>🟡</span><span class='chDn'>" + tLv + "/5</span></div>";
    h += "<div class='chDt'><span class='chDl'>🟢</span><span class='chDn'>" + sLv + "/5</span></div>";
    h += "<div class='chDt'><span class='chDl'>🔵</span><span class='chDn'>" + pLv + "/5</span></div></div></div>";
    h += "<div class='chS'><div class='chT'>Build</div><div class='chB'>";
    function canBuild(c) { for (var k in c) if ((r[k] || 0) < c[k]) return false; return true; }
    function costStr(c) { var s = []; var icons = { lumber: "🪵", brick: "🧱", wool: "🐑", grain: "🌾", ore: "🪨" }; for (var k in c) s.push(c[k] + icons[k]); return s.join(" "); }
    for (var k in B) { var b = B[k], ok = canBuild(b.c); h += "<div class='chBi " + (ok ? "y" : "n") + "'><span class='icon'>" + b.i + "</span><div class='info'><div class='name'>" + b.n + "</div><div class='cost'>" + costStr(b.c) + "</div></div></div>"; }
    var nxtT = tLv + 1, nxtS = sLv + 1, nxtP = pLv + 1;
    if (tLv < 5) { h += "<div class='chBi " + (r.cloth >= nxtT ? "y" : "n") + "'><span class='icon'>🟡</span><div class='info'><div class='name'>Trade " + nxtT + "</div><div class='cost'>" + nxtT + "🧶</div></div></div>"; }
    if (sLv < 5) { h += "<div class='chBi " + (r.paper >= nxtS ? "y" : "n") + "'><span class='icon'>🟢</span><div class='info'><div class='name'>Science " + nxtS + "</div><div class='cost'>" + nxtS + "📜</div></div></div>"; }
    if (pLv < 5) { h += "<div class='chBi " + (r.coin >= nxtP ? "y" : "n") + "'><span class='icon'>🔵</span><div class='info'><div class='name'>Politics " + nxtP + "</div><div class='cost'>" + nxtP + "🪙</div></div></div>"; }
    h += "</div></div>";
    var cds = ck.progress_cards || [];
    h += "<div class='chS'><div class='chT'>Cards (" + cds.length + ")</div><div class='chCds'>";
    if (cds.length === 0) h += "<div style='opacity:.5;text-align:center;padding:12px;font-size:12px'>No progress cards yet</div>";
    for (var i = 0; i < cds.length; i++) { var cd = C[cds[i]] || { n: "Unknown", c: "science", i: "❓", d: "Unknown card" }; h += "<div class='chCi " + cd.c + "'><div class='chCh'><span class='icon'>" + cd.i + "</span><span class='chCn'>" + cd.n + "</span></div><div class='chCd-desc'>" + cd.d + "</div></div>"; }
    h += "</div></div>";
    var scrollEl = document.getElementById("chScroll");
    var scrollPos = scrollEl.scrollTop;
    document.getElementById("chContent").innerHTML = h;
    scrollEl.scrollTop = scrollPos;
  }
})();
