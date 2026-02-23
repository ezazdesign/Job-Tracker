let currentTab = "All";

// 1. Tab Switch Part

const tabAll = document.getElementById("allBtn");
const tabInterview = document.getElementById("interviewBtn");
const tabRejected = document.getElementById("rejectedBtn");
const allTabButtons = [tabAll, tabInterview, tabRejected];

function switchTab(clickedBtn, tabName) {
    currentTab = tabName;
    allTabButtons.forEach((btn) => {
        btn.classList.remove("btn-primary");
    });
    clickedBtn.classList.add("btn-primary");
    updateUI();
}

tabAll.addEventListener("click", function () {
    switchTab(tabAll, "All");
});
tabInterview.addEventListener("click", function () {
    switchTab(tabInterview, "Interview");
});
tabRejected.addEventListener("click", function () {
    switchTab(tabRejected, "Rejected");
});



// 2. Card Button Part

const jobContainer = document.getElementById("job-container");
const cards = Array.from(jobContainer.children);

cards.forEach(function (card) {
    card.setAttribute("data-status", "Pending");

    const buttons = card.querySelectorAll("button");
    const deleteBtn = buttons[0];
    const interviewBtn = buttons[1];
    const rejectedBtn = buttons[2];
    const statusBadge = card.querySelector('.not-applied');

    // INTERVIEW BUTTON
    interviewBtn.addEventListener("click", function () {
        card.setAttribute("data-status", "Interview");
        statusBadge.innerText = "INTERVIEW";
        statusBadge.className =
            "rounded font-medium px-3 py-2 bg-green-100 text-green-700 w-fit text-sm";
        updateUI();
        card.style.borderLeft = "6px solid #10B981";
    });

    // REJECTED BUTTON
    rejectedBtn.addEventListener("click", function () {
        card.setAttribute("data-status", "Rejected");
        statusBadge.innerText = "REJECTED";
        statusBadge.className =
            "rounded font-medium px-3 py-2 bg-red-100 text-red-700 w-fit text-sm";
        updateUI();
        card.style.borderLeft = "6px solid #EF4444";
    });

    // DELETE BUTTON
    deleteBtn.addEventListener("click", function () {
        card.remove();
        updateUI();
    });
});

// 3. Main Function Part
const totalCountEl = document.getElementById("totalCount");
const interviewCountEl = document.getElementById("interviewCount");
const rejectedCountEl = document.getElementById("rejectedCount");
const availableJobsCount = document.getElementById("availableJobsCount");

function updateUI() {
    let total = 0;
    let interview = 0;
    let rejected = 0;
    let visibleCards = 0;

    const currentCards = Array.from(jobContainer.children);

    currentCards.forEach(function (card) {
        const status = card.getAttribute("data-status");

        total = total + 1;
        if (status === "Interview") {
            interview = interview + 1;
        } else if (status === "Rejected") {
            rejected = rejected + 1;
        }

        if (currentTab === "All" || currentTab === status) {
            card.style.display = "block";
            visibleCards = visibleCards + 1;
        } else {
            card.style.display = "none";
        }
    });

    totalCountEl.innerText = total;
    interviewCountEl.innerText = interview;
    rejectedCountEl.innerText = rejected;
    availableJobsCount.innerText = visibleCards + " jobs";

    if (visibleCards === 0) {
        emptyStateDiv.classList.remove("hidden");
    } else {
        emptyStateDiv.classList.add("hidden");
    }
}

// 4. Empty Section
const emptyStateDiv = document.createElement("div");
emptyStateDiv.className =
    "hidden flex-col items-center justify-center py-10 text-center";
emptyStateDiv.innerHTML = `
 <div class="flex flex-col items-center justify-center mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full py-[111px]">
    <img src="./jobs.png" alt="No jobs" class="w-16 h-16 mb-4 opacity-50">
    <h3 class="text-lg font-bold text-[#002C5C]">No jobs available</h3>
    <p class="text-[#64748B] text-sm mt-1">Check back later for new job opportunities.</p>
  </div>
`;
jobContainer.after(emptyStateDiv);
updateUI();
