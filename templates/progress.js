window.addEventListener("DOMContentLoaded",() => {
  const progress = new GiftProgress(".progress");
});

class GiftProgress {
  progress = 0;
  startDate = 0;
  endDate = 0;
  timeout = null;
  fillPreview = false;

constructor(qs) {
  this.el = document.querySelector(qs);
  this.init();
}
init() {
  this.el?.addEventListener("change",this.toggleFillPreview.bind(this));
  if (typeof moment === "function") this.updateAll();
}
getProgress() {
  // get current and end dates
  const now = moment();
  const startDate = moment.unix(1693032960);
  this.startDate = startDate;
  const endDate = moment.unix(1694815200);
  this.endDate = endDate;
  // const tempEnd = moment(`${tempNow.clone().add(numberOfDays,"d")}`);
  const tempDiff = endDate.diff(now,'ms');
  const tempTotalDiff = endDate.diff(startDate,'ms');
  this.progress = 1 - (tempDiff / tempTotalDiff);
  if (this.progress > 1) this.progress = 1; 
}
getStats() {
  const trackingStatuses = [
    {
      name: 'Потрачено',
    },
    {
      name: 'Презентация',
    },
    {
      name: 'Летит к тебе',
    },
    {
      name: 'Ещё чуть-чуть!',
    }
  ];

  const progressBarStatuses = this.el.querySelectorAll('.progress__bar-status');
  const checkProgressStatus = this.el.querySelectorAll('.fa-solid');
  const arrayCheckStatuses = Array.from(checkProgressStatus);
  // each status equal eachProgressQuantity
  const eachProgressQuantity = 1 / progressBarStatuses.length;

  progressBarStatuses.forEach((stat, i) => {
    if (this.progress >= eachProgressQuantity * i) {
      arrayCheckStatuses[i].classList.add('fa-check');
      arrayCheckStatuses[i].classList.add('fa-beat');
    }
    stat.textContent = trackingStatuses[i].name;
  })
}
toggleFillPreview() {
  this.fillPreview = !this.fillPreview;
  this.updateFill();
}
updateAll() {
  this.getProgress();
  this.getStats();
  this.updateDates();
  this.updateFill();

  clearTimeout(this.timeout);
  this.timeout = setTimeout(this.updateAll.bind(this),1e3);
}
updateFill() {
  const percent = Math.floor(this.progress * 100);
  const fills = Array.from(this.el?.querySelectorAll("[data-fill]"));
  // if (percent >= 100) percent = 100;

  fills.forEach((fill,i) => {
    let { progress } = this;
    if (this.fillPreview) progress = 1;

    const transX = -(1 - progress) * 100;

    if (fill.getAttribute("role") === "progressbar") {
      // accessible progress bar
      fill.setAttribute("aria-valuenow",percent);
      fill.style.transform = `translate3d(${transX}%,0,0)`;
    } else {
      // glow
      const inset = 0.25; // in ems
      const transXAdjust = inset * 4 * (1 - progress);
      fill.style.transform = `translate3d(calc(${transX}% + ${transXAdjust}em),0,0)`;
    }
  });

  const percentEl = this.el?.querySelector("[data-percent]");
  if (percentEl) percentEl.innerText = this.fillPreview ? 'Fill Preview' : `${percent}%`;
}
updateDates() {
  const start = this.el?.querySelector("[data-start]");
  if (start) start.innerText = this.startDate.format("D MMM");

  const end = this.el?.querySelector("[data-end]");
  if (end) end.innerText = this.endDate.format("D MMM");
}
}

class Utils {
static formatNumber(number) {
  return number.toLocaleString();
}
}