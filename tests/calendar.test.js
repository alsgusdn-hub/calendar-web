const test = require("node:test");
const assert = require("node:assert");
const cal = require("../script.js");

test("weekday headers are Sunday to Saturday in Korean", () => {
  assert.deepStrictEqual(cal.WEEKDAYS, ["일", "월", "화", "수", "목", "금", "토"]);
});

test("shiftMonth crosses year boundaries", () => {
  assert.deepStrictEqual(cal.shiftMonth(2026, 11, 1), { year: 2027, month: 0 });
  assert.deepStrictEqual(cal.shiftMonth(2026, 0, -1), { year: 2025, month: 11 });
  assert.deepStrictEqual(cal.shiftMonth(2026, 5, 1), { year: 2026, month: 6 });
  assert.deepStrictEqual(cal.shiftMonth(2026, 5, -18), { year: 2024, month: 11 });
});

test("buildMonthCells places the 1st on the right weekday", () => {
  // 2026-11-01 is a Sunday
  const nov = cal.buildMonthCells(2026, 10);
  assert.strictEqual(nov[0], 1);
  assert.strictEqual(nov.length, 30);
  // 2027-01-01 is a Friday
  const jan = cal.buildMonthCells(2027, 0);
  assert.deepStrictEqual(jan.slice(0, 6), [null, null, null, null, null, 1]);
  assert.strictEqual(jan[jan.length - 1], 31);
});

test("handles leap years", () => {
  assert.strictEqual(cal.buildMonthCells(2028, 1).filter(Boolean).length, 29);
  assert.strictEqual(cal.buildMonthCells(2026, 1).filter(Boolean).length, 28);
});

test("formatTitle", () => {
  assert.strictEqual(cal.formatTitle(2026, 10), "2026년 11월");
});
