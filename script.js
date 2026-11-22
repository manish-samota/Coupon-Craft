/*
 * ===================================================================
 * Project: CouponCraft — Digital Coupons & Discount Code Aggregator
 * Group: CodeCrafters
 * Members:
 *   - Kunal Singh Sengar — Leader / CSS part
 *   - Harleen Kaur — Developer / HTML part / UI
 *   - Manish Samota — Developer / JS part
 * File: js/script.js
 * Description: Unified client-side logic for Authentication,
 *              Deals Catalog, Wallet Drawer, Checkout Simulator,
 *              Admin CRUD, Theme Management, and Single-Page Navigation.
 * ===================================================================
 */

// -------------------------------------------------------------
// 1. Initial Sample Seed Data
// -------------------------------------------------------------
const DEFAULT_COUPONS = [
  {
    id: "coup-1",
    code: "NIKEJUSTDOIT25",
    title: "25% Off Storewide on Running & Gym Shoes",
    description: "Get 25% off official footwear and apparel when you spend $75 or more.",
    storeName: "Nike",
    storeId: "nike",
    category: "fashion",
    discountType: "percentage",
    discountValue: 25,
    minSpend: 75,
    expiryDate: "2026-12-31",
    verified: true,
    upvotes: 145,
    downvotes: 6,
    usesCount: 1820,
    terms: "Valid on select styles only. Excludes SNKRS special releases."
  },
  {
    id: "coup-2",
    code: "APPLESTUDENT100",
    title: "$100 Off MacBook Air & Pro for Education",
    description: "Save $100 on eligible MacBook models with student or faculty ID.",
    storeName: "Apple",
    storeId: "apple",
    category: "tech",
    discountType: "flat",
    discountValue: 100,
    minSpend: 899,
    expiryDate: "2026-12-15",
    verified: true,
    upvotes: 312,
    downvotes: 10,
    usesCount: 4120,
    terms: "Requires educational verification. Limit one redemption per student ID."
  },
  {
    id: "coup-3",
    code: "PIZZAFEAST50",
    title: "Flat 50% Off Any Large Specialty Pizza",
    description: "Enjoy 50% off all gourmet pizzas on orders above $20.",
    storeName: "Domino's Pizza",
    storeId: "dominos",
    category: "food",
    discountType: "percentage",
    discountValue: 50,
    minSpend: 20,
    expiryDate: "2026-11-30",
    verified: true,
    upvotes: 540,
    downvotes: 18,
    usesCount: 8400,
    terms: "Valid Monday through Thursday on carryout or delivery orders."
  },
  {
    id: "coup-4",
    code: "STEAMAUTUMN30",
    title: "$30 Off AAA Games & Seasonal Bundles",
    description: "Level up your gaming library with $30 off orders over $80.",
    storeName: "Steam Games",
    storeId: "steam",
    category: "gaming",
    discountType: "flat",
    discountValue: 30,
    minSpend: 80,
    expiryDate: "2026-12-25",
    verified: true,
    upvotes: 98,
    downvotes: 3,
    usesCount: 1250,
    terms: "Valid on digital store purchases made through Steam Wallet."
  },
  {
    id: "coup-5",
    code: "COURSERAPLUS40",
    title: "40% Off Annual Coursera Plus Subscription",
    description: "Unlimited access to 7,000+ top courses, specializations, and degrees.",
    storeName: "Coursera Plus",
    storeId: "coursera",
    category: "software",
    discountType: "percentage",
    discountValue: 40,
    minSpend: 200,
    expiryDate: "2026-12-20",
    verified: true,
    upvotes: 210,
    downvotes: 5,
    usesCount: 3100,
    terms: "Valid for new subscribers only. Cannot be combined with financial aid."
  },
  {
    id: "coup-6",
    code: "AIRBNBWANDER50",
    title: "$50 Off Weekend Mountain & Beach Getaways",
    description: "Book your holiday getaway with $50 off your first stay of 2+ nights.",
    storeName: "Airbnb",
    storeId: "airbnb",
    category: "travel",
    discountType: "flat",
    discountValue: 50,
    minSpend: 150,
    expiryDate: "2027-01-15",
    verified: true,
    upvotes: 180,
    downvotes: 12,
    usesCount: 2200,
    terms: "Valid for new accounts. Host cleaning fees and local taxes still apply."
  },
  {
    id: "coup-7",
    code: "AMZFREESHIP",
    title: "Free Express Shipping on Orders Over $35",
    description: "Fast doorstep delivery on qualifying tech and lifestyle goods.",
    storeName: "Amazon",
    storeId: "amazon",
    category: "tech",
    discountType: "shipping",
    discountValue: 15,
    minSpend: 35,
    expiryDate: "2026-12-31",
    verified: true,
    upvotes: 820,
    downvotes: 30,
    usesCount: 15200,
    terms: "Applies to items fulfilled by Amazon. Heavy items excluded."
  },
  {
    id: "coup-8",
    code: "SPOTIFYPREM3M",
    title: "3 Months Free Spotify Premium Individual",
    description: "Enjoy ad-free music, offline listening, and unlimited song skips.",
    storeName: "Spotify",
    storeId: "spotify",
    category: "software",
    discountType: "percentage",
    discountValue: 100,
    minSpend: 0,
    expiryDate: "2026-11-28",
    verified: false,
    upvotes: 75,
    downvotes: 20,
    usesCount: 890,
    terms: "Offer valid only for users who haven't tried Spotify Premium before."
  }
];

