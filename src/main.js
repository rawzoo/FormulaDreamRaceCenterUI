import "./styles.css";

const app = document.getElementById("app");

app.innerHTML = `
  <div class="app-shell">
    <section id="auth-view" class="auth-view">
      <div class="auth-backdrop"></div>
      <div class="auth-card">
        <div class="auth-copy">
          <p class="eyebrow">FormulaDream</p>
          <h1>FormulaDream F1 Race Center</h1>
          <p class="hero-text">
            Sign in to follow the live Formula 1 session, track drivers and
            constructors across the season, and open rich race-weekend details
            from one polished Race Center.
          </p>
          <div class="auth-highlights">
            <div class="auth-highlight">
              <strong>Live Session</strong>
              <span>Session status, order, weather, and race control.</span>
            </div>
            <div class="auth-highlight">
              <strong>Season View</strong>
              <span>Drivers, teams, standings, and full race schedule.</span>
            </div>
            <div class="auth-highlight">
              <strong>Circuit Guide</strong>
              <span>Track visuals, distances, corners, and weekend context.</span>
            </div>
          </div>
        </div>

        <form id="login-form" class="login-panel">
          <div>
            <p class="eyebrow">Login</p>
            <h2>Open Your Race Center</h2>
            <p class="subtext">
              Use your FormulaDream account. Your password is never stored in this
              browser.
            </p>
          </div>

          <label class="field">
            <span>Login Identifier</span>
            <input id="login-identifier" type="text" placeholder="+91..., email, or username" autocomplete="username" />
          </label>

          <label class="field">
            <span>Password</span>
            <input id="login-password" type="password" placeholder="Password" autocomplete="current-password" />
          </label>

          <button id="login-user" class="button primary" type="submit">Sign In</button>
          <p id="auth-feedback" class="feedback">Sign in to load your Race Center.</p>
        </form>
      </div>
    </section>

    <section id="dashboard-view" class="dashboard-view hidden">
      <div class="page-shell">
        <header class="hero">
          <div class="hero-copy">
            <p class="eyebrow">FormulaDream</p>
            <h1>F1 Race Center</h1>
            <p class="hero-text">
              Live timing, season standings, driver insight, circuit context, and
              current-session details in one fan-ready experience.
            </p>
          </div>

          <div class="hero-status">
            <div class="status-chip">
              <span class="status-label">Race Feed</span>
              <strong id="status-source">Waiting</strong>
            </div>
            <div class="status-chip">
              <span class="status-label">Live Refresh</span>
              <strong id="status-refresh">Manual</strong>
            </div>
            <div class="status-chip">
              <span class="status-label">Session State</span>
              <strong id="status-session">Waiting</strong>
            </div>
          </div>
        </header>

        <section class="control-panel">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">Session</p>
              <h2>Your Race Center</h2>
            </div>
            <div class="action-row">
              <button id="logout-button" class="button ghost">Logout</button>
              <button id="load-dashboard" class="button primary">Refresh</button>
            </div>
          </div>

          <div class="toolbar-grid">
            <label class="field">
              <span>Season</span>
              <select id="season-toolbar"></select>
            </label>

            <div class="field auth-strip">
              <span>Authentication</span>
              <div class="auth-status-card">
                <div>
                  <strong id="auth-status-label">Authenticated</strong>
                  <div class="subtext" id="auth-status-detail">Your session is active for this browser session.</div>
                </div>
                <div class="auth-status-pill is-active" id="auth-status-pill">Session active</div>
              </div>
              <input id="access-token" type="hidden" />
            </div>

            <label class="field">
              <span>Auto Refresh</span>
              <label class="toggle toggle-card">
                <input id="auto-refresh" type="checkbox" />
                <span>Refresh every 15 seconds</span>
              </label>
            </label>
          </div>

          <div class="filter-bar">
            <label class="field">
              <span>Driver Filter</span>
              <select id="driver-filter"><option value="">All drivers</option></select>
            </label>

            <label class="field">
              <span>Team Filter</span>
              <select id="team-filter"><option value="">All teams</option></select>
            </label>

            <div class="field inline-field">
              <span>&nbsp;</span>
              <button id="reset-filters" class="button ghost">Reset Filters</button>
            </div>

            <div class="field inline-field">
              <span>Current View</span>
              <div class="selection-pill" id="selection-pill">All data</div>
            </div>
          </div>

          <p id="feedback" class="feedback">Loading your Race Center is one tap away.</p>
        </section>

        <nav class="section-tabs" aria-label="Race Center sections">
          <button class="tab-button is-active" data-tab-target="live">Live</button>
          <button class="tab-button" data-tab-target="season">Season</button>
          <button class="tab-button" data-tab-target="circuits">Circuits</button>
        </nav>

        <main class="dashboard">
          <section class="tab-panel is-active" data-tab-panel="live">
            <section class="card session-card">
              <div class="card-header">
                <div>
                  <p class="eyebrow">Current Session</p>
                  <h2 id="session-title">Waiting for live data</h2>
                </div>
                <div class="timestamp" id="session-updated">Not loaded yet</div>
              </div>

              <div class="hero-track">
                <div class="hero-badge" id="session-country-flag">GP</div>
                <div class="hero-track-copy">
                  <strong id="session-country-name">Unknown Country</strong>
                  <span id="session-country-detail" class="subtext">Waiting for session data</span>
                </div>
              </div>

              <div class="session-grid">
                <div class="session-meta"><span class="meta-label">Grand Prix</span><strong id="event-grand-prix">-</strong></div>
                <div class="session-meta"><span class="meta-label">Event</span><strong id="event-type">-</strong></div>
                <div class="session-meta"><span class="meta-label">Circuit</span><strong id="session-circuit">-</strong></div>
                <div class="session-meta"><span class="meta-label">Location</span><strong id="session-location">-</strong></div>
                <div class="session-meta"><span class="meta-label">Window</span><strong id="session-window">-</strong></div>
                <div class="session-meta"><span class="meta-label">Live Rows</span><strong id="session-metrics">0</strong></div>
              </div>

              <div class="metric-strip" id="live-metric-strip">
                <div class="metric-card"><span class="meta-label">Drivers</span><strong id="metric-drivers">0</strong></div>
                <div class="metric-card"><span class="meta-label">Positions</span><strong id="metric-positions">0</strong></div>
                <div class="metric-card"><span class="meta-label">Messages</span><strong id="metric-messages">0</strong></div>
                <div class="metric-card"><span class="meta-label">Weather</span><strong id="metric-weather">No</strong></div>
              </div>
            </section>

            <section id="featured-section" class="card hidden">
              <div class="card-header">
                <div>
                  <p class="eyebrow">Live Spotlight</p>
                  <h2>Featured Drivers</h2>
                </div>
                <span class="counter" id="featured-count">0</span>
              </div>
              <div class="featured-grid" id="featured-grid"></div>
            </section>

            <section id="live-order-section" class="card hidden">
              <div class="card-header">
                <div>
                  <p class="eyebrow">Track Order</p>
                  <h2>Live Leaderboard</h2>
                </div>
              </div>
              <div class="table-scroll">
                <table class="race-table">
                  <thead>
                    <tr><th>Pos</th><th>Driver</th><th>Team</th><th>Gap</th></tr>
                  </thead>
                  <tbody id="leaderboard-body"></tbody>
                </table>
              </div>
            </section>

            <section class="split-grid split-grid--live">
              <section id="weather-section" class="card hidden">
                <div class="card-header">
                  <div><p class="eyebrow">Conditions</p><h2>Weather</h2></div>
                </div>
                <div class="weather-grid" id="weather-grid"></div>
              </section>

              <section id="race-control-section" class="card hidden">
                <div class="card-header">
                  <div><p class="eyebrow">Control Feed</p><h2>Race Control</h2></div>
                </div>
                <ul class="feed-list" id="race-control-feed"></ul>
              </section>
            </section>

            <section id="live-drivers-section" class="card hidden">
              <div class="card-header">
                <div><p class="eyebrow">Current Session</p><h2>Session Drivers</h2></div>
                <span class="counter" id="live-drivers-count">0</span>
              </div>
              <div class="roster-grid" id="live-drivers-grid"></div>
            </section>

            <section id="live-standings-section" class="split-grid hidden">
              <section id="live-driver-standings-section" class="card hidden">
                <div class="card-header">
                  <div><p class="eyebrow">Current Session</p><h2>Live Driver Standings</h2></div>
                  <span class="counter" id="live-driver-standings-count">0</span>
                </div>
                <div class="table-scroll">
                  <table class="race-table">
                    <thead><tr><th>Pos</th><th>Driver</th><th>Start</th><th>Predicted</th></tr></thead>
                    <tbody id="live-driver-standings-body"></tbody>
                  </table>
                </div>
              </section>

              <section id="live-team-standings-section" class="card hidden">
                <div class="card-header">
                  <div><p class="eyebrow">Current Session</p><h2>Live Team Standings</h2></div>
                  <span class="counter" id="live-team-standings-count">0</span>
                </div>
                <div class="table-scroll">
                  <table class="race-table">
                    <thead><tr><th>Pos</th><th>Team</th><th>Start</th><th>Predicted</th></tr></thead>
                    <tbody id="live-team-standings-body"></tbody>
                  </table>
                </div>
              </section>
            </section>
          </section>

          <section class="tab-panel" data-tab-panel="season">
            <section id="season-standings-section" class="split-grid">
              <section class="card">
                <div class="card-header">
                  <div><p class="eyebrow">Season View</p><h2>Driver Standings</h2></div>
                  <span class="counter" id="driver-standings-count">0</span>
                </div>
                <div class="table-scroll">
                  <table class="race-table">
                    <thead><tr><th>Pos</th><th>Driver</th><th>Team</th><th>Pts</th></tr></thead>
                    <tbody id="driver-standings-body"></tbody>
                  </table>
                </div>
              </section>

              <section class="card">
                <div class="card-header">
                  <div><p class="eyebrow">Season View</p><h2>Constructor Standings</h2></div>
                  <span class="counter" id="team-standings-count">0</span>
                </div>
                <div class="table-scroll">
                  <table class="race-table">
                    <thead><tr><th>Pos</th><th>Team</th><th>Code</th><th>Pts</th></tr></thead>
                    <tbody id="team-standings-body"></tbody>
                  </table>
                </div>
              </section>
            </section>

            <section class="split-grid">
              <section class="card">
                <div class="card-header">
                  <div><p class="eyebrow">Season View</p><h2>Drivers</h2></div>
                  <span class="counter" id="drivers-count">0</span>
                </div>
                <div class="roster-grid" id="drivers-grid"></div>
              </section>

              <section class="card">
                <div class="card-header">
                  <div><p class="eyebrow">Season View</p><h2>Teams</h2></div>
                  <span class="counter" id="teams-count">0</span>
                </div>
                <div class="team-grid" id="teams-grid"></div>
              </section>
            </section>

            <section class="split-grid">
              <section class="card">
                <div class="card-header">
                  <div><p class="eyebrow">Calendar</p><h2>Season Schedule</h2></div>
                  <span class="counter" id="calendar-count">0</span>
                </div>
                <div class="calendar-grid" id="calendar-grid"></div>
              </section>

              <section class="card">
                <div class="card-header">
                  <div><p class="eyebrow">Race Weekends</p><h2>Weekend Tracker</h2></div>
                  <span class="counter" id="weekends-count">0</span>
                </div>
                <div class="calendar-grid" id="weekends-grid"></div>
              </section>
            </section>
          </section>

          <section class="tab-panel" data-tab-panel="circuits">
            <section class="card">
              <div class="card-header">
                <div><p class="eyebrow">Circuits</p><h2>Track Library</h2></div>
                <span class="counter" id="circuits-count">0</span>
              </div>
              <div class="circuits-grid" id="circuits-grid"></div>
            </section>
          </section>
        </main>

        <section class="card inspector-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Inspector</p>
              <h2 id="inspector-title">Tap a driver, team, circuit, or weekend card</h2>
            </div>
            <span class="counter" id="inspector-subtitle">Interactive details</span>
          </div>
          <div id="inspector-content" class="inspector-content">
            <div class="placeholder-card">
              The inspector updates as you explore the live leaderboard, season rosters,
              weekend cards, and circuits.
            </div>
          </div>
        </section>

        <nav class="mobile-bottom-nav" aria-label="Race Center mobile navigation">
          <button class="mobile-nav-button is-active" data-tab-target="live"><span>Live</span></button>
          <button class="mobile-nav-button" data-tab-target="season"><span>Season</span></button>
          <button class="mobile-nav-button" data-tab-target="circuits"><span>Circuits</span></button>
        </nav>
      </div>
    </section>
  </div>
`;

