// Catan Helper v2 - Classic & Cities & Knights Companion
// Autodetects game type and shows appropriate UI
// Loaded via tiny bookmarklet, cached in localStorage
(function() {
  if (!location.hostname.includes("csdu.co.uk")) {
    alert("Open this on g.csdu.co.uk with your game!");
    return;
  }

  // ===== INTERNATIONALIZATION =====
  var currentLang = localStorage.getItem('ch-lang') || 'en';

  var translations = {
    en: {
      // UI Labels
      resources: "Resources",
      build: "Build",
      development: "Development",
      devCards: "Dev Cards",
      cards: "Cards",
      showGame: "Show Game",
      connecting: "Connecting...",
      live: "live",
      error: "error",
      offline: "offline",
      reconnectingIn: "reconnecting in {0}s...",
      noDevCards: "No development cards yet",
      noProgressCards: "No progress cards yet",
      need: "need",
      // Building names
      road: "Road",
      settlement: "Settlement",
      city: "City",
      wall: "Wall",
      knight: "Knight",
      activate: "Activate",
      strongKnight: "Strong Knight",
      mightyKnight: "Mighty Knight",
      devCard: "Dev Card",
      trade: "Trade",
      science: "Science",
      politics: "Politics",
      // Classic dev card names
      knightCard: "Knight",
      victoryPoint: "Victory Point",
      roadBuilding: "Road Building",
      yearOfPlenty: "Year of Plenty",
      monopoly: "Monopoly",
      // Classic dev card descriptions
      knightCardDesc: "Move the robber. Largest Army = 2 VP",
      victoryPointDesc: "+1 VP (revealed at game end)",
      roadBuildingDesc: "Build 2 roads for free",
      yearOfPlentyDesc: "Take any 2 resources from the bank",
      monopolyDesc: "Name a resource, all players give you all of that type",
      // C&K progress card names
      alchemist: "Alchemist",
      crane: "Crane",
      engineer: "Engineer",
      inventor: "Inventor",
      irrigation: "Irrigation",
      medicine: "Medicine",
      mining: "Mining",
      printer: "Printer",
      ckRoadBuilding: "Road Building",
      smith: "Smith",
      commercialHarbor: "Commercial Harbor",
      masterMerchant: "Master Merchant",
      merchant: "Merchant",
      merchantFleet: "Merchant Fleet",
      resourceMonopoly: "Resource Monopoly",
      tradeMonopoly: "Trade Monopoly",
      bishop: "Bishop",
      constitution: "Constitution",
      deserter: "Deserter",
      diplomat: "Diplomat",
      intrigue: "Intrigue",
      saboteur: "Saboteur",
      spy: "Spy",
      warlord: "Warlord",
      wedding: "Wedding",
      // C&K progress card descriptions
      alchemistDesc: "Choose dice result for resource production",
      craneDesc: "Build city improvement for 1 less commodity",
      engineerDesc: "Build a city wall for free",
      inventorDesc: "Swap 2 number tokens (not 6, 8, 2, 12)",
      irrigationDesc: "Each settlement on grain gets 2 grain",
      medicineDesc: "Upgrade settlement to city for 2 ore + 1 grain",
      miningDesc: "Each settlement on ore/mountains gets 2 ore",
      printerDesc: "+1 Victory Point (keep until played)",
      ckRoadBuildingDesc: "Build 2 roads for free",
      smithDesc: "Promote 2 knights for free",
      commercialHarborDesc: "Force opponents to give you 1 commodity each (1 per their VP)",
      masterMerchantDesc: "Look at opponent hand, take 2 cards",
      merchantDesc: "Place merchant for 2:1 trade + 1 VP",
      merchantFleetDesc: "Trade any resource 2:1 this turn",
      resourceMonopolyDesc: "Name a resource, each player gives you 2",
      tradeMonopolyDesc: "Name a commodity, each player gives you 1",
      bishopDesc: "Move robber, take 1 card from each adjacent player",
      constitutionDesc: "+1 Victory Point (keep until played)",
      deserterDesc: "Remove any opponent knight from the board",
      diplomatDesc: "Remove any open road (yours or opponent)",
      intrigueDesc: "Displace opponent knight to move yours there",
      saboteurDesc: "All opponents with more VP discard half their hand",
      spyDesc: "Look at opponent progress cards, steal 1",
      warlordDesc: "Activate all your knights for free",
      weddingDesc: "Each player with more VP gives you 2 cards",
      unknown: "Unknown",
      unknownCard: "Unknown card"
    },
    de: {
      // UI Labels
      resources: "Rohstoffe",
      build: "Bauen",
      development: "Entwicklung",
      devCards: "Entwicklungskarten",
      cards: "Karten",
      showGame: "Spiel anzeigen",
      connecting: "Verbinden...",
      live: "live",
      error: "Fehler",
      offline: "offline",
      reconnectingIn: "Neuverbindung in {0}s...",
      noDevCards: "Noch keine Entwicklungskarten",
      noProgressCards: "Noch keine Fortschrittskarten",
      need: "brauche",
      // Building names
      road: "Straße",
      settlement: "Siedlung",
      city: "Stadt",
      wall: "Stadtmauer",
      knight: "Ritter",
      activate: "Aktivieren",
      strongKnight: "Starker Ritter",
      mightyKnight: "Mächtiger Ritter",
      devCard: "Entwicklungskarte",
      trade: "Handel",
      science: "Wissenschaft",
      politics: "Politik",
      // Classic dev card names
      knightCard: "Ritter",
      victoryPoint: "Siegpunkt",
      roadBuilding: "Straßenbau",
      yearOfPlenty: "Erfindung",
      monopoly: "Monopol",
      // Classic dev card descriptions
      knightCardDesc: "Räuber versetzen. Größte Rittermacht = 2 SP",
      victoryPointDesc: "+1 SP (am Spielende aufdecken)",
      roadBuildingDesc: "2 Straßen kostenlos bauen",
      yearOfPlentyDesc: "2 beliebige Rohstoffe aus dem Vorrat nehmen",
      monopolyDesc: "Rohstoff nennen, alle Spieler geben dir alle davon",
      // C&K progress card names
      alchemist: "Alchemist",
      crane: "Kran",
      engineer: "Ingenieur",
      inventor: "Erfinder",
      irrigation: "Bewässerung",
      medicine: "Medizin",
      mining: "Bergbau",
      printer: "Drucker",
      ckRoadBuilding: "Straßenbau",
      smith: "Schmied",
      commercialHarbor: "Handelshafen",
      masterMerchant: "Meisterkaufmann",
      merchant: "Händler",
      merchantFleet: "Handelsflotte",
      resourceMonopoly: "Rohstoffmonopol",
      tradeMonopoly: "Handelsmonopol",
      bishop: "Bischof",
      constitution: "Verfassung",
      deserter: "Deserteur",
      diplomat: "Diplomat",
      intrigue: "Intrige",
      saboteur: "Saboteur",
      spy: "Spion",
      warlord: "Kriegsherr",
      wedding: "Hochzeit",
      // C&K progress card descriptions
      alchemistDesc: "Würfelergebnis für Rohstoffproduktion wählen",
      craneDesc: "Stadtausbau für 1 Ware weniger bauen",
      engineerDesc: "Eine Stadtmauer kostenlos bauen",
      inventorDesc: "2 Zahlenplättchen tauschen (nicht 6, 8, 2, 12)",
      irrigationDesc: "Jede Siedlung auf Getreide erhält 2 Getreide",
      medicineDesc: "Siedlung zur Stadt für 2 Erz + 1 Getreide",
      miningDesc: "Jede Siedlung auf Erz/Bergen erhält 2 Erz",
      printerDesc: "+1 Siegpunkt (behalten bis gespielt)",
      ckRoadBuildingDesc: "2 Straßen kostenlos bauen",
      smithDesc: "2 Ritter kostenlos befördern",
      commercialHarborDesc: "Gegner geben dir je 1 Ware (1 pro SP)",
      masterMerchantDesc: "Gegnerhand ansehen, 2 Karten nehmen",
      merchantDesc: "Händler platzieren für 2:1 Tausch + 1 SP",
      merchantFleetDesc: "Diese Runde beliebigen Rohstoff 2:1 tauschen",
      resourceMonopolyDesc: "Rohstoff nennen, jeder Spieler gibt dir 2",
      tradeMonopolyDesc: "Ware nennen, jeder Spieler gibt dir 1",
      bishopDesc: "Räuber versetzen, 1 Karte von jedem Anlieger",
      constitutionDesc: "+1 Siegpunkt (behalten bis gespielt)",
      deserterDesc: "Einen gegnerischen Ritter entfernen",
      diplomatDesc: "Eine offene Straße entfernen (eigene oder Gegner)",
      intrigueDesc: "Gegnerischen Ritter verdrängen um deinen zu platzieren",
      saboteurDesc: "Gegner mit mehr SP werfen halbe Hand ab",
      spyDesc: "Gegner-Fortschrittskarten ansehen, 1 stehlen",
      warlordDesc: "Alle deine Ritter kostenlos aktivieren",
      weddingDesc: "Spieler mit mehr SP geben dir je 2 Karten",
      unknown: "Unbekannt",
      unknownCard: "Unbekannte Karte"
    }
  };

  function t(key) {
    return translations[currentLang][key] || translations.en[key] || key;
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ch-lang', lang);
    updateLanguageSelector();
    // Update button text
    var btn = document.getElementById('chTogBtn');
    if (btn) btn.textContent = t('showGame');
    if (playerData) {
      // Re-render with new language
      updateFooter();
      // Trigger re-render if we have game state
      if (lastGameState) render(lastGameState);
    }
  }

  function updateLanguageSelector() {
    var sel = document.getElementById('chLangSel');
    if (sel) sel.value = currentLang;
  }

  var lastGameState = null;

  var C = {
    200: { nKey: "alchemist", c: "science", i: "🧪", dKey: "alchemistDesc" },
    201: { nKey: "crane", c: "science", i: "🏗️", dKey: "craneDesc" },
    202: { nKey: "engineer", c: "science", i: "⚙️", dKey: "engineerDesc" },
    203: { nKey: "inventor", c: "science", i: "💡", dKey: "inventorDesc" },
    204: { nKey: "irrigation", c: "science", i: "💧", dKey: "irrigationDesc" },
    205: { nKey: "medicine", c: "science", i: "💊", dKey: "medicineDesc" },
    206: { nKey: "mining", c: "science", i: "⛏️", dKey: "miningDesc" },
    207: { nKey: "printer", c: "science", i: "📰", dKey: "printerDesc" },
    208: { nKey: "ckRoadBuilding", c: "science", i: "🛤️", dKey: "ckRoadBuildingDesc" },
    209: { nKey: "smith", c: "science", i: "🔨", dKey: "smithDesc" },
    300: { nKey: "commercialHarbor", c: "trade", i: "⚓", dKey: "commercialHarborDesc" },
    301: { nKey: "masterMerchant", c: "trade", i: "🎩", dKey: "masterMerchantDesc" },
    302: { nKey: "merchant", c: "trade", i: "🧑‍💼", dKey: "merchantDesc" },
    303: { nKey: "merchantFleet", c: "trade", i: "⛵", dKey: "merchantFleetDesc" },
    304: { nKey: "resourceMonopoly", c: "trade", i: "💎", dKey: "resourceMonopolyDesc" },
    305: { nKey: "tradeMonopoly", c: "trade", i: "👑", dKey: "tradeMonopolyDesc" },
    400: { nKey: "bishop", c: "politics", i: "✝️", dKey: "bishopDesc" },
    401: { nKey: "constitution", c: "politics", i: "📜", dKey: "constitutionDesc" },
    402: { nKey: "deserter", c: "politics", i: "🏃", dKey: "deserterDesc" },
    403: { nKey: "diplomat", c: "politics", i: "🤝", dKey: "diplomatDesc" },
    404: { nKey: "intrigue", c: "politics", i: "🗡️", dKey: "intrigueDesc" },
    405: { nKey: "saboteur", c: "politics", i: "💣", dKey: "saboteurDesc" },
    406: { nKey: "spy", c: "politics", i: "🕵️", dKey: "spyDesc" },
    407: { nKey: "warlord", c: "politics", i: "⚔️", dKey: "warlordDesc" },
    408: { nKey: "wedding", c: "politics", i: "💒", dKey: "weddingDesc" }
  };

  // Classic Catan development card definitions
  var DC = {
    knight: { nKey: "knightCard", i: "⚔️", dKey: "knightCardDesc" },
    victory_point: { nKey: "victoryPoint", i: "🏆", dKey: "victoryPointDesc" },
    road_building: { nKey: "roadBuilding", i: "🛤️", dKey: "roadBuildingDesc" },
    year_of_plenty: { nKey: "yearOfPlenty", i: "🎁", dKey: "yearOfPlentyDesc" },
    monopoly: { nKey: "monopoly", i: "💰", dKey: "monopolyDesc" }
  };

  // List of dev card property names to check
  var DC_KEYS = ['knight', 'victory_point', 'road_building', 'year_of_plenty', 'monopoly'];

  // Game type: null = unknown, 'classic' = base game, 'ck' = Cities & Knights
  var gameType = null;

  // Detect game type from game state
  function detectGameType(gs) {
    // Check all players for cities_knights data
    for (var i = 0; i < gs.players.length; i++) {
      var pl = gs.players[i];
      var ck = pl.cities_knights;
      // If cities_knights is null or undefined, it's classic
      // If it's an object with C&K data, it's C&K
      if (ck && typeof ck === 'object' && (
        typeof ck.trade === 'number' ||
        typeof ck.science === 'number' ||
        typeof ck.politics === 'number' ||
        typeof ck.cloth === 'number' ||
        typeof ck.coin === 'number' ||
        typeof ck.paper === 'number' ||
        Array.isArray(ck.progress_cards)
      )) {
        return 'ck';
      }
    }
    return 'classic';
  }

  // Classic Catan buildings
  var B_CLASSIC = {
    road: { nKey: "road", i: "🛣️", c: { lumber: 1, brick: 1 } },
    settlement: { nKey: "settlement", i: "🏠", c: { lumber: 1, brick: 1, wool: 1, grain: 1 } },
    city: { nKey: "city", i: "🏰", c: { grain: 2, ore: 3 } },
    devcard: { nKey: "devCard", i: "🃏", c: { wool: 1, grain: 1, ore: 1 } }
  };

  // Cities & Knights buildings (includes classic + C&K specific)
  var B_CK = {
    road: { nKey: "road", i: "🛣️", c: { lumber: 1, brick: 1 } },
    settlement: { nKey: "settlement", i: "🏠", c: { lumber: 1, brick: 1, wool: 1, grain: 1 } },
    city: { nKey: "city", i: "🏰", c: { grain: 2, ore: 3 } },
    wall: { nKey: "wall", i: "🧱", c: { brick: 2 } },
    knight: { nKey: "knight", i: "⚔️", c: { wool: 1, ore: 1 } },
    activate: { nKey: "activate", i: "🛡️", c: { grain: 1 } },
    promote: { nKey: "strongKnight", i: "💪", c: { wool: 1, ore: 1 } },
    mighty: { nKey: "mightyKnight", i: "🦸", c: { wool: 1, ore: 1 } }
  };

  // Alias for backwards compatibility
  var B = B_CK;

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
      // Update player name and game type badge
      var fnEl = f.querySelector(".chFn");
      var badgeHtml = '';
      if (gameType) {
        badgeHtml = '<span class="chGt ' + (gameType === 'ck' ? 'ck' : 'classic') + '">' + (gameType === 'ck' ? 'C&K' : 'Classic') + '</span>';
      }
      fnEl.innerHTML = (playerData.colour || '?') + badgeHtml;
    }
  }

  var o = document.createElement("div");
  o.id = "ch-overlay";
  o.innerHTML = '<style>*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0;padding:0}html.ch-open,body.ch-open{overflow:hidden!important;position:fixed!important;width:100%!important;height:100%!important;touch-action:none}#ch-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:#1a1210;font-family:-apple-system,system-ui,sans-serif;color:#f4e4bc;z-index:999999;display:flex;flex-direction:column;height:100%}.chScroll{flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:12px;padding-top:max(12px,env(safe-area-inset-top));padding-left:max(12px,env(safe-area-inset-left));padding-right:max(12px,env(safe-area-inset-right));padding-bottom:12px}.chS{background:rgba(244,228,188,.06);border-radius:10px;padding:12px;margin-bottom:10px}.chT{font-weight:600;color:#c9a227;font-size:22px;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px}.chRes{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}.chRi{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);padding:10px 14px;border-radius:20px}.chRi .em{font-size:40px}.chRi .num{font-weight:700;font-size:44px;min-width:26px;text-align:center}.chComm{margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,.08)}.chDv{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}.chDt{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);padding:10px 14px;border-radius:16px}.chDt.canUp{background:rgba(76,175,80,.25);border:1px solid rgba(76,175,80,.5)}.chDl{font-size:32px}.chDn{font-size:36px;font-weight:700}.chDc{display:flex;align-items:center;gap:6px;font-size:28px;margin-left:6px;padding-left:10px;border-left:1px solid rgba(255,255,255,.15)}.chDc .em{font-size:38px}.chDc .cnt{font-weight:600}.chDc .need{opacity:.6;font-size:20px}.chB{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.chBi{padding:12px;border-radius:8px;display:flex;align-items:center;gap:10px}.chBi.y{background:rgba(76,175,80,.2);border:1px solid rgba(76,175,80,.5)}.chBi.n{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);opacity:.35}.chBi .icon{font-size:44px}.chBi .info{flex:1;min-width:0}.chBi .name{font-weight:600;font-size:32px}.chBi .cost{font-size:40px;opacity:.7;margin-top:2px;word-spacing:-6px}.chCds{display:flex;flex-direction:column;gap:10px}.chCi{padding:25px 27px;border-radius:10px;border-left:5px solid}.chCi.science{border-color:#66bb6a;background:rgba(102,187,106,.1)}.chCi.trade{border-color:#ffeb3b;background:rgba(255,235,59,.08)}.chCi.politics{border-color:#42a5f5;background:rgba(66,165,245,.1)}.chCh{display:flex;gap:12px;align-items:center;margin-bottom:6px}.chCh .icon{font-size:44px}.chCn{font-weight:600;font-size:36px}.chCd-desc{font-size:32px;opacity:.8;line-height:1.4}.chF{background:linear-gradient(180deg,rgba(74,31,36,.95),rgba(44,24,16,.98));padding:10px 14px;padding-bottom:max(10px,env(safe-area-inset-bottom));padding-left:max(14px,env(safe-area-inset-left));padding-right:max(14px,env(safe-area-inset-right));display:flex;align-items:center;gap:10px;flex-shrink:0;border-top:1px solid rgba(201,162,39,.2)}.chFc{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;font-weight:700;flex-shrink:0;box-shadow:0 2px 4px rgba(0,0,0,.3)}.chFi{flex:1;min-width:0}.chFn{font-size:16px;font-weight:600;color:#f4e4bc}.chFs{font-size:12px;display:flex;align-items:center;gap:4px;margin-top:1px}.chFs.on{color:#4caf50}.chFs.off{color:#ff9800}.chTog{background:#c9a227;color:#2c1810;border:0;padding:10px 16px;border-radius:6px;font-weight:600;font-size:14px;cursor:pointer;flex-shrink:0}.chWake{opacity:0.3;transition:opacity 0.3s}.chGt{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;text-transform:uppercase;margin-left:6px}.chGt.ck{background:rgba(102,187,106,.3);color:#66bb6a}.chGt.classic{background:rgba(255,193,7,.3);color:#ffc107}.chLang{background:rgba(255,255,255,.1);color:#f4e4bc;border:1px solid rgba(201,162,39,.3);border-radius:6px;padding:6px 8px;font-size:12px;cursor:pointer;flex-shrink:0}.chLang:focus{outline:none;border-color:#c9a227}</style><div class="chScroll" id="chScroll"><div id="chContent"><div style="text-align:center;padding:40px;opacity:.6" id="chConnecting"></div></div></div><div class="chF" id="chFooter"><div class="chFc">?</div><div class="chFi"><div class="chFn" id="chFnText"></div><div class="chFs off" id="chStatus"><span id="chWakeInd" class="chWake"> ☀️</span></div></div><select class="chLang" id="chLangSel"><option value="en">EN</option><option value="de">DE</option></select><button class="chTog" id="chTogBtn"></button></div>';

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

  // Initialize language selector and translated text
  document.getElementById("chLangSel").value = currentLang;
  document.getElementById("chLangSel").onchange = function() {
    setLanguage(this.value);
  };
  document.getElementById("chConnecting").textContent = t("connecting");
  document.getElementById("chFnText").innerHTML = t("connecting") + '<span class="chGt"></span>';
  document.getElementById("chTogBtn").textContent = t("showGame");

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
    setStatus(t("connecting"), false);
    try {
      ws = new WebSocket("wss://fern-service.csdu.co.uk/socket/websocket?vsn=2.0.0");
    } catch (e) {
      scheduleReconnect();
      return;
    }
    ws.onopen = function() {
      reconnectAttempts = 0;
      setStatus(t("live"), true);
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
    ws.onerror = function() { setStatus(t("error"), false); };
    ws.onclose = function() {
      setStatus(t("offline"), false);
      if (intv) { clearInterval(intv); intv = null; }
      scheduleReconnect();
    };
  }

  function scheduleReconnect() {
    var ov = document.getElementById("ch-overlay");
    if (ov && ov.style.display !== "none" && reconnectAttempts < 20) {
      var delay = Math.min(2000 * Math.pow(1.5, reconnectAttempts), 60000);
      reconnectAttempts++;
      setStatus(t("reconnectingIn").replace("{0}", Math.round(delay / 1000)), false);
      reconnectTimer = setTimeout(connect, delay);
    }
  }

  connect();

  function render(gs) {
    lastGameState = gs;
    var pl = gs.players.find(function(x) { return x.id === pid; }) || gs.players[0];
    playerData = pl;

    // Detect game type on first render
    if (!gameType) {
      gameType = detectGameType(gs);
    }

    updateFooter();
    var ck = pl.cities_knights || {};
    var r = { lumber: pl.lumber || 0, brick: pl.brick || 0, wool: pl.wool || 0, grain: pl.grain || 0, ore: pl.ore || 0 };
    var h = "";

    function canBuild(c) { for (var k in c) if ((r[k] || 0) < c[k]) return false; return true; }
    function costStr(c) { var s = []; var icons = { lumber: "🪵", brick: "🧱", wool: "🐑", grain: "🌾", ore: "🪨" }; for (var k in c) s.push(c[k] + icons[k]); return s.join(" "); }

    if (gameType === 'classic') {
      // ===== CLASSIC CATAN UI =====

      // Resources section (basic 5 only)
      h += "<div class='chS'><div class='chT'>" + t("resources") + "</div><div class='chRes'>";
      h += "<div class='chRi'><span class='em'>🪵</span><span class='num'>" + r.lumber + "</span></div>";
      h += "<div class='chRi'><span class='em'>🧱</span><span class='num'>" + r.brick + "</span></div>";
      h += "<div class='chRi'><span class='em'>🐑</span><span class='num'>" + r.wool + "</span></div>";
      h += "<div class='chRi'><span class='em'>🌾</span><span class='num'>" + r.grain + "</span></div>";
      h += "<div class='chRi'><span class='em'>🪨</span><span class='num'>" + r.ore + "</span></div></div></div>";

      // Build section (classic buildings only)
      h += "<div class='chS'><div class='chT'>" + t("build") + "</div><div class='chB'>";
      for (var k in B_CLASSIC) { var b = B_CLASSIC[k], ok = canBuild(b.c); h += "<div class='chBi " + (ok ? "y" : "n") + "'><span class='icon'>" + b.i + "</span><div class='info'><div class='name'>" + t(b.nKey) + "</div><div class='cost'>" + costStr(b.c) + "</div></div></div>"; }
      h += "</div></div>";

      // Development cards section - show player's actual cards from individual properties
      var totalDevCards = 0;
      var devCardsHtml = '';
      for (var di = 0; di < DC_KEYS.length; di++) {
        var cardKey = DC_KEYS[di];
        var cardCount = pl[cardKey] || 0;
        if (cardCount > 0) {
          totalDevCards += cardCount;
          var dc = DC[cardKey];
          devCardsHtml += "<div class='chCi science'><div class='chCh'><span class='icon'>" + dc.i + "</span><span class='chCn'>" + t(dc.nKey) + (cardCount > 1 ? " x" + cardCount : "") + "</span></div><div class='chCd-desc'>" + t(dc.dKey) + "</div></div>";
        }
      }
      h += "<div class='chS'><div class='chT'>" + t("devCards") + " (" + totalDevCards + ")</div><div class='chCds'>";
      if (totalDevCards === 0) {
        h += "<div style='opacity:.5;text-align:center;padding:12px;font-size:12px'>" + t("noDevCards") + "</div>";
      } else {
        h += devCardsHtml;
      }
      h += "</div></div>";

    } else {
      // ===== CITIES & KNIGHTS UI =====

      // Add commodities to resources
      r.cloth = ck.cloth || 0;
      r.coin = ck.coin || 0;
      r.paper = ck.paper || 0;
      var tLv = ck.trade || 0, sLv = ck.science || 0, pLv = ck.politics || 0;

      // Resources section (basic + commodities)
      h += "<div class='chS'><div class='chT'>" + t("resources") + "</div><div class='chRes'>";
      h += "<div class='chRi'><span class='em'>🪵</span><span class='num'>" + r.lumber + "</span></div>";
      h += "<div class='chRi'><span class='em'>🧱</span><span class='num'>" + r.brick + "</span></div>";
      h += "<div class='chRi'><span class='em'>🐑</span><span class='num'>" + r.wool + "</span></div>";
      h += "<div class='chRi'><span class='em'>🌾</span><span class='num'>" + r.grain + "</span></div>";
      h += "<div class='chRi'><span class='em'>🪨</span><span class='num'>" + r.ore + "</span></div></div></div>";

      // Development tracks section
      h += "<div class='chS'><div class='chT'>" + t("development") + "</div><div class='chDv'>";
      var tNeed = tLv < 5 ? Math.max(0, (tLv + 1) - r.cloth) : 0;
      var sNeed = sLv < 5 ? Math.max(0, (sLv + 1) - r.paper) : 0;
      var pNeed = pLv < 5 ? Math.max(0, (pLv + 1) - r.coin) : 0;
      var tCanUp = tLv < 5 && tNeed === 0;
      var sCanUp = sLv < 5 && sNeed === 0;
      var pCanUp = pLv < 5 && pNeed === 0;
      h += "<div class='chDt" + (tCanUp ? " canUp" : "") + "'><span class='chDl'>🟡</span><span class='chDn'>" + tLv + "/5</span><span class='chDc'><span class='em'>🧶</span><span class='cnt'>" + r.cloth + "</span>" + (tLv < 5 ? "<span class='need'>(" + (tNeed > 0 ? t("need") + " " + tNeed : "✓") + ")</span>" : "") + "</span></div>";
      h += "<div class='chDt" + (sCanUp ? " canUp" : "") + "'><span class='chDl'>🟢</span><span class='chDn'>" + sLv + "/5</span><span class='chDc'><span class='em'>📜</span><span class='cnt'>" + r.paper + "</span>" + (sLv < 5 ? "<span class='need'>(" + (sNeed > 0 ? t("need") + " " + sNeed : "✓") + ")</span>" : "") + "</span></div>";
      h += "<div class='chDt" + (pCanUp ? " canUp" : "") + "'><span class='chDl'>🔵</span><span class='chDn'>" + pLv + "/5</span><span class='chDc'><span class='em'>🪙</span><span class='cnt'>" + r.coin + "</span>" + (pLv < 5 ? "<span class='need'>(" + (pNeed > 0 ? t("need") + " " + pNeed : "✓") + ")</span>" : "") + "</span></div></div></div>";

      // Build section (C&K buildings only - development upgrades shown in Development section)
      h += "<div class='chS'><div class='chT'>" + t("build") + "</div><div class='chB'>";
      for (var k in B_CK) { var b = B_CK[k], ok = canBuild(b.c); h += "<div class='chBi " + (ok ? "y" : "n") + "'><span class='icon'>" + b.i + "</span><div class='info'><div class='name'>" + t(b.nKey) + "</div><div class='cost'>" + costStr(b.c) + "</div></div></div>"; }
      h += "</div></div>";

      // Progress cards section
      var cds = ck.progress_cards || [];
      h += "<div class='chS'><div class='chT'>" + t("cards") + " (" + cds.length + ")</div><div class='chCds'>";
      if (cds.length === 0) h += "<div style='opacity:.5;text-align:center;padding:12px;font-size:12px'>" + t("noProgressCards") + "</div>";
      for (var i = 0; i < cds.length; i++) { var cd = C[cds[i]] || { nKey: "unknown", c: "science", i: "❓", dKey: "unknownCard" }; h += "<div class='chCi " + cd.c + "'><div class='chCh'><span class='icon'>" + cd.i + "</span><span class='chCn'>" + t(cd.nKey) + "</span></div><div class='chCd-desc'>" + t(cd.dKey) + "</div></div>"; }
      h += "</div></div>";
    }

    var scrollEl = document.getElementById("chScroll");
    var scrollPos = scrollEl.scrollTop;
    document.getElementById("chContent").innerHTML = h;
    scrollEl.scrollTop = scrollPos;
  }
})();