const SAMPLE_PRODUCTS = [
  { id: "p1", name: "Nike Pegasus 41 Running Shoes", storeId: "nike", storeName: "Nike", price: 130.00 },
  { id: "p2", name: "Apple AirPods Pro (2nd Gen)", storeId: "apple", storeName: "Apple", price: 249.00 },
  { id: "p3", name: "Domino's Family Pizza Feast", storeId: "dominos", storeName: "Domino's Pizza", price: 42.50 },
  { id: "p4", name: "Steam AAA Deluxe Game Pass", storeId: "steam", storeName: "Steam Games", price: 89.99 },
  { id: "p5", name: "Coursera Plus Annual Pass", storeId: "coursera", storeName: "Coursera Plus", price: 399.00 },
  { id: "p6", name: "Apple MacBook Air 13\" M3", storeId: "apple", storeName: "Apple", price: 1099.00 }
];

const DEFAULT_USERS = [
  { id: "u-admin", name: "Kunal Singh Sengar (Leader/CSS)", email: "admin@codecrafters.com", password: "password123", role: "admin" },
  { id: "u-harleen", name: "Harleen Kaur (HTML/UI)", email: "harleen@codecrafters.com", password: "password123", role: "user" },
  { id: "u-manish", name: "Manish Samota (JS)", email: "user@codecrafters.com", password: "password123", role: "user" }
];

// -------------------------------------------------------------
// 2. Shared State Variables
// -------------------------------------------------------------
let coupons = [];
let users = [];
let currentUser = null;
let wallet = [];
let cart = [];
let appliedCoupon = null;

// Filter & Sort State
let currentCategory = "all";
let searchQuery = "";
let storeFilter = "all";
let discountTypeFilter = "all";
let sortBy = "popular";
let verifiedOnlyFilter = false;
let editingCouponId = null;

// -------------------------------------------------------------
// 3. LocalStorage Persistence
// -------------------------------------------------------------
function loadAppData() {
  const storedCoupons = localStorage.getItem("codecrafters_coupons");
  coupons = storedCoupons ? JSON.parse(storedCoupons) : DEFAULT_COUPONS;

  const storedUsers = localStorage.getItem("codecrafters_users");
  users = storedUsers ? JSON.parse(storedUsers) : DEFAULT_USERS;

  const storedSession = localStorage.getItem("codecrafters_session");
  currentUser = storedSession ? JSON.parse(storedSession) : null;

  const storedWallet = localStorage.getItem("codecrafters_wallet");
  wallet = storedWallet ? JSON.parse(storedWallet) : ["coup-1", "coup-3"];

  const storedCart = localStorage.getItem("codecrafters_cart");
  cart = storedCart ? JSON.parse(storedCart) : [{ ...SAMPLE_PRODUCTS[0], quantity: 1 }];
}

function saveCouponsData() {
  localStorage.setItem("codecrafters_coupons", JSON.stringify(coupons));
}

function saveUserData() {
  localStorage.setItem("codecrafters_users", JSON.stringify(users));
}

function saveWalletData() {
  localStorage.setItem("codecrafters_wallet", JSON.stringify(wallet));
}

function saveCartData() {
  localStorage.setItem("codecrafters_cart", JSON.stringify(cart));
}

function saveSessionData() {
  if (currentUser) {
    localStorage.setItem("codecrafters_session", JSON.stringify(currentUser));
  } else {
    localStorage.removeItem("codecrafters_session");
  }
}