const storageKey = "race-center-ui-settings";
const tokenStorageKey = "race-center-ui-access-token";
const refreshTokenStorageKey = "race-center-ui-refresh-token";
const pollIntervalMs = 15000;
const defaultConfig = {
  defaultBaseUrl:
    import.meta.env.VITE_API_BASE_URL || "https://dev.formuladream.app/gaming-service",
  defaultSeason: import.meta.env.VITE_DEFAULT_SEASON || "2025",
  proxyBaseUrl: "/api/proxy",
};

const currentYear = new Date().getUTCFullYear();
const seasonOptions = Array.from(
  { length: Math.max(currentYear - 2023 + 2, 4) },
  (_, index) => String(2023 + index),
).reverse();

const elements = {
  authView: document.getElementById("auth-view"),
  dashboardView: document.getElementById("dashboard-view"),
  loginForm: document.getElementById("login-form"),
  loginIdentifier: document.getElementById("login-identifier"),
  loginPassword: document.getElementById("login-password"),
  authFeedback: document.getElementById("auth-feedback"),
  seasonToolbar: document.getElementById("season-toolbar"),
  accessToken: document.getElementById("access-token"),
  authStatusLabel: document.getElementById("auth-status-label"),
  authStatusDetail: document.getElementById("auth-status-detail"),
  authStatusPill: document.getElementById("auth-status-pill"),
  autoRefresh: document.getElementById("auto-refresh"),
  feedback: document.getElementById("feedback"),
  loadButton: document.getElementById("load-dashboard"),
  logoutButton: document.getElementById("logout-button"),
  driverFilter: document.getElementById("driver-filter"),
  teamFilter: document.getElementById("team-filter"),
  resetFiltersButton: document.getElementById("reset-filters"),
  selectionPill: document.getElementById("selection-pill"),
  tabButtons: Array.from(document.querySelectorAll("[data-tab-target]")),
  tabPanels: Array.from(document.querySelectorAll("[data-tab-panel]")),
  featuredSection: document.getElementById("featured-section"),
  liveOrderSection: document.getElementById("live-order-section"),
  weatherSection: document.getElementById("weather-section"),
  raceControlSection: document.getElementById("race-control-section"),
  liveDriversSection: document.getElementById("live-drivers-section"),
  liveStandingsSection: document.getElementById("live-standings-section"),
  liveDriverStandingsSection: document.getElementById("live-driver-standings-section"),
  liveTeamStandingsSection: document.getElementById("live-team-standings-section"),
  seasonStandingsSection: document.getElementById("season-standings-section"),
  inspectorTitle: document.getElementById("inspector-title"),
  inspectorSubtitle: document.getElementById("inspector-subtitle"),
  inspectorContent: document.getElementById("inspector-content"),
  statusSource: document.getElementById("status-source"),
  statusRefresh: document.getElementById("status-refresh"),
  statusSession: document.getElementById("status-session"),
  sessionTitle: document.getElementById("session-title"),
  sessionUpdated: document.getElementById("session-updated"),
  eventGrandPrix: document.getElementById("event-grand-prix"),
  eventType: document.getElementById("event-type"),
  sessionCircuit: document.getElementById("session-circuit"),
  sessionLocation: document.getElementById("session-location"),
  sessionWindow: document.getElementById("session-window"),
  sessionMetrics: document.getElementById("session-metrics"),
  sessionCountryFlag: document.getElementById("session-country-flag"),
  sessionCountryName: document.getElementById("session-country-name"),
  sessionCountryDetail: document.getElementById("session-country-detail"),
  metricDrivers: document.getElementById("metric-drivers"),
  metricPositions: document.getElementById("metric-positions"),
  metricMessages: document.getElementById("metric-messages"),
  metricWeather: document.getElementById("metric-weather"),
  featuredCount: document.getElementById("featured-count"),
  featuredGrid: document.getElementById("featured-grid"),
  leaderboardBody: document.getElementById("leaderboard-body"),
  weatherGrid: document.getElementById("weather-grid"),
  raceControlFeed: document.getElementById("race-control-feed"),
  liveDriverStandingsCount: document.getElementById("live-driver-standings-count"),
  liveDriverStandingsBody: document.getElementById("live-driver-standings-body"),
  liveTeamStandingsCount: document.getElementById("live-team-standings-count"),
  liveTeamStandingsBody: document.getElementById("live-team-standings-body"),
  liveDriversCount: document.getElementById("live-drivers-count"),
  liveDriversGrid: document.getElementById("live-drivers-grid"),
  driverStandingsCount: document.getElementById("driver-standings-count"),
  driverStandingsBody: document.getElementById("driver-standings-body"),
  teamStandingsCount: document.getElementById("team-standings-count"),
  teamStandingsBody: document.getElementById("team-standings-body"),
  driversCount: document.getElementById("drivers-count"),
  driversGrid: document.getElementById("drivers-grid"),
  teamsCount: document.getElementById("teams-count"),
  teamsGrid: document.getElementById("teams-grid"),
  calendarCount: document.getElementById("calendar-count"),
  calendarGrid: document.getElementById("calendar-grid"),
  weekendsCount: document.getElementById("weekends-count"),
  weekendsGrid: document.getElementById("weekends-grid"),
  circuitsCount: document.getElementById("circuits-count"),
  circuitsGrid: document.getElementById("circuits-grid"),
};

