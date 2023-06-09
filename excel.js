class TableCSVExporter {
  constructor(t, e, r = !0) {
    (this.table = t),
      (this.rows = Array.from(t.querySelectorAll("tr"))),
      (this.cutend = e),
      !r && this.rows[0].querySelectorAll("th").length && this.rows.shift();
  }
  convertToCSV() {
    const t = [],
      e = this._findLongestRowLength();
    for (const r of this.rows) {
      let o = "";
      for (let t = 0; t < e; t++)
        void 0 !== r.children[t] &&
          (o += TableCSVExporter.parseCell(r.children[t])),
          (o += t !== e - 1 ? "," : "");
      t.push(o);
    }
    return t.join("\n");
  }
  _findLongestRowLength() {
    return (
      this.rows.reduce(
        (t, e) => (e.childElementCount > t ? e.childElementCount : t),
        0
      ) - this.cutend
    );
  }
  static parseCell(t) {
    let e = t.textContent;
    return (e = e.replace(/"/g, '""')), (e = /[",\n]/.test(e) ? `"${e}"` : e);
  }
}
function excel(t, e = 0) {
  const r = new TableCSVExporter(
      document.getElementById(t.getAttribute("data-table")),
      e
    ).convertToCSV(),
    o = new Blob([r], { type: "text/csv" }),
    n = URL.createObjectURL(o),
    l = document.createElement("a");
  (l.href = n),
    (l.download = "table.csv"),
    l.click(),
    setTimeout(() => {
      URL.revokeObjectURL(n);
    }, 500);
}
