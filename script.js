"use strict";
String.prototype.replaceIn = function (idx, rep) {
  return this.substring(0, idx) + rep + this.substring(idx + rep.length);
};

const languages = {
  english: "abcdefghijklmnopqrstuvwxyz".split(""),
  ukranian: "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя".split(""),
  german: "abcdefghijklmnopqrstuvwxyzÄÖÜß".split(""),
};

let language = "de",
  curalpha = languages.german,
  size = 30,
  iter = 1,
  numberOfRecs = 1;
const table = document.getElementById("table");

function getData() {
  let idseed = "seedde",
    iderr = "errde";

  if (language === "en") {
    idseed = "seeden";
    faker.locale = "en_GB";
    curalpha = languages.english;
    iderr = "erren";
    size = 26;
  } else if (language === "de") {
    idseed = "seedde";
    faker.locale = "de";
    iderr = "errde";
    curalpha = languages.german;
    size = 30;
  } else if (language === "uk") {
    idseed = "seeduk";
    faker.locale = "uk";
    iderr = "erruk";
    curalpha = languages.ukranian;
    size = 33;
  } else return;

  const x = +document.getElementById(idseed).value,
    z = +document.getElementById(iderr).value;
  faker.seed(x * iter);
  const arg = new Math.seedrandom(x * iter),
    wholeNumber = Math.floor(z),
    fraction = z % 1;

  for (let i = 0; i < 20; i++) {
    const arr = [
      faker.name.findName(),
      faker.address.city() + " " + faker.address.streetAddress() + " ",
      faker.internet.email(),
      faker.phone.phoneNumber(),
      faker.random.uuid(),
    ];

    for (let j = 0; j < wholeNumber; j++) {
      const index = Math.floor(arg() * 5),
        word = arr[index],
        oper = Math.floor(arg() * 3);
      if (oper == 0) {
        let rep = curalpha[Math.floor(arg() * size)];
        let pos = Math.floor(arg() * word.length);
        arr[index] = arr[index].replaceIn(pos, rep);
      } else if (oper == 1) {
        let pos = Math.floor(arg() * word.length);
        arr[index] = arr[index].replaceIn(pos, "");
      } else {
        let pos = Math.floor(arg() * word.length);

        if (pos < word.length - 1) {
          let c1 = arr[index].charAt(pos);
          let c2 = arr[index].charAt(pos + 1);
          arr[index] = arr[index].replaceIn(pos, c2);
          arr[index] = arr[index].replaceIn(pos + 1, c1);
        } else {
          let c1 = arr[index].charAt(pos);
          let c2 = arr[index].charAt(pos - 1);
          arr[index] = arr[index].replaceIn(pos, c2);
          arr[index] = arr[index].replaceIn(pos - 1, c1);
        }
      }
    }
    if (fraction > 0 && arg() < fraction) {
      let index = Math.floor(arg() * 5);
      let word = arr[index];
      let oper = Math.floor(arg() * 3);
      if (oper == 0) {
        let rep = curalpha[Math.floor(arg() * size)];
        let pos = Math.floor(arg() * word.length);
        arr[index] = arr[index].replaceIn(pos, rep);
      } else if (oper == 1) {
        let pos = Math.floor(arg() * word.length);
        arr[index] = arr[index].replaceIn(pos, "");
      } else {
        let pos = Math.floor(arg() * word.length);

        if (pos < word.length - 1) {
          let c1 = arr[index].charAt(pos);
          let c2 = arr[index].charAt(pos + 1);
          arr[index] = arr[index].replaceIn(pos, c2);
          arr[index] = arr[index].replaceIn(pos + 1, c1);
        } else {
          let c1 = arr[index].charAt(pos);
          let c2 = arr[index].charAt(pos - 1);
          arr[index] = arr[index].replaceIn(pos, c2);
          arr[index] = arr[index].replaceIn(pos - 1, c1);
        }
      }
    }

    table.innerHTML += `
        <tr class="table-light">
          <td class='normal'>${numberOfRecs}</td>
          <td class='light'>${arr[4]}</td>
          <td class='normal'>${arr[0]}</td>
          <td class='normal'>${arr[1]}</td>
          <td class='light'>${arr[3]}</td>
          
          
        </tr>
      `;
    numberOfRecs++;
  }
  iter++;
}

function load() {
  $("input[lang]").hide();
  $("button[lang]").hide();
  let elem = document.getElementById("language");
  let l = elem.options[elem.selectedIndex].text;

  if (l === "United Kingdom") {
    language = "en";
    $('input[lang="en"]').show();
    $('button[lang="en"]').show();
  } else if (l === "Deutschland") {
    language = "de";
    $('input[lang="de"]').show();
    $('button[lang="de"]').show();
  } else if (l === "Україна") {
    language = "uk";
    $('input[lang="uk"]').show();
    $('button[lang="uk"]').show();
  } else return;
  update();
}

function update() {
  iter = 1;
  numberOfRecs = 1;
  table.innerHTML = `
      <thead>
        <tr class="table-dark" style="text-align: left; font-size: small;">
          <td class='bold'>#</td>
          <td class='bold'>ID</td>
          <td class='bold'>Name & Surname</td>
          <td class='bold'>Address</td>
          <td class='bold'>Phone</td>
        </tr>
      </thead>
    `;
  getData();
}

window.addEventListener("scroll", () => {
  const y = window.pageYOffset + window.innerHeight;

  if (y >= document.getElementById("table").offsetHeight) getData();
});