let currentPollHandle = null;
const appState = {
  responses: {},
  lookups: {
    seasonDrivers: new Map(),
    seasonDriversByCode: new Map(),
    teamLookup: new Map(),
  },
  filters: {
    driverNumber: "",
    teamName: "",
  },
  currentTab: "live",
};

function readSettings() {
  return {
    season: elements.seasonToolbar.value.trim(),
    accessToken: elements.accessToken.value.trim(),
    loginIdentifier: elements.loginIdentifier.value.trim(),
    autoRefresh: elements.autoRefresh.checked,
  };
}

function persistSettings() {
  const settings = readSettings();
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      season: settings.season,
      loginIdentifier: settings.loginIdentifier,
      autoRefresh: settings.autoRefresh,
    }),
  );
}

function setSeasonValue(value) {
  const season = String(value || defaultConfig.defaultSeason);
  elements.seasonToolbar.value = season;
}

function getStoredAccessToken() {
  return localStorage.getItem(tokenStorageKey) || "";
}

function getStoredRefreshToken() {
  return localStorage.getItem(refreshTokenStorageKey) || "";
}

function persistTokens(accessToken, refreshToken = "") {
  if (accessToken) {
    localStorage.setItem(tokenStorageKey, accessToken);
    elements.accessToken.value = accessToken;
  }
  if (refreshToken) {
    localStorage.setItem(refreshTokenStorageKey, refreshToken);
  }
  updateAuthStatus();
  showDashboard();
}

function clearTokens() {
  localStorage.removeItem(tokenStorageKey);
  localStorage.removeItem(refreshTokenStorageKey);
  elements.accessToken.value = "";
  updateAuthStatus();
  showAuthView();
}

function showAuthView() {
  elements.authView.classList.remove("hidden");
  elements.dashboardView.classList.add("hidden");
}

function showDashboard() {
  elements.authView.classList.add("hidden");
  elements.dashboardView.classList.remove("hidden");
}

function updateAuthStatus() {
  const isSignedIn = Boolean(elements.accessToken.value.trim());
  elements.authStatusLabel.textContent = isSignedIn ? "Authenticated" : "Signed out";
  elements.authStatusDetail.textContent = isSignedIn
    ? "Your Race Center session stays signed in on this device."
    : "Sign in with your FormulaDream account to load Race Center data.";
  elements.authStatusPill.textContent = isSignedIn ? "Session active" : "No token";
  elements.authStatusPill.classList.toggle("is-active", isSignedIn);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function applyFeedback(message, tone = "") {
  elements.feedback.textContent = message;
  elements.feedback.className = `feedback ${tone}`.trim();
}

function applyAuthFeedback(message, tone = "") {
  elements.authFeedback.textContent = message;
  elements.authFeedback.className = `feedback ${tone}`.trim();
}

function setInspector(title, subtitle, html) {
  elements.inspectorTitle.textContent = title;
  elements.inspectorSubtitle.textContent = subtitle;
  elements.inspectorContent.innerHTML = html;
}

function renderInspectorFacts(facts) {
  return `
    <div class="inspector-grid">
      ${facts
        .map(
          ([label, value]) => `
            <div class="inspector-fact">
              <span class="subtext">${escapeHtml(label)}</span>
              <strong>${escapeHtml(value ?? "-")}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function loadDefaults() {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
  const accessToken = getStoredAccessToken();
  const season = saved.season || defaultConfig.defaultSeason || String(currentYear);

  optionList(
    elements.seasonToolbar,
    seasonOptions.map((item) => ({ value: item, label: item })),
    "Select season",
  );
  setSeasonValue(season);
  elements.accessToken.value = accessToken;
  elements.loginIdentifier.value = saved.loginIdentifier || "";
  elements.autoRefresh.checked = Boolean(saved.autoRefresh);
  elements.statusRefresh.textContent = elements.autoRefresh.checked ? "Every 15s" : "Manual";
  updateAuthStatus();
  setActiveTab(appState.currentTab);
  if (accessToken) {
    showDashboard();
  } else {
    showAuthView();
  }
}

function buildUrl(baseUrl, path, query) {
  const url = new URL(`${baseUrl.replace(/\/$/, "")}${path}`);
  if (query && typeof query === "object") {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    }
  }
  return url.toString();
}

function buildProxyQuery(path, query) {
  return {
    path,
    ...(query || {}),
  };
}

async function refreshAccessToken() {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) {
    return "";
  }

  const response = await fetch(
    buildUrl(window.location.origin, defaultConfig.proxyBaseUrl, buildProxyQuery("/api/v1/users/refresh-token")),
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: refreshToken.startsWith("Bearer ")
          ? refreshToken
          : `Bearer ${refreshToken}`,
      },
      credentials: "same-origin",
    },
  );

  const raw = await response.text();
  let payload = {};
  try {
    payload = JSON.parse(raw);
  } catch {
    throw new Error(raw || `Refresh failed with status ${response.status}`);
  }

  if (!response.ok) {
    throw new Error(
      payload.detail || payload.errorMessage || `Refresh failed with status ${response.status}`,
    );
  }

  const accessToken = payload?.response?.accessToken;
  const returnedRefreshToken = payload?.response?.refreshToken || refreshToken;
  if (!accessToken) {
    throw new Error("Refresh succeeded but no access token was returned.");
  }
  persistTokens(accessToken, returnedRefreshToken);
  return accessToken;
}