// -------------------------------------------------------------
// 4. View Switching & Navigation Engine (SPA)
// -------------------------------------------------------------
function switchView(viewName) {
  // If user is not logged in, enforce login view
  if (!currentUser && viewName !== "login") {
    viewName = "login";
  }

  const viewLogin = document.getElementById("view-login");
  const viewDeals = document.getElementById("view-deals");
  const viewCheckout = document.getElementById("view-checkout");
  const viewAdmin = document.getElementById("view-admin");

  if (viewLogin) viewLogin.style.display = viewName === "login" ? "flex" : "none";
  if (viewDeals) viewDeals.style.display = viewName === "deals" ? "block" : "none";
  if (viewCheckout) viewCheckout.style.display = viewName === "checkout" ? "block" : "none";
  if (viewAdmin) viewAdmin.style.display = viewName === "admin" ? "block" : "none";

  // Navigation menu & wallet button visibility
  const navMenu = document.getElementById("nav-main-menu");
  const walletBtn = document.getElementById("btn-open-wallet");

  if (viewName === "login") {
    if (navMenu) navMenu.style.display = "none";
    if (walletBtn) walletBtn.style.display = "none";
  } else {
    if (navMenu) navMenu.style.display = "flex";
    if (walletBtn) walletBtn.style.display = "inline-flex";
  }

  // Update active state on nav buttons
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  // Re-render specific active view
  if (viewName === "deals") {
    renderCategories();
    renderCoupons();
  } else if (viewName === "checkout") {
    renderCart();
  } else if (viewName === "admin") {
    renderAdminView();
  } else if (viewName === "login") {
    initLoginView();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// -------------------------------------------------------------
// 5. Authentication & Login View Handlers
// -------------------------------------------------------------
function initLoginView() {
  const loggedInCard = document.getElementById("logged-in-card");
  const authFormsWrapper = document.getElementById("auth-forms-wrapper");
  const activeUserTitle = document.getElementById("active-user-title");
  const activeUserRole = document.getElementById("active-user-role");

  if (currentUser) {
    if (loggedInCard) loggedInCard.style.display = "block";
    if (authFormsWrapper) authFormsWrapper.style.display = "none";
    if (activeUserTitle) activeUserTitle.textContent = currentUser.name;
    if (activeUserRole) activeUserRole.textContent = currentUser.role.toUpperCase();
  } else {
    if (loggedInCard) loggedInCard.style.display = "none";
    if (authFormsWrapper) authFormsWrapper.style.display = "block";
  }
}

function loginQuick(email, pass) {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass);
  if (user) {
    currentUser = user;
    saveSessionData();
    updateUserNavbar();
    showToast(`Signed in as ${user.name} (${user.role.toUpperCase()})!`);
    switchView(user.role === "admin" ? "admin" : "deals");
  }
}

function logoutUser() {
  currentUser = null;
  saveSessionData();
  updateUserNavbar();
  showToast("Logged out successfully.");
  switchView("login");
}

function updateUserNavbar() {
  const userArea = document.getElementById("nav-user-area");
  const adminNavBtn = document.getElementById("btn-nav-admin");
  const nameEl = document.getElementById("user-display-name");
  const rolePill = document.getElementById("user-display-role");

  if (currentUser) {
    if (userArea) userArea.style.display = "flex";
    if (nameEl) nameEl.textContent = currentUser.name.split(" ")[0];
    if (rolePill) {
      rolePill.textContent = currentUser.role.toUpperCase();
      rolePill.className = `role-pill ${currentUser.role === 'admin' ? 'role-admin' : 'role-user'}`;
    }
    if (adminNavBtn) {
      adminNavBtn.style.display = currentUser.role === "admin" ? "inline-flex" : "none";
    }
  } else {
    if (userArea) userArea.style.display = "none";
    if (adminNavBtn) adminNavBtn.style.display = "none";
  }
}

function setupAuthForms() {
  // Tab switching on login view
  const tabLogin = document.getElementById("tab-page-login");
  const tabReg = document.getElementById("tab-page-register");
  const formLogin = document.getElementById("page-form-login");
  const formReg = document.getElementById("page-form-register");

  if (tabLogin && tabReg && formLogin && formReg) {
    tabLogin.onclick = () => {
      tabLogin.classList.add("active");
      tabReg.classList.remove("active");
      formLogin.style.display = "block";
      formReg.style.display = "none";
    };

    tabReg.onclick = () => {
      tabReg.classList.add("active");
      tabLogin.classList.remove("active");
      formLogin.style.display = "none";
      formReg.style.display = "block";
    };
  }

  // Quick Evaluator Demo buttons
  const quickAdmin = document.getElementById("btn-page-quick-admin");
  if (quickAdmin) {
    quickAdmin.onclick = () => loginQuick("admin@codecrafters.com", "password123");
  }

  const quickUser = document.getElementById("btn-page-quick-user");
  if (quickUser) {
    quickUser.onclick = () => loginQuick("user@codecrafters.com", "password123");
  }

  // Login form submit
  if (formLogin) {
    formLogin.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById("page-login-email").value.trim().toLowerCase();
      const pass = document.getElementById("page-login-password").value;

      const user = users.find(u => u.email.toLowerCase() === email);
      if (!user) {
        alert("No account found with this email.");
        return;
      }
      if (user.password !== pass) {
        alert("Incorrect password.");
        return;
      }

      currentUser = user;
      saveSessionData();
      updateUserNavbar();
      showToast(`Welcome back, ${user.name}!`);
      switchView(user.role === "admin" ? "admin" : "deals");
    };
  }

  // Register form submit
  if (formReg) {
    formReg.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("page-reg-name").value.trim();
      const email = document.getElementById("page-reg-email").value.trim().toLowerCase();
      const password = document.getElementById("page-reg-password").value;
      const confirmPass = document.getElementById("page-reg-confirm").value;

      if (password !== confirmPass) {
        alert("Passwords do not match.");
        return;
      }

      if (users.find(u => u.email.toLowerCase() === email)) {
        alert("An account with this email already exists.");
        return;
      }

      const newUser = {
        id: "u-" + Date.now(),
        name,
        email,
        password,
        role: "user"
      };

      users.push(newUser);
      saveUserData();
      currentUser = newUser;
      saveSessionData();
      updateUserNavbar();
      showToast(`Account created! Welcome, ${newUser.name}!`);
      switchView("deals");
    };
  }

  // Continue to App if already signed in
  const continueBtn = document.getElementById("btn-continue-app");
  if (continueBtn) {
    continueBtn.onclick = () => {
      switchView(currentUser && currentUser.role === "admin" ? "admin" : "deals");
    };
  }

  const switchBtn = document.getElementById("btn-switch-account");
  if (switchBtn) {
    switchBtn.onclick = () => {
      logoutUser();
    };
  }
}