async function apiRequest(
  path,
  { method = "GET", query, body, includeAuth = true, retryOnAuthFailure = true } = {},
) {
  const settings = readSettings();
  const headers = { Accept: "application/json" };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (includeAuth && settings.accessToken) {
    headers.Authorization = settings.accessToken.startsWith("Bearer ")
      ? settings.accessToken
      : `Bearer ${settings.accessToken}`;
  }

  const response = await fetch(
    buildUrl(window.location.origin, defaultConfig.proxyBaseUrl, buildProxyQuery(path, query)),
    {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: "same-origin",
    },
  );

  const raw = await response.text();
  let payload = {};
  try {
    payload = JSON.parse(raw);
  } catch {
    throw new Error(raw || `Request failed with status ${response.status}`);
  }

  if (
    response.status === 401 &&
    includeAuth &&
    retryOnAuthFailure &&
    getStoredRefreshToken()
  ) {
    try {
      const newAccessToken = await refreshAccessToken();
      elements.accessToken.value = newAccessToken;
      return await apiRequest(path, {
        method,
        query,
        body,
        includeAuth,
        retryOnAuthFailure: false,
      });
    } catch (error) {
      clearTokens();
      throw error;
    }
  }

  if (!response.ok) {
    throw new Error(
      payload.detail || payload.errorMessage || `Request failed with status ${response.status}`,
    );
  }

  return payload;
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

function formatColor(value, fallback = "#9bb0d1") {
  if (!value) {
    return fallback;
  }
  return value.startsWith("#") ? value : `#${value}`;
}

function optionList(selectElement, items, placeholder) {
  const currentValue = selectElement.value;
  selectElement.innerHTML = [
    `<option value="">${placeholder}</option>`,
    ...items.map(
      ({ value, label }) =>
        `<option value="${escapeHtml(String(value))}">${escapeHtml(label)}</option>`,
    ),
  ].join("");
  if (items.some((item) => String(item.value) === currentValue)) {
    selectElement.value = currentValue;
  }
}

function normalizeTeamName(value) {
  const aliases = {
    redbullracing: "redbull",
    redbull: "redbull",
    rbf1team: "rb",
    racingbulls: "rb",
    haasf1team: "haas",
    kicksauber: "sauber",
    sauber: "sauber",
    astonmartinaramcoformulaoneteam: "astonmartin",
    scuderiaferrari: "ferrari",
    mercedesamgpetronasformulaoneteam: "mercedes",
  };
  const sanitized = (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return aliases[sanitized] || sanitized;
}

function getCountryCode(name) {
  const countryMap = {
    argentina: "ar",
    australia: "au",
    austria: "at",
    bahrain: "bh",
    belgium: "be",
    brazil: "br",
    canada: "ca",
    china: "cn",
    france: "fr",
    germany: "de",
    hungary: "hu",
    india: "in",
    italy: "it",
    japan: "jp",
    mexico: "mx",
    monaco: "mc",
    netherlands: "nl",
    newzealand: "nz",
    qatar: "qa",
    saudiarabia: "sa",
    singapore: "sg",
    spain: "es",
    switzerland: "ch",
    thailand: "th",
    unitedarabemirates: "ae",
    unitedkingdom: "gb",
    unitedstates: "us",
    unitedstatesofamerica: "us",
    usa: "us",
  };
  const key = String(name || "").toLowerCase().replace(/[^a-z]/g, "");
  return countryMap[key] || "";
}

function getFlagMarkup(name, alt) {
  const code = getCountryCode(name);
  if (!code) {
    return `<span class="flag-fallback">${escapeHtml((alt || name || "GP").slice(0, 2).toUpperCase())}</span>`;
  }
  return `<img class="flag-image" src="https://flagcdn.com/w40/${code}.png" alt="${escapeHtml(
    alt || name,
  )} flag" />`;
}

function buildTeamLookup(teams) {
  const lookup = new Map();
  for (const team of teams || []) {
    lookup.set(normalizeTeamName(team.name), team);
  }
  return lookup;
}

function buildSeasonDriverLookup(drivers) {
  return new Map((drivers || []).map((driver) => [driver.driverNumber, driver]));
}

function buildSeasonDriverCodeLookup(drivers) {
  return new Map(
    (drivers || [])
      .filter((driver) => driver.driverCode)
      .map((driver) => [driver.driverCode, driver]),
  );
}

function getTeamTheme(teamLookup, liveTeamName, fallbackColor) {
  const team = teamLookup.get(normalizeTeamName(liveTeamName));
  const primary = formatColor(
    team?.gradientStart || team?.primaryColor,
    fallbackColor || "#24344e",
  );
  const secondary = formatColor(
    team?.gradientEnd || team?.secondaryColor || team?.primaryColor,
    "#101b2d",
  );
  return {
    team,
    accent: primary,
    gradient: `linear-gradient(135deg, ${primary}, ${secondary})`,
  };
}

function getDriverPresentation(liveDriver, seasonDriver, teamLookup) {
  const name = seasonDriver?.fullName || liveDriver?.full_name || "Unknown Driver";
  const code = seasonDriver?.driverCode || liveDriver?.name_acronym || "DRV";
  const number = seasonDriver?.driverNumber || liveDriver?.driver_number || "-";
  const image = seasonDriver?.driverImageUrl || liveDriver?.headshot_url || null;
  const teamName = seasonDriver?.teamName || liveDriver?.team_name || "Unknown team";
  const fallbackColor = liveDriver?.team_colour ? formatColor(liveDriver.team_colour) : "#24344e";
  const theme = getTeamTheme(teamLookup, teamName, fallbackColor);
  return {
    name,
    code,
    number,
    image,
    teamName,
    nationality: seasonDriver?.nationality || liveDriver?.country_code || "",
    accent: theme.accent,
    gradient: theme.gradient,
  };
}

function isDriverVisible(presentation) {
  if (
    appState.filters.driverNumber &&
    String(presentation.number) !== String(appState.filters.driverNumber)
  ) {
    return false;
  }
  if (
    appState.filters.teamName &&
    normalizeTeamName(presentation.teamName) !==
      normalizeTeamName(appState.filters.teamName)
  ) {
    return false;
  }
  return true;
}

function isTeamVisible(teamName) {
  if (!appState.filters.teamName) {
    return true;
  }
  return normalizeTeamName(teamName) === normalizeTeamName(appState.filters.teamName);
}

function updateSelectionPill() {
  const labels = [];
  if (appState.filters.driverNumber) {
    labels.push(`Driver #${appState.filters.driverNumber}`);
  }
  if (appState.filters.teamName) {
    labels.push(appState.filters.teamName);
  }
  elements.selectionPill.textContent = labels.length ? labels.join(" • ") : "All data";
}

function syncFilterControls() {
  elements.driverFilter.value = appState.filters.driverNumber || "";
  elements.teamFilter.value = appState.filters.teamName || "";
  updateSelectionPill();
}

function setActiveTab(tabName) {
  appState.currentTab = tabName;
  elements.tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tabTarget === tabName);
  });
  elements.tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.tabPanel === tabName);
  });
}

function populateFilters() {
  const driverItems = (appState.responses.drivers?.response?.drivers || [])
    .map((driver) => ({
      value: driver.driverNumber,
      label: `${driver.fullName} (#${driver.driverNumber})`,
    }))
    .sort((left, right) => left.label.localeCompare(right.label));
  optionList(elements.driverFilter, driverItems, "All drivers");

  const teamItems = (appState.responses.teams?.response || [])
    .map((team) => ({ value: team.name, label: team.name }))
    .sort((left, right) => left.label.localeCompare(right.label));
  optionList(elements.teamFilter, teamItems, "All teams");
  syncFilterControls();
}

function setLoadingState() {
  elements.loadButton.disabled = true;
  applyFeedback("Loading Race Center data...");
  renderLoadingSkeletons();
}

function clearLoadingState() {
  elements.loadButton.disabled = false;
}

function skeletonCard(count = 1) {
  return Array.from({ length: count })
    .map(
      () => `
        <div class="skeleton-card">
          <div class="skeleton-line skeleton-line--short"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line skeleton-line--medium"></div>
        </div>
      `,
    )
    .join("");
}

function skeletonRows(columns = 4, rows = 4) {
  return Array.from({ length: rows })
    .map(
      () => `
        <tr>
          <td colspan="${columns}">
            <div class="skeleton-line"></div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function setSectionVisibility(element, visible) {
  element.classList.toggle("hidden", !visible);
}

function renderLoadingSkeletons() {
  setSectionVisibility(elements.featuredSection, true);
  setSectionVisibility(elements.liveOrderSection, true);
  setSectionVisibility(elements.weatherSection, true);
  setSectionVisibility(elements.raceControlSection, true);
  setSectionVisibility(elements.liveDriversSection, true);
  elements.featuredGrid.innerHTML = skeletonCard(3);
  elements.weatherGrid.innerHTML = skeletonCard(4);
  elements.raceControlFeed.innerHTML = skeletonCard(3);
  elements.liveDriversGrid.innerHTML = skeletonCard(6);
  elements.driversGrid.innerHTML = skeletonCard(6);
  elements.teamsGrid.innerHTML = skeletonCard(6);
  elements.calendarGrid.innerHTML = skeletonCard(6);
  elements.weekendsGrid.innerHTML = skeletonCard(6);
  elements.circuitsGrid.innerHTML = skeletonCard(6);
  elements.leaderboardBody.innerHTML = skeletonRows(4, 6);
  elements.liveDriverStandingsBody.innerHTML = skeletonRows(4, 4);
  elements.liveTeamStandingsBody.innerHTML = skeletonRows(4, 4);
  elements.driverStandingsBody.innerHTML = skeletonRows(4, 4);
  elements.teamStandingsBody.innerHTML = skeletonRows(4, 4);
}

function safeRender(renderFn, ...args) {
  try {
    renderFn(...args);
    return null;
  } catch (error) {
    return error;
  }
}

function renderFeaturedDrivers(positions, driverByNumber, lookups) {
  const featured = positions
    .slice(0, 3)
    .map((row) => {
      const liveDriver = driverByNumber.get(row.driver_number) || {};
      const seasonDriver = lookups.seasonDrivers.get(row.driver_number);
      return {
        row,
        presentation: getDriverPresentation(
          liveDriver,
          seasonDriver,
          lookups.teamLookup,
        ),
      };
    })
    .filter((item) => isDriverVisible(item.presentation));

  setSectionVisibility(elements.featuredSection, featured.length > 0);
  elements.featuredCount.textContent = `${featured.length}`;
  if (!featured.length) {
    return;
  }

  elements.featuredGrid.innerHTML = featured
    .map(({ row, presentation }) => {
      const flag = getFlagMarkup(
        presentation.nationality,
        presentation.nationality || presentation.name,
      );
      const image = presentation.image
        ? `<img class="driver-avatar" src="${presentation.image}" alt="${escapeHtml(presentation.name)}" />`
        : `<div class="driver-avatar fallback-avatar">${escapeHtml(
            presentation.code,
          )}</div>`;
      return `
        <article class="driver-card inspectable featured-card" data-inspect-type="driver" data-driver-number="${presentation.number}" style="background:${presentation.gradient}">
          ${image}
          <div>
            <h3>P${row.position} • ${escapeHtml(presentation.name)}</h3>
            <div class="subtext">${escapeHtml(presentation.teamName)}</div>
            <div class="subtext inline-flag">${flag}<span>${escapeHtml(
              presentation.nationality || "Nationality unavailable",
            )}</span></div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCurrent(currentResponse, lookups) {
  const response = currentResponse.response || {};
  const session = response.session || {};
  const event = response.formulaDreamEvent || {};
  const drivers = response.drivers || [];
  const positions = [...(response.positions || [])].sort(
    (a, b) => (a.position ?? 999) - (b.position ?? 999),
  );
  const intervals = response.intervals || [];
  const intervalByDriver = new Map(
    intervals.map((item) => [item.driver_number, item]),
  );
  const driverByNumber = new Map(drivers.map((item) => [item.driver_number, item]));
  const latestWeather = (response.weather || [])[0];
  const raceControl = response.raceControl || [];
  const liveDriverStandings = response.driverStandings || [];
  const liveTeamStandings = response.teamStandings || [];

  elements.statusSource.textContent = response.source || "Unknown";
  elements.statusSession.textContent = session.sessionName || event.event || "Waiting";
  elements.sessionTitle.textContent = `${session.countryName || "Unknown GP"} ${session.sessionName || ""}`.trim();
  elements.sessionUpdated.textContent = `Updated ${new Date().toLocaleTimeString()}`;
  elements.eventGrandPrix.textContent = event.grandPrix || "-";
  elements.eventType.textContent = event.event || session.sessionType || "-";
  elements.sessionCircuit.textContent = session.circuitShortName || "-";
  elements.sessionLocation.textContent =
    [session.location, session.countryName].filter(Boolean).join(", ") || "-";
  elements.sessionWindow.textContent = `${formatDateTime(session.dateStart)} - ${formatDateTime(
    session.dateEnd,
  )}`;
  elements.sessionMetrics.textContent = `${drivers.length} drivers • ${positions.length} positions • ${raceControl.length} messages`;
  elements.sessionCountryFlag.innerHTML = getFlagMarkup(
    session.countryName,
    session.countryName || "Grand Prix",
  );
  elements.sessionCountryName.textContent = session.countryName || "Unknown Country";
  elements.sessionCountryDetail.textContent = `${session.location || "-"} • ${session.circuitShortName || "-"}`;
  elements.metricDrivers.textContent = String(drivers.length);
  elements.metricPositions.textContent = String(positions.length);
  elements.metricMessages.textContent = String(raceControl.length);
  elements.metricWeather.textContent = latestWeather ? "Live" : "No";

  const filteredPositions = positions.filter((row) => {
    const liveDriver = driverByNumber.get(row.driver_number) || {};
    const seasonDriver = lookups.seasonDrivers.get(row.driver_number);
    const presentation = getDriverPresentation(
      liveDriver,
      seasonDriver,
      lookups.teamLookup,
    );
    return isDriverVisible(presentation);
  });

  setSectionVisibility(elements.liveOrderSection, filteredPositions.length > 0);
  if (filteredPositions.length) {
    elements.leaderboardBody.innerHTML = filteredPositions
      .map((row) => {
        const driver = driverByNumber.get(row.driver_number) || {};
        const seasonDriver = lookups.seasonDrivers.get(row.driver_number);
        const presentation = getDriverPresentation(
          driver,
          seasonDriver,
          lookups.teamLookup,
        );
        const interval = intervalByDriver.get(row.driver_number);
        const gap = interval?.gap_to_leader ?? interval?.interval ?? "-";
        return `
          <tr class="inspectable" data-inspect-type="driver" data-driver-number="${presentation.number}">
            <td>${row.position ?? "-"}</td>
            <td>
              <div class="driver-cell">
                <span class="driver-badge" style="background:${presentation.gradient}">${escapeHtml(
                  presentation.code || row.driver_number || "--",
                )}</span>
                <div>
                  <strong>${escapeHtml(presentation.name)}</strong>
                  <div class="subtext">#${escapeHtml(presentation.number)}</div>
                </div>
              </div>
            </td>
            <td>
              <span class="team-pill">
                <span class="team-color-dot" style="background:${presentation.accent}"></span>
                ${escapeHtml(presentation.teamName)}
              </span>
            </td>
            <td>${escapeHtml(gap)}</td>
          </tr>
        `;
      })
      .join("");
  }

  setSectionVisibility(elements.weatherSection, Boolean(latestWeather));
  if (latestWeather) {
    const items = [
      ["Air Temp", `${latestWeather.air_temperature}°C`],
      ["Track Temp", `${latestWeather.track_temperature}°C`],
      ["Humidity", `${latestWeather.humidity}%`],
      ["Pressure", `${latestWeather.pressure} hPa`],
      ["Wind", `${latestWeather.wind_speed} km/h`],
      ["Rainfall", latestWeather.rainfall ? "Yes" : "No"],
    ];
    elements.weatherGrid.innerHTML = items
      .map(
        ([label, value]) => `
          <div class="weather-card">
            <span class="subtext">${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
          </div>
        `,
      )
      .join("");
  }

  setSectionVisibility(elements.raceControlSection, raceControl.length > 0);
  if (raceControl.length) {
    elements.raceControlFeed.innerHTML = raceControl
      .slice(0, 15)
      .map(
        (item) => `
          <li class="feed-item">
            <div class="feed-meta">
              <span>${escapeHtml(item.category || "Update")}</span>
              <span>${escapeHtml(formatDateTime(item.date))}</span>
            </div>
            <div class="feed-message">${escapeHtml(item.message || "No message body")}</div>
          </li>
        `,
      )
      .join("");
  }

  renderFeaturedDrivers(filteredPositions, driverByNumber, lookups);
  renderLiveDrivers(drivers, lookups);
  renderLiveDriverStandings(liveDriverStandings, driverByNumber, lookups);
  renderLiveTeamStandings(liveTeamStandings);
}

function renderDrivers(driversResponse, teamLookup) {
  const response = driversResponse.response || {};
  const drivers = response.drivers || [];
  const visibleDrivers = drivers.filter((driver) =>
    isDriverVisible(
      getDriverPresentation(
        {
          driver_number: driver.driverNumber,
          full_name: driver.fullName,
          name_acronym: driver.driverCode,
          team_name: driver.teamName,
          team_colour: driver.teamColor?.replace("#", ""),
        },
        driver,
        teamLookup,
      ),
    ),
  );
  elements.driversCount.textContent = `${visibleDrivers.length}`;

  if (!visibleDrivers.length) {
    elements.driversGrid.innerHTML =
      '<div class="placeholder-card">No drivers loaded for this season.</div>';
    return;
  }

  elements.driversGrid.innerHTML = visibleDrivers
    .slice(0, 20)
    .map((driver) => {
      const presentation = getDriverPresentation(
        {
          driver_number: driver.driverNumber,
          full_name: driver.fullName,
          name_acronym: driver.driverCode,
          team_name: driver.teamName,
          team_colour: driver.teamColor?.replace("#", ""),
        },
        driver,
        teamLookup,
      );
      const image = driver.driverImageUrl
        ? `<img class="driver-avatar" src="${driver.driverImageUrl}" alt="${escapeHtml(driver.fullName)}" />`
        : `<div class="driver-avatar fallback-avatar">${escapeHtml(
            driver.driverCode || "DRV",
          )}</div>`;
      const flag = getFlagMarkup(driver.nationality, driver.nationality || driver.fullName);
      return `
        <article class="driver-card inspectable" data-inspect-type="driver" data-driver-number="${driver.driverNumber}" style="background:${presentation.gradient}">
          ${image}
          <div>
            <h3>${escapeHtml(presentation.name)}</h3>
            <div class="subtext">${escapeHtml(
              driver.driverCode || "-",
            )} • #${escapeHtml(driver.driverNumber || "-")}</div>
            <div class="subtext inline-flag">${flag}<span>${escapeHtml(
              driver.nationality || "Unknown nationality",
            )}</span></div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderLiveDrivers(drivers, lookups) {
  const visibleDrivers = drivers.filter((driver) => {
    const seasonDriver = lookups.seasonDrivers.get(driver.driver_number);
    const presentation = getDriverPresentation(
      driver,
      seasonDriver,
      lookups.teamLookup,
    );
    return isDriverVisible(presentation);
  });

  setSectionVisibility(elements.liveDriversSection, visibleDrivers.length > 0);
  elements.liveDriversCount.textContent = `${visibleDrivers.length}`;
  if (!visibleDrivers.length) {
    return;
  }

  elements.liveDriversGrid.innerHTML = visibleDrivers
    .slice(0, 20)
    .map((driver) => {
      const seasonDriver = lookups.seasonDrivers.get(driver.driver_number);
      const presentation = getDriverPresentation(
        driver,
        seasonDriver,
        lookups.teamLookup,
      );
      const image = presentation.image
        ? `<img class="driver-avatar" src="${presentation.image}" alt="${escapeHtml(presentation.name)}" />`
        : `<div class="driver-avatar fallback-avatar">${escapeHtml(
            presentation.code || "DRV",
          )}</div>`;
      const flag = getFlagMarkup(
        presentation.nationality,
        presentation.nationality || presentation.name,
      );
      return `
        <article class="driver-card inspectable" data-inspect-type="driver" data-driver-number="${presentation.number}" style="background:${presentation.gradient}; border-left: 4px solid ${presentation.accent}">
          ${image}
          <div>
            <h3>${escapeHtml(presentation.name)}</h3>
            <div class="subtext">${escapeHtml(
              presentation.code || "-",
            )} • #${escapeHtml(presentation.number)}</div>
            <div class="subtext">${escapeHtml(presentation.teamName)}</div>
            <div class="subtext inline-flag">${flag}<span>${escapeHtml(
              presentation.nationality || "Nationality unavailable",
            )}</span></div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderLiveDriverStandings(standings, driverByNumber, lookups) {
  const filteredStandings = standings.filter((row) => {
    const driver = driverByNumber.get(row.driver_number) || {};
    const seasonDriver = lookups.seasonDrivers.get(row.driver_number);
    const presentation = getDriverPresentation(
      driver,
      seasonDriver,
      lookups.teamLookup,
    );
    return isDriverVisible(presentation);
  });
  elements.liveDriverStandingsCount.textContent = `${filteredStandings.length}`;
  setSectionVisibility(
    elements.liveDriverStandingsSection,
    filteredStandings.length > 0,
  );
  setSectionVisibility(elements.liveStandingsSection, filteredStandings.length > 0);

  if (!filteredStandings.length) {
    return;
  }

  const sorted = [...filteredStandings].sort(
    (left, right) =>
      (left.position_current ?? Number.MAX_SAFE_INTEGER) -
      (right.position_current ?? Number.MAX_SAFE_INTEGER),
  );

  elements.liveDriverStandingsBody.innerHTML = sorted
    .map((row) => {
      const driver = driverByNumber.get(row.driver_number) || {};
      const seasonDriver = lookups.seasonDrivers.get(row.driver_number);
      const presentation = getDriverPresentation(
        driver,
        seasonDriver,
        lookups.teamLookup,
      );
      return `
        <tr class="inspectable" data-inspect-type="driver" data-driver-number="${row.driver_number}">
          <td>${escapeHtml(row.position_current ?? "-")}</td>
          <td>${escapeHtml(presentation.name)}</td>
          <td>${escapeHtml(row.points_start ?? "-")}</td>
          <td>${escapeHtml(row.points_current ?? "-")}</td>
        </tr>
      `;
    })
    .join("");
}

function renderLiveTeamStandings(standings) {
  const filteredStandings = standings.filter((row) => isTeamVisible(row.team_name));
  elements.liveTeamStandingsCount.textContent = `${filteredStandings.length}`;
  setSectionVisibility(elements.liveTeamStandingsSection, filteredStandings.length > 0);
  setSectionVisibility(
    elements.liveStandingsSection,
    !elements.liveDriverStandingsSection.classList.contains("hidden") ||
      filteredStandings.length > 0,
  );

  if (!filteredStandings.length) {
    return;
  }

  const sorted = [...filteredStandings].sort(
    (left, right) =>
      (left.position_current ?? Number.MAX_SAFE_INTEGER) -
      (right.position_current ?? Number.MAX_SAFE_INTEGER),
  );

  elements.liveTeamStandingsBody.innerHTML = sorted
    .map(
      (row) => `
        <tr class="inspectable" data-inspect-type="team" data-team-name="${escapeHtml(
          row.team_name || "",
        )}">
          <td>${escapeHtml(row.position_current ?? "-")}</td>
          <td>${escapeHtml(row.team_name || "-")}</td>
          <td>${escapeHtml(row.points_start ?? "-")}</td>
          <td>${escapeHtml(row.points_current ?? "-")}</td>
        </tr>
      `,
    )
    .join("");
}

function renderTeams(teamsResponse) {
  const teams = (teamsResponse.response || []).filter((team) => isTeamVisible(team.name));
  elements.teamsCount.textContent = `${teams.length}`;

  if (!teams.length) {
    elements.teamsGrid.innerHTML =
      '<div class="placeholder-card">No teams loaded for this season.</div>';
    return;
  }

  elements.teamsGrid.innerHTML = teams
    .map((team) => {
      const logo = team.image
        ? `<img class="team-logo" src="${team.image}" alt="${escapeHtml(team.name)}" />`
        : `<div class="team-logo fallback-avatar">${escapeHtml(
            team.teamCode || "TM",
          )}</div>`;
      const gradient =
        team.gradientStart && team.gradientEnd
          ? `background: linear-gradient(135deg, ${team.gradientStart}, ${team.gradientEnd});`
          : "";
      return `
        <article class="team-card inspectable" data-inspect-type="team" data-team-name="${escapeHtml(
          team.name || "",
        )}" style="${gradient}">
          ${logo}
          <div>
            <h3>${escapeHtml(team.name)}</h3>
            <div class="subtext">${escapeHtml(team.teamCode || "-")}</div>
            <div class="subtext">Primary ${escapeHtml(team.primaryColor || "n/a")}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderRaceWeekends(racesResponse) {
  const response = racesResponse.response || {};
  const races = response.races || [];
  elements.weekendsCount.textContent = `${response.totalRaces || races.length}`;

  if (!races.length) {
    elements.weekendsGrid.innerHTML =
      '<div class="placeholder-card">No race weekends loaded.</div>';
    return;
  }

  const now = Date.now();
  elements.weekendsGrid.innerHTML = races
    .slice(0, 6)
    .map((race) => {
      const start = new Date(race.startDatetime).getTime();
      const end = new Date(race.endDatetime).getTime();
      const active = now >= start && now <= end;
      const flag = getFlagMarkup(race.country, race.country);
      return `
        <article class="calendar-card inspectable ${active ? "active-weekend" : ""}" data-inspect-type="race" data-race-id="${race.id}">
          <span class="subtext">${escapeHtml(race.status || "scheduled")}</span>
          <h3>${escapeHtml(race.grandPrix)}</h3>
          <div class="subtext inline-flag">${flag}<span>Round ${escapeHtml(
            race.roundNumber,
          )} • ${escapeHtml(race.country)}</span></div>
          <div class="subtext">${escapeHtml(
            race.circuit?.circuitName || race.location,
          )}</div>
          <div class="subtext">${escapeHtml(formatDateTime(race.startDatetime))}</div>
        </article>
      `;
    })
    .join("");
}

function renderCircuits(circuitsResponse, currentResponse) {
  const response = circuitsResponse.response || {};
  const circuits = response.circuits || [];
  const currentCircuit = currentResponse?.response?.session?.circuitShortName || "";
  elements.circuitsCount.textContent = `${response.totalCircuits || circuits.length}`;

  if (!circuits.length) {
    elements.circuitsGrid.innerHTML =
      '<div class="placeholder-card">No circuits loaded.</div>';
    return;
  }

  const prioritized = [...circuits].sort((left, right) => {
    const leftMatch = left.circuitName
      ?.toLowerCase()
      .includes(currentCircuit.toLowerCase())
      ? 1
      : 0;
    const rightMatch = right.circuitName
      ?.toLowerCase()
      .includes(currentCircuit.toLowerCase())
      ? 1
      : 0;
    return rightMatch - leftMatch;
  });

  elements.circuitsGrid.innerHTML = prioritized
    .slice(0, 12)
    .map((circuit) => {
      const active =
        currentCircuit &&
        circuit.circuitName?.toLowerCase().includes(currentCircuit.toLowerCase());
      const art =
        circuit.twoDImageUrl ||
        circuit.threeDColorImageUrl ||
        circuit.threeDPlaneImageUrl;
      const image = art
        ? `<img class="circuit-art" src="${art}" alt="${escapeHtml(circuit.circuitName)}" />`
        : `<div class="circuit-art"></div>`;
      const flag = getFlagMarkup(circuit.country, circuit.country);
      return `
        <article class="circuit-card inspectable ${active ? "active-weekend" : ""}" data-inspect-type="circuit" data-circuit-id="${circuit.id}">
          ${image}
          <div>
            <h3>${escapeHtml(circuit.circuitName)}</h3>
            <div class="subtext inline-flag">${flag}<span>${escapeHtml(
              circuit.city || "-",
            )}, ${escapeHtml(circuit.country || "-")}</span></div>
            <div class="subtext">${escapeHtml(
              circuit.lengthKm ? `${circuit.lengthKm} km` : "Length unavailable",
            )} • ${escapeHtml(
              circuit.numberOfCorners
                ? `${circuit.numberOfCorners} corners`
                : "Corners unavailable",
            )}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDriverStandings(standingsResponse) {
  const response = standingsResponse.response || {};
  const standings = (response.standings || []).filter((row) => {
    if (
      appState.filters.driverNumber &&
      String(row.driverNumber || "") !== String(appState.filters.driverNumber)
    ) {
      return false;
    }
    if (
      appState.filters.teamName &&
      normalizeTeamName(row.teamName) !== normalizeTeamName(appState.filters.teamName)
    ) {
      return false;
    }
    return true;
  });
  elements.driverStandingsCount.textContent = `${standings.length}`;

  if (!standings.length) {
    elements.driverStandingsBody.innerHTML =
      '<tr><td colspan="4" class="empty-row">No driver standings loaded for this season.</td></tr>';
    return;
  }

  elements.driverStandingsBody.innerHTML = standings
    .slice(0, 20)
    .map(
      (row) => `
        <tr class="inspectable" data-inspect-type="driver" data-driver-number="${row.driverNumber || ""}" data-driver-code="${row.driverCode || ""}">
          <td>${escapeHtml(row.position ?? "-")}</td>
          <td>${escapeHtml(
            row.driverName || [row.firstName, row.lastName].filter(Boolean).join(" ") || "-",
          )}</td>
          <td>${escapeHtml(row.teamName || "-")}</td>
          <td>${escapeHtml(row.points ?? "-")}</td>
        </tr>
      `,
    )
    .join("");
}

function renderTeamStandings(standingsResponse) {
  const response = standingsResponse.response || {};
  const standings = (response.standings || []).filter((row) =>
    isTeamVisible(row.constructorName),
  );
  elements.teamStandingsCount.textContent = `${standings.length}`;

  if (!standings.length) {
    elements.teamStandingsBody.innerHTML =
      '<tr><td colspan="4" class="empty-row">No constructor standings loaded for this season.</td></tr>';
    return;
  }

  elements.teamStandingsBody.innerHTML = standings
    .slice(0, 20)
    .map(
      (row) => `
        <tr class="inspectable" data-inspect-type="team" data-team-name="${escapeHtml(
          row.constructorName || "",
        )}">
          <td>${escapeHtml(row.position ?? "-")}</td>
          <td>${escapeHtml(row.constructorName || "-")}</td>
          <td>${escapeHtml(row.teamCode || "-")}</td>
          <td>${escapeHtml(row.points ?? "-")}</td>
        </tr>
      `,
    )
    .join("");
}

function renderCalendar(calendarResponse) {
  const response = calendarResponse.response || {};
  const races = response.races || [];
  elements.calendarCount.textContent = `${response.totalRaces || races.length}`;

  if (!races.length) {
    elements.calendarGrid.innerHTML =
      '<div class="placeholder-card">No races loaded for this season.</div>';
    return;
  }

  const now = Date.now();
  elements.calendarGrid.innerHTML = races
    .map((race) => {
      const start = new Date(race.startDatetime).getTime();
      const end = new Date(race.endDatetime).getTime();
      const active = now >= start && now <= end;
      const flag = getFlagMarkup(race.country, race.country);
      return `
        <article class="calendar-card inspectable ${active ? "active-weekend" : ""}" data-inspect-type="race" data-race-id="${race.id}">
          <span class="subtext">Round ${escapeHtml(race.roundNumber)}</span>
          <h3>${escapeHtml(race.grandPrix)}</h3>
          <div class="subtext inline-flag">${flag}<span>${escapeHtml(
            race.location,
          )}, ${escapeHtml(race.country)}</span></div>
          <div class="subtext">${escapeHtml(formatDateTime(race.startDatetime))}</div>
          <div class="subtext">${escapeHtml(
            race.isSprintWeekend ? "Sprint weekend" : "Grand prix weekend",
          )}</div>
        </article>
      `;
    })
    .join("");
}

function showDriverInspector(driverNumberRaw, driverCodeRaw = "") {
  const driverNumber = Number(driverNumberRaw);
  const current = appState.responses.current?.response || {};
  let liveDriver =
    (current.drivers || []).find((item) => item.driver_number === driverNumber) || null;
  const seasonDriver =
    appState.lookups.seasonDrivers.get(driverNumber) ||
    appState.lookups.seasonDriversByCode.get(driverCodeRaw) ||
    (appState.responses.drivers?.response?.drivers || []).find(
      (item) => item.driverNumber === driverNumber,
    );

  if (!liveDriver && driverCodeRaw) {
    liveDriver =
      (current.drivers || []).find((item) => item.name_acronym === driverCodeRaw) ||
      null;
  }

  if (!liveDriver && !seasonDriver) {
    setInspector(
      "Driver details unavailable",
      `Driver #${driverNumberRaw}`,
      '<div class="placeholder-card">This driver is not present in the currently loaded data.</div>',
    );
    return;
  }

  const presentation = getDriverPresentation(
    liveDriver || {},
    seasonDriver,
    appState.lookups.teamLookup,
  );
  const livePosition = (current.positions || []).find(
    (item) => item.driver_number === driverNumber,
  );
  const interval = (current.intervals || []).find(
    (item) => item.driver_number === driverNumber,
  );
  const standings =
    (appState.responses.driverStandings?.response?.standings || []).find(
      (item) =>
        item.driverNumber === driverNumber ||
        item.driverCode === presentation.code ||
        item.driverName === presentation.name,
    ) || {};
  const image = presentation.image
    ? `<img class="inspector-avatar" src="${presentation.image}" alt="${escapeHtml(presentation.name)}" />`
    : `<div class="inspector-avatar fallback-avatar" style="background:${presentation.gradient}">${escapeHtml(
        presentation.code,
      )}</div>`;
  const flag = getFlagMarkup(
    presentation.nationality,
    presentation.nationality || presentation.name,
  );

  setInspector(
    presentation.name,
    `${presentation.teamName} • #${presentation.number}`,
    `
      <div class="inspector-profile">
        ${image}
        <div class="inspector-copy">
          <h3>${escapeHtml(presentation.name)}</h3>
          <p class="inline-flag">${flag}<span>${escapeHtml(
            presentation.nationality || "Race Center driver detail",
          )}</span></p>
        </div>
      </div>
      ${renderInspectorFacts([
        ["Driver Code", presentation.code],
        ["Car Number", presentation.number],
        ["Team", presentation.teamName],
        ["Live Position", livePosition?.position ?? "-"],
        ["Gap", interval?.gap_to_leader ?? interval?.interval ?? "-"],
        ["Season Points", standings.points ?? "-"],
        ["First Name", seasonDriver?.firstName || liveDriver?.first_name || "-"],
        ["Last Name", seasonDriver?.lastName || liveDriver?.last_name || "-"],
      ])}
    `,
  );
}

function showTeamInspector(teamNameRaw) {
  const teamName = teamNameRaw || "";
  const team =
    appState.lookups.teamLookup.get(normalizeTeamName(teamName)) ||
    (appState.responses.teams?.response || []).find((item) => item.name === teamName);
  const liveDrivers = (appState.responses.current?.response?.drivers || []).filter(
    (item) => normalizeTeamName(item.team_name) === normalizeTeamName(teamName),
  );
  const teamStanding =
    (appState.responses.teamStandings?.response?.standings || []).find(
      (item) =>
        normalizeTeamName(item.constructorName) === normalizeTeamName(teamName),
    ) || {};
  const gradient =
    team?.gradientStart && team?.gradientEnd
      ? `linear-gradient(135deg, ${team.gradientStart}, ${team.gradientEnd})`
      : getTeamTheme(appState.lookups.teamLookup, teamName, "#24344e").gradient;
  const logo = team?.image
    ? `<img class="inspector-avatar" src="${team.image}" alt="${escapeHtml(team.name)}" />`
    : `<div class="inspector-avatar fallback-avatar" style="background:${gradient}">${escapeHtml(
        team?.teamCode || "TM",
      )}</div>`;

  setInspector(
    team?.name || teamName || "Team Details",
    "Constructor view",
    `
      <div class="inspector-profile">
        ${logo}
        <div class="inspector-copy">
          <h3>${escapeHtml(team?.name || teamName || "Unknown Team")}</h3>
          <p>${escapeHtml(team?.teamCode || "No team code")} • ${liveDrivers.length} live drivers loaded</p>
        </div>
      </div>
      ${renderInspectorFacts([
        ["Constructor Position", teamStanding.position ?? "-"],
        ["Constructor Points", teamStanding.points ?? "-"],
        ["Primary Color", team?.primaryColor || "-"],
        ["Secondary Color", team?.secondaryColor || "-"],
        ["Gradient Start", team?.gradientStart || "-"],
        ["Gradient End", team?.gradientEnd || "-"],
      ])}
    `,
  );
}

function showRaceInspector(raceId) {
  const race =
    (appState.responses.races?.response?.races || []).find((item) => item.id === raceId) ||
    (appState.responses.calendar?.response?.races || []).find(
      (item) => item.id === raceId,
    );
  if (!race) {
    return;
  }

  setInspector(
    race.grandPrix,
    `Round ${race.roundNumber} • ${race.country}`,
    renderInspectorFacts([
      ["Location", race.location],
      ["Status", race.status || "-"],
      ["Sprint Weekend", race.isSprintWeekend ? "Yes" : "No"],
      ["Race Distance", race.raceDistanceKm ? `${race.raceDistanceKm} km` : "-"],
      ["Race Laps", race.numLapsRace ?? "-"],
      ["Sprint Laps", race.numLapsSprint ?? "-"],
      ["Circuit", race.circuit?.circuitName || "-"],
      ["Start", formatDateTime(race.startDatetime)],
    ]),
  );
}

function showCircuitInspector(circuitId) {
  const circuit = (appState.responses.circuits?.response?.circuits || []).find(
    (item) => item.id === circuitId,
  );
  if (!circuit) {
    return;
  }

  const art =
    circuit.twoDImageUrl || circuit.threeDColorImageUrl || circuit.threeDPlaneImageUrl;
  const image = art
    ? `<img class="inspector-avatar" src="${art}" alt="${escapeHtml(circuit.circuitName)}" />`
    : `<div class="inspector-avatar fallback-avatar">TRK</div>`;

  setInspector(
    circuit.circuitName,
    `${circuit.city || "-"}, ${circuit.country || "-"}`,
    `
      <div class="inspector-profile">
        ${image}
        <div class="inspector-copy">
          <h3>${escapeHtml(circuit.circuitName)}</h3>
          <p>${escapeHtml(circuit.localTimezone || "Timezone unavailable")}</p>
        </div>
      </div>
      ${renderInspectorFacts([
        ["Length", circuit.lengthKm ? `${circuit.lengthKm} km` : "-"],
        ["Miles", circuit.lengthMiles ?? "-"],
        ["Corners", circuit.numberOfCorners ?? "-"],
        ["First Grand Prix", circuit.firstGrandPrixYear ?? "-"],
        ["Lap Record", circuit.lapRecord || "-"],
        ["City", circuit.city || "-"],
        ["Country", circuit.country || "-"],
      ])}
    `,
  );
}

async function loginUser() {
  const settings = readSettings();
  const password = elements.loginPassword.value;

  if (!settings.loginIdentifier || !password) {
    applyAuthFeedback(
      "Login identifier and password are required to open the Race Center.",
      "error",
    );
    return;
  }

  try {
    const payload = await apiRequest("/api/v1/users/login", {
      method: "POST",
      includeAuth: false,
      body: {
        loginIdentifier: settings.loginIdentifier,
        password,
      },
    });
    const accessToken = payload?.response?.accessToken;
    const refreshToken = payload?.response?.refreshToken;
    if (!accessToken) {
      throw new Error("Login succeeded but no access token was returned.");
    }
    persistTokens(accessToken, refreshToken);
    elements.loginPassword.value = "";
    persistSettings();
    applyAuthFeedback("Signed in successfully. Loading your Race Center...", "success");
    await loadDashboard();
  } catch (error) {
    applyAuthFeedback(error.message, "error");
  }
}

async function loadDashboard() {
  const settings = readSettings();
  if (!settings.accessToken) {
    showAuthView();
    applyAuthFeedback("Sign in to load the Race Center.", "error");
    return;
  }

  showDashboard();
  persistSettings();
  setLoadingState();

  try {
    const requests = [
      ["current", apiRequest("/api/v1/race-center/current")],
      [
        "drivers",
        apiRequest("/api/v1/race-center/drivers", { query: { season: settings.season } }),
      ],
      ["teams", apiRequest("/api/v1/race-center/teams", { query: { season: settings.season } })],
      [
        "calendar",
        apiRequest("/api/v1/race-center/calendar", { query: { season: settings.season } }),
      ],
      ["races", apiRequest("/api/v1/race-center/races", { query: { season: settings.season } })],
      ["circuits", apiRequest("/api/v1/race-center/circuits")],
      [
        "driverStandings",
        apiRequest("/api/v1/race-center/standings/drivers", {
          query: { season: settings.season },
        }),
      ],
      [
        "teamStandings",
        apiRequest("/api/v1/race-center/standings/constructors", {
          query: { season: settings.season },
        }),
      ],
    ];

    const settled = await Promise.allSettled(requests.map(([, request]) => request));
    const responses = {};
    const failures = [];

    for (const [index, result] of settled.entries()) {
      const [name] = requests[index];
      if (result.status === "fulfilled") {
        responses[name] = result.value;
      } else {
        failures.push(`${name}: ${result.reason?.message || "Unknown error"}`);
      }
    }

    const seasonDriverList = responses.drivers?.response?.drivers || [];
    const seasonDrivers = buildSeasonDriverLookup(seasonDriverList);
    const seasonDriversByCode = buildSeasonDriverCodeLookup(seasonDriverList);
    const teamLookup = buildTeamLookup(responses.teams?.response || []);
    const lookups = { seasonDrivers, seasonDriversByCode, teamLookup };
    appState.responses = responses;
    appState.lookups = lookups;
    populateFilters();

    const renderErrors = [
      responses.current && safeRender(renderCurrent, responses.current, lookups),
      responses.drivers && safeRender(renderDrivers, responses.drivers, teamLookup),
      responses.teams && safeRender(renderTeams, responses.teams),
      responses.races && safeRender(renderRaceWeekends, responses.races),
      responses.circuits && safeRender(renderCircuits, responses.circuits, responses.current),
      responses.driverStandings &&
        safeRender(renderDriverStandings, responses.driverStandings),
      responses.teamStandings && safeRender(renderTeamStandings, responses.teamStandings),
      responses.calendar && safeRender(renderCalendar, responses.calendar),
    ].filter(Boolean);

    if (failures.length || renderErrors.length) {
      applyFeedback(
        `Loaded with partial data. ${[
          ...failures,
          ...renderErrors.map((error) => `render: ${error.message}`),
        ].join(" | ")}`,
        "error",
      );
    } else {
      applyFeedback("Race Center data loaded successfully.", "success");
    }
  } catch (error) {
    applyFeedback(error.message, "error");
  } finally {
    clearLoadingState();
  }
}

function configurePolling() {
  if (currentPollHandle) {
    clearInterval(currentPollHandle);
    currentPollHandle = null;
  }

  if (!elements.autoRefresh.checked) {
    elements.statusRefresh.textContent = "Manual";
    return;
  }

  elements.statusRefresh.textContent = "Every 15s";
  currentPollHandle = setInterval(() => {
    loadDashboard().catch((error) => applyFeedback(error.message, "error"));
  }, pollIntervalMs);
}

elements.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginUser().catch((error) => applyAuthFeedback(error.message, "error"));
});

elements.logoutButton.addEventListener("click", () => {
  clearTokens();
  applyAuthFeedback("You have been signed out.", "success");
});

elements.loadButton.addEventListener("click", () => {
  loadDashboard().catch((error) => applyFeedback(error.message, "error"));
});

elements.autoRefresh.addEventListener("change", () => {
  persistSettings();
  configurePolling();
});

elements.seasonToolbar.addEventListener("change", () => {
  setSeasonValue(elements.seasonToolbar.value);
  persistSettings();
  if (elements.accessToken.value.trim()) {
    loadDashboard().catch((error) => applyFeedback(error.message, "error"));
  }
});

elements.tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.tabTarget);
  });
});

elements.driverFilter.addEventListener("change", () => {
  appState.filters.driverNumber = elements.driverFilter.value;
  syncFilterControls();
  loadDashboard().catch((error) => applyFeedback(error.message, "error"));
});

elements.teamFilter.addEventListener("change", () => {
  appState.filters.teamName = elements.teamFilter.value;
  syncFilterControls();
  loadDashboard().catch((error) => applyFeedback(error.message, "error"));
});

elements.resetFiltersButton.addEventListener("click", () => {
  appState.filters.driverNumber = "";
  appState.filters.teamName = "";
  syncFilterControls();
  loadDashboard().catch((error) => applyFeedback(error.message, "error"));
});

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-inspect-type]");
  if (!target) {
    return;
  }

  const type = target.dataset.inspectType;
  if (type === "driver") {
    showDriverInspector(target.dataset.driverNumber, target.dataset.driverCode || "");
  } else if (type === "team") {
    showTeamInspector(target.dataset.teamName);
  } else if (type === "race") {
    showRaceInspector(target.dataset.raceId);
  } else if (type === "circuit") {
    showCircuitInspector(target.dataset.circuitId);
  }
});

loadDefaults();
configurePolling();

async function bootstrapSession() {
  if (elements.accessToken.value.trim()) {
    await loadDashboard();
    return;
  }

  if (getStoredRefreshToken()) {
    try {
      await refreshAccessToken();
      await loadDashboard();
      return;
    } catch (error) {
      clearTokens();
      applyAuthFeedback("Your saved session expired. Please sign in again.", "error");
    }
  }
}

bootstrapSession().catch((error) => applyFeedback(error.message, "error"));