// -------------------------------------------------------------
// 6. Deals Catalog, Search & Community Voting
// -------------------------------------------------------------
function renderCategories() {
  const cats = [
    { id: "all", name: "All Deals" },
    { id: "tech", name: "Tech & Gadgets" },
    { id: "fashion", name: "Fashion & Shoes" },
    { id: "food", name: "Food & Dining" },
    { id: "gaming", name: "Gaming" },
    { id: "software", name: "Software & SaaS" },
    { id: "travel", name: "Travel" }
  ];

  const catContainer = document.getElementById("category-bar");
  if (!catContainer) return;

  catContainer.innerHTML = cats.map(c => `
    <button class="cat-pill ${c.id === currentCategory ? 'active' : ''}" data-cat="${c.id}">
      ${c.name}
    </button>
  `).join("");

  catContainer.querySelectorAll(".cat-pill").forEach(btn => {
    btn.onclick = () => {
      currentCategory = btn.dataset.cat;
      renderCategories();
      renderCoupons();
    };
  });
}

function getFilteredCoupons() {
  return coupons.filter(c => {
    if (currentCategory !== "all" && c.category !== currentCategory) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = c.title.toLowerCase().includes(q) ||
                    c.storeName.toLowerCase().includes(q) ||
                    c.code.toLowerCase().includes(q) ||
                    c.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (storeFilter !== "all" && c.storeId !== storeFilter) return false;
    if (discountTypeFilter !== "all" && c.discountType !== discountTypeFilter) return false;
    if (verifiedOnlyFilter && !c.verified) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === "popular") return ((b.upvotes || 0) * 2 + (b.usesCount || 0)) - ((a.upvotes || 0) * 2 + (a.usesCount || 0));
    if (sortBy === "discount") return b.discountValue - a.discountValue;
    if (sortBy === "expiry") return new Date(a.expiryDate) - new Date(b.expiryDate);
    return 0;
  });
}

function renderCoupons() {
  const grid = document.getElementById("coupons-grid");
  if (!grid) return;

  const filtered = getFilteredCoupons();
  const counterEl = document.getElementById("active-coupons-count");
  if (counterEl) {
    counterEl.textContent = `${filtered.length} coupons available`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: var(--bg-card); border-radius: var(--radius); border: 1px dashed var(--border);">
        <h3>No coupons match your filter</h3>
        <p style="color: var(--muted-text); margin-top: 5px;">Try changing category or clearing your search term.</p>
        <button class="btn btn-primary" style="margin-top: 15px;" onclick="resetAllFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(c => {
    const isSaved = wallet.includes(c.id);
    const totalVotes = (c.upvotes || 0) + (c.downvotes || 0);
    const successRate = totalVotes > 0 ? Math.round(((c.upvotes || 0) / totalVotes) * 100) : 96;

    let discountBadgeText = `${c.discountValue}% OFF`;
    if (c.discountType === "flat") discountBadgeText = `$${c.discountValue} OFF`;
    if (c.discountType === "shipping") discountBadgeText = "FREE SHIPPING";

    return `
      <div class="card" data-id="${c.id}">
        <div>
          <div class="card-top">
            <span class="brand-label">
              ${c.storeName}
              ${c.verified ? '<span class="verified-tag">✓ Verified</span>' : ''}
            </span>
            <button class="clip-star-btn ${isSaved ? 'clipped' : ''}" onclick="toggleWalletCoupon('${c.id}')" title="Clip coupon to wallet">
              ${isSaved ? '★' : '☆'}
            </button>
          </div>

          <span class="discount-badge">${discountBadgeText}</span>
          <h3 class="deal-title">${c.title}</h3>
          <p class="deal-desc">${c.description}</p>
          <div class="deal-rules">
            <span>Min spend: $${c.minSpend}</span>
            <span>Expires: ${c.expiryDate}</span>
          </div>
        </div>

        <div class="card-bottom">
          <span class="success-percent">✓ ${successRate}% worked</span>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-secondary" style="padding: 6px 10px; font-size: 0.8rem;" onclick="openCouponDetails('${c.id}')">
              Details
            </button>
            <button class="btn-get-code" onclick="copyAndOpen('${c.id}')">
              ${c.code}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function resetAllFilters() {
  currentCategory = "all";
  searchQuery = "";
  storeFilter = "all";
  discountTypeFilter = "all";
  verifiedOnlyFilter = false;
  sortBy = "popular";

  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";

  const filterStore = document.getElementById("filter-store");
  if (filterStore) filterStore.value = "all";

  const filterDisc = document.getElementById("filter-discount");
  if (filterDisc) filterDisc.value = "all";

  const filterSort = document.getElementById("filter-sort");
  if (filterSort) filterSort.value = "popular";

  const filterVer = document.getElementById("filter-verified");
  if (filterVer) filterVer.checked = false;

  renderCategories();
  renderCoupons();
}

function copyAndOpen(id) {
  const coupon = coupons.find(c => c.id === id);
  if (coupon) {
    navigator.clipboard.writeText(coupon.code).catch(() => {});
    coupon.usesCount = (coupon.usesCount || 0) + 1;
    saveCouponsData();
    showToast(`Code "${coupon.code}" copied to clipboard!`);
    openCouponDetails(id);
  }
}

function openCouponDetails(id) {
  const c = coupons.find(item => item.id === id);
  if (!c) return;

  document.getElementById("detail-modal-store").textContent = c.storeName;
  document.getElementById("detail-modal-title").textContent = c.title;
  document.getElementById("detail-modal-desc").textContent = c.description;
  document.getElementById("detail-modal-code").textContent = c.code;
  document.getElementById("detail-modal-terms").textContent = c.terms || "Standard merchant terms and conditions apply.";
  document.getElementById("detail-modal-minspend").textContent = `$${c.minSpend}`;
  document.getElementById("detail-modal-expiry").textContent = c.expiryDate;

  // Copy button
  document.getElementById("btn-copy-modal-code").onclick = () => {
    navigator.clipboard.writeText(c.code).catch(() => {});
    showToast(`Copied code "${c.code}"!`);
  };

  // Test in checkout button -> switches view to checkout simulator
  document.getElementById("btn-test-in-checkout").onclick = () => {
    closeModal("modal-details");
    switchView("checkout");
    const codeInput = document.getElementById("checkout-code-input");
    if (codeInput) codeInput.value = c.code;
    applyDiscountCode(c.code);
  };

  // Community vote buttons
  document.getElementById("btn-vote-up").onclick = () => voteCoupon(c.id, true);
  document.getElementById("btn-vote-down").onclick = () => voteCoupon(c.id, false);

  updateVoteStats(c);
  openModal("modal-details");
}

function updateVoteStats(c) {
  const voteText = document.getElementById("vote-count-text");
  if (voteText) {
    voteText.textContent = `${c.upvotes || 0} worked • ${c.downvotes || 0} failed`;
  }
}

function voteCoupon(id, isUpvote) {
  const c = coupons.find(item => item.id === id);
  if (c) {
    if (isUpvote) c.upvotes = (c.upvotes || 0) + 1;
    else c.downvotes = (c.downvotes || 0) + 1;
    saveCouponsData();
    updateVoteStats(c);
    renderCoupons();
    showToast("Thank you for your community feedback!");
  }
}

// -------------------------------------------------------------
// 7. Wallet Management (Slide-Out Drawer)
// -------------------------------------------------------------
function toggleWalletCoupon(id) {
  const index = wallet.indexOf(id);
  if (index > -1) {
    wallet.splice(index, 1);
    showToast("Removed coupon from your wallet.");
  } else {
    wallet.push(id);
    showToast("Clipped to your Coupon Wallet!");
  }
  saveWalletData();
  updateWalletUI();
  renderCoupons();
}

function updateWalletUI() {
  const badge = document.getElementById("wallet-count-badge");
  if (badge) {
    badge.textContent = wallet.length;
    badge.style.display = wallet.length > 0 ? "inline-block" : "none";
  }

  const walletList = document.getElementById("wallet-items-list");
  if (!walletList) return;

  const clippedCoupons = wallet.map(id => coupons.find(c => c.id === id)).filter(Boolean);

  if (clippedCoupons.length === 0) {
    walletList.innerHTML = `
      <div style="text-align: center; color: var(--muted-text); padding: 30px 10px;">
        <p>Your wallet is empty.</p>
        <small>Click the star ☆ on any coupon to clip it here for quick use!</small>
      </div>
    `;
    return;
  }

  walletList.innerHTML = clippedCoupons.map(c => `
    <div class="wallet-item">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
        <strong style="color: var(--primary); font-size: 0.85rem;">${c.storeName}</strong>
        <button style="border: none; background: none; color: var(--accent-red); cursor: pointer;" onclick="toggleWalletCoupon('${c.id}')">✕</button>
      </div>
      <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 8px;">${c.title}</div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" onclick="copyCodeText('${c.code}')">Copy: ${c.code}</button>
        <button class="btn btn-primary" style="padding: 4px 8px; font-size: 0.75rem;" onclick="useWalletCouponInCheckout('${c.code}')">Apply in Cart</button>
      </div>
    </div>
  `).join("");
}

function copyCodeText(code) {
  navigator.clipboard.writeText(code).catch(() => {});
  showToast(`Copied code: ${code}`);
}

function useWalletCouponInCheckout(code) {
  closeWallet();
  switchView("checkout");
  const codeInput = document.getElementById("checkout-code-input");
  if (codeInput) codeInput.value = code;
  applyDiscountCode(code);
}

function openWallet() {
  const drawer = document.getElementById("wallet-drawer");
  const bg = document.getElementById("wallet-drawer-bg");
  if (drawer && bg) {
    drawer.classList.add("open");
    bg.classList.add("open");
  }
}

function closeWallet() {
  const drawer = document.getElementById("wallet-drawer");
  const bg = document.getElementById("wallet-drawer-bg");
  if (drawer && bg) {
    drawer.classList.remove("open");
    bg.classList.remove("open");
  }
}

// -------------------------------------------------------------
// 8. Checkout Simulator & Real-time Coupon Validation
// -------------------------------------------------------------
function setupCheckoutSimulator() {
  // Quick Add Sample Products Shelf
  const quickBox = document.getElementById("quick-products-row");
  if (quickBox) {
    quickBox.innerHTML = SAMPLE_PRODUCTS.map(p => `
      <button class="btn-add-prod" onclick="addProductToCart('${p.id}')">
        <strong>+ ${p.name.split(' ')[0]}</strong><br/>
        <small style="color:var(--primary); font-weight:700;">$${p.price.toFixed(2)}</small>
      </button>
    `).join("");
  }

  // Apply Coupon Button
  const applyBtn = document.getElementById("btn-apply-coupon");
  if (applyBtn) {
    applyBtn.onclick = () => {
      const code = document.getElementById("checkout-code-input").value.trim();
      applyDiscountCode(code);
    };
  }

  // Allow Enter key in coupon input
  const codeInput = document.getElementById("checkout-code-input");
  if (codeInput) {
    codeInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyDiscountCode(codeInput.value.trim());
      }
    });
  }

  // Place Order Button
  const orderBtn = document.getElementById("btn-place-order");
  if (orderBtn) {
    orderBtn.onclick = simulateCheckoutOrder;
  }
}

function addProductToCart(productId) {
  const prod = SAMPLE_PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const existing = cart.find(i => i.id === prod.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...prod, quantity: 1 });
  }

  saveCartData();
  showToast(`Added ${prod.name} to cart!`);
  renderCart();
}

function changeQuantity(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCartData();
  renderCart();
}

function removeCartItem(index) {
  if (!cart[index]) return;
  cart.splice(index, 1);
  saveCartData();
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cart-items-container");
  if (!cartList) return;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    cartList.innerHTML = `<p style="color: var(--muted-text); padding: 15px 0;">Your cart is empty. Click "+ Quick Add" below to add test products.</p>`;
  } else {
    cartList.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <small>${item.storeName} • $${item.price.toFixed(2)} each</small>
        </div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="changeQuantity(${idx}, -1)">-</button>
          <span style="font-weight: 700;">${item.quantity}</span>
          <button class="qty-btn" onclick="changeQuantity(${idx}, 1)">+</button>
          <span class="cart-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="btn-remove-item" onclick="removeCartItem(${idx})" title="Remove item">✕</button>
        </div>
      </div>
    `).join("");
  }

  // Calculate discount & totals
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = (subtotal * appliedCoupon.discountValue) / 100;
    } else if (appliedCoupon.discountType === "flat") {
      discountAmount = Math.min(subtotal, appliedCoupon.discountValue);
    } else if (appliedCoupon.discountType === "shipping") {
      discountAmount = 15.00;
    }
  }

  const tax = Math.max(0, (subtotal - discountAmount) * 0.08); // 8% tax
  const finalTotal = Math.max(0, subtotal - discountAmount + tax);

  const subtotalEl = document.getElementById("sum-subtotal");
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  const discountEl = document.getElementById("sum-discount");
  if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)}`;

  const taxEl = document.getElementById("sum-tax");
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;

  const totalEl = document.getElementById("sum-total");
  if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;

  const discountRow = document.getElementById("row-discount");
  if (discountRow) {
    discountRow.style.display = discountAmount > 0 ? "flex" : "none";
  }

  const banner = document.getElementById("checkout-coupon-alert");
  if (banner) {
    if (appliedCoupon) {
      banner.className = "alert-message alert-success";
      banner.style.display = "flex";
      banner.innerHTML = `✓ Applied <strong>${appliedCoupon.code}</strong>: Saving $${discountAmount.toFixed(2)}! <button style="margin-left:auto; border:none; background:none; cursor:pointer; color:var(--dark-text); font-weight:700;" onclick="removeAppliedCoupon()">Remove</button>`;
    } else {
      banner.style.display = "none";
    }
  }
}

function applyDiscountCode(code) {
  if (!code) {
    showCheckoutAlert("Please enter a coupon code.", "error");
    return;
  }

  const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
  if (!coupon) {
    showCheckoutAlert(`Invalid promo code: "${code}".`, "error");
    return;
  }

  // Expiration check
  if (new Date(coupon.expiryDate) < new Date()) {
    showCheckoutAlert(`Promo code "${coupon.code}" has expired on ${coupon.expiryDate}.`, "error");
    return;
  }

  // Minimum spend check
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (subtotal < coupon.minSpend) {
    showCheckoutAlert(`Min spend of $${coupon.minSpend} required. Current cart: $${subtotal.toFixed(2)}.`, "error");
    return;
  }

  // Store match check
  const cartStores = [...new Set(cart.map(i => i.storeId))];
  if (coupon.storeId && cartStores.length > 0 && !cartStores.includes(coupon.storeId)) {
    showCheckoutAlert(`This code is exclusive to ${coupon.storeName} products.`, "error");
    return;
  }

  appliedCoupon = coupon;
  showToast(`Coupon "${coupon.code}" applied!`);
  renderCart();
}

function removeAppliedCoupon() {
  appliedCoupon = null;
  renderCart();
  showToast("Coupon removed.");
}

function showCheckoutAlert(msg, type) {
  const alertEl = document.getElementById("checkout-coupon-alert");
  if (alertEl) {
    alertEl.className = `alert-message alert-${type}`;
    alertEl.style.display = "flex";
    alertEl.innerHTML = msg;
  }
}

function simulateCheckoutOrder() {
  if (cart.length === 0) {
    alert("Please add at least one item to your cart.");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.discountType === "percentage" ? (subtotal * appliedCoupon.discountValue) / 100 : appliedCoupon.discountValue;
  }
  const tax = (subtotal - discount) * 0.08;
  const total = Math.max(0, subtotal - discount + tax);

  alert(`🎉 Order Confirmed!
Order ID: ORD-${Math.floor(100000 + Math.random() * 900000)}
Subtotal: $${subtotal.toFixed(2)}
Discount Applied: -$${discount.toFixed(2)}
Final Paid: $${total.toFixed(2)}

Thank you for testing the CodeCrafters Checkout Simulator!`);

  cart = [{ ...SAMPLE_PRODUCTS[0], quantity: 1 }];
  saveCartData();
  appliedCoupon = null;
  const codeInput = document.getElementById("checkout-code-input");
  if (codeInput) codeInput.value = "";
  renderCart();
}

// -------------------------------------------------------------
// 9. Admin Portal & CRUD Operations
// -------------------------------------------------------------
function setupAdmin() {
  const addBtn = document.getElementById("btn-admin-add-coupon");
  if (addBtn) addBtn.onclick = () => openCouponModal();

  const resetBtn = document.getElementById("btn-reset-demo-data");
  if (resetBtn) resetBtn.onclick = resetDemoData;

  const form = document.getElementById("form-admin-coupon");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      saveCouponFromAdmin();
    };
  }
}

function renderAdminView() {
  const adminContent = document.getElementById("admin-content-area");
  const accessDenied = document.getElementById("admin-access-guard");

  if (!currentUser || currentUser.role !== "admin") {
    if (adminContent) adminContent.style.display = "none";
    if (accessDenied) accessDenied.style.display = "block";
    return;
  }

  if (accessDenied) accessDenied.style.display = "none";
  if (adminContent) adminContent.style.display = "block";

  const totalEl = document.getElementById("stat-total-coupons");
  if (totalEl) totalEl.textContent = coupons.length;

  const verifiedEl = document.getElementById("stat-verified-coupons");
  if (verifiedEl) verifiedEl.textContent = coupons.filter(c => c.verified).length;

  const usersEl = document.getElementById("stat-active-users");
  if (usersEl) usersEl.textContent = users.length;

  const tbody = document.getElementById("admin-coupons-table-body");
  if (!tbody) return;

  tbody.innerHTML = coupons.map(c => `
    <tr>
      <td><strong>${c.code}</strong></td>
      <td>${c.storeName}</td>
      <td>${c.title}</td>
      <td>${c.discountType === 'percentage' ? `${c.discountValue}%` : `$${c.discountValue}`}</td>
      <td>$${c.minSpend}</td>
      <td>${c.expiryDate}</td>
      <td>
        <button style="border:none; background:none; cursor:pointer;" onclick="toggleVerifiedCoupon('${c.id}')" title="Toggle verified status">
          ${c.verified ? '<span class="verified-tag">✓ Verified</span>' : '<span style="color:var(--muted-text); font-size:0.75rem;">Unverified</span>'}
        </button>
      </td>
      <td>
        <button class="action-btn" onclick="openCouponModal('${c.id}')" title="Edit">✎</button>
        <button class="action-btn delete" onclick="deleteCoupon('${c.id}')" title="Delete">🗑</button>
      </td>
    </tr>
  `).join("");
}

function openCouponModal(id = null) {
  editingCouponId = id;
  const form = document.getElementById("form-admin-coupon");
  if (!form) return;
  form.reset();

  const titleEl = document.getElementById("coupon-modal-title");

  if (id) {
    const c = coupons.find(item => item.id === id);
    if (c) {
      if (titleEl) titleEl.textContent = "Edit Coupon";
      document.getElementById("form-code").value = c.code;
      document.getElementById("form-store").value = c.storeName;
      document.getElementById("form-title").value = c.title;
      document.getElementById("form-category").value = c.category;
      document.getElementById("form-type").value = c.discountType;
      document.getElementById("form-value").value = c.discountValue;
      document.getElementById("form-minspend").value = c.minSpend;
      document.getElementById("form-expiry").value = c.expiryDate;
      document.getElementById("form-desc").value = c.description || "";
      document.getElementById("form-terms").value = c.terms || "";
      document.getElementById("form-verified").checked = c.verified;
    }
  } else {
    if (titleEl) titleEl.textContent = "Create New Coupon";
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    document.getElementById("form-expiry").value = nextMonth;
  }

  openModal("modal-admin");
}

function saveCouponFromAdmin() {
  const code = document.getElementById("form-code").value.trim().toUpperCase();
  const storeName = document.getElementById("form-store").value.trim();
  const title = document.getElementById("form-title").value.trim();
  const category = document.getElementById("form-category").value;
  const discountType = document.getElementById("form-type").value;
  const discountValue = parseFloat(document.getElementById("form-value").value);
  const minSpend = parseFloat(document.getElementById("form-minspend").value) || 0;
  const expiryDate = document.getElementById("form-expiry").value;
  const description = document.getElementById("form-desc").value.trim();
  const terms = document.getElementById("form-terms").value.trim();
  const verified = document.getElementById("form-verified").checked;

  const storeId = storeName.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (editingCouponId) {
    const c = coupons.find(item => item.id === editingCouponId);
    if (c) {
      Object.assign(c, { code, storeName, storeId, title, category, discountType, discountValue, minSpend, expiryDate, description, terms, verified });
      showToast(`Updated coupon "${code}"!`);
    }
  } else {
    const newCoupon = {
      id: "coup-" + Date.now(),
      code,
      storeName,
      storeId,
      title,
      category,
      discountType,
      discountValue,
      minSpend,
      expiryDate,
      description,
      terms,
      verified,
      upvotes: 0,
      downvotes: 0,
      usesCount: 0
    };
    coupons.unshift(newCoupon);
    showToast(`Created new coupon "${code}"!`);
  }

  saveCouponsData();
  closeModal("modal-admin");
  renderAdminView();
  renderCoupons();
}

function deleteCoupon(id) {
  const c = coupons.find(item => item.id === id);
  if (c && confirm(`Delete coupon "${c.code}"?`)) {
    coupons = coupons.filter(item => item.id !== id);
    wallet = wallet.filter(wId => wId !== id);
    saveCouponsData();
    saveWalletData();
    renderAdminView();
    renderCoupons();
    updateWalletUI();
    showToast(`Deleted coupon "${c.code}".`);
  }
}

function toggleVerifiedCoupon(id) {
  const c = coupons.find(item => item.id === id);
  if (c) {
    c.verified = !c.verified;
    saveCouponsData();
    renderAdminView();
    renderCoupons();
    showToast(`Updated status for "${c.code}".`);
  }
}

function resetDemoData() {
  if (confirm("Reset all coupons and demo data back to default initial values?")) {
    coupons = [...DEFAULT_COUPONS];
    saveCouponsData();
    renderAdminView();
    renderCoupons();
    updateWalletUI();
    showToast("Demo data reset to factory defaults.");
  }
}

// -------------------------------------------------------------
// 10. Modals, Toasts & Theme Helpers
// -------------------------------------------------------------
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add("open");
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove("open");
}

function showToast(message) {
  const box = document.getElementById("toast-box");
  if (!box) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  box.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("codecrafters_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    themeToggle.onclick = () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("codecrafters_theme", next);
      themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
    };
  }
}

// -------------------------------------------------------------
// 11. Application Initialization on DOMContentLoaded
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadAppData();
  initTheme();
  setupAuthForms();
  setupCheckoutSimulator();
  setupAdmin();
  updateUserNavbar();
  updateWalletUI();

  // Navigation tab clicks
  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.onclick = () => switchView(btn.dataset.view);
  });

  // Clicking the brand logo switches to Deals (if logged in) or Login (if logged out)
  const brandLogo = document.getElementById("nav-brand-logo");
  if (brandLogo) {
    brandLogo.onclick = () => {
      if (currentUser) switchView("deals");
      else switchView("login");
    };
  }

  // Logout button
  const logoutBtn = document.getElementById("btn-user-logout");
  if (logoutBtn) logoutBtn.onclick = logoutUser;

  // Search input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      renderCoupons();
    };
  }

  // Filters
  const filterStore = document.getElementById("filter-store");
  if (filterStore) {
    filterStore.onchange = (e) => {
      storeFilter = e.target.value;
      renderCoupons();
    };
  }

  const filterDisc = document.getElementById("filter-discount");
  if (filterDisc) {
    filterDisc.onchange = (e) => {
      discountTypeFilter = e.target.value;
      renderCoupons();
    };
  }

  const filterSort = document.getElementById("filter-sort");
  if (filterSort) {
    filterSort.onchange = (e) => {
      sortBy = e.target.value;
      renderCoupons();
    };
  }

  const filterVer = document.getElementById("filter-verified");
  if (filterVer) {
    filterVer.onchange = (e) => {
      verifiedOnlyFilter = e.target.checked;
      renderCoupons();
    };
  }

  // Wallet drawer events
  const openW = document.getElementById("btn-open-wallet");
  if (openW) openW.onclick = openWallet;

  const closeW = document.getElementById("btn-close-wallet");
  if (closeW) closeW.onclick = closeWallet;

  const bgW = document.getElementById("wallet-drawer-bg");
  if (bgW) bgW.onclick = closeWallet;

  // Modal close buttons (overlay and [close-btn] clicks)
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.classList.remove("open");
    };
  });
  document.querySelectorAll(".close-btn").forEach(btn => {
    btn.onclick = () => {
      const modal = btn.closest(".modal-overlay");
      if (modal) modal.classList.remove("open");
    };
  });

  // Launch initial view: If already authenticated, show Deals; else show Login
  if (currentUser) {
    switchView("deals");
  } else {
    switchView("login");
  }
});
