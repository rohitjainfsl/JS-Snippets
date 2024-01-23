const data = [
  {
    name: "Rohit Jain",
    email: "rohit@fullstacklearning.com",
  },
  {
    name: "Garvit Jangir",
    email: "garvit@gmail.com",
  },
  {
    name: "Nihit Jangir",
    email: "nihit@gmail.com",
  },
  {
    name: "Surbhi Singhal",
    email: "surbhi.s@gmail.com",
  },
  {
    name: "Aashish Pancholi",
    email: "aashish@gmail.com",
  },
  {
    name: "Somesh Sharma",
    email: "somesh@gmail.com",
  },
  {
    name: "Sudhir Mishra",
    email: "mishra.sudhir@gmail.com",
  },
  {
    name: "Chandan Lakhara",
    email: "chandan.l@gmail.com",
  },
  {
    name: "Priya",
    email: "priya@fullstacklearning.com",
  },
  {
    name: "Priya Sharma",
    email: "priya.s@gmail.com",
  },
  {
    name: "Aditya Kamodiya",
    email: "aditya@aiet.com",
  },
  {
    name: "Dheeraj Jangir",
    email: "dheeraj@aiet.com",
  },
  {
    name: "Ritika Rajwar",
    email: "ritika@aiet.com",
  },
];

window.onload = () => {
  let start = 1;
  const div = document.querySelector("#sel");
  const editable = document.querySelector(".editable");

  editable.onkeydown = (e) => {
    const placeholder = e.target.children[e.target.childElementCount - 1];
    if (start) {
      if (placeholder.innerHTML === "Search...") {
        placeholder.innerHTML = " ";
        start = 0;
      } else if (e.keyCode <= 65 && e.keyCode >= 89)
        placeholder.innerHTML = e.key;
    }

    // console.log(data.filter((dt) => {
    //   if (dt.name.includes(placeholder.innerHTML)) return dt.name;
    // }))

    let dataFound = data.filter((dt) => {
      if (dt.name.includes(placeholder.innerHTML)) return dt.name;
    });
    console.log(dataFound);

    if (dataFound.length > 0) {
      div.classList.add("shown");
      div.innerHTML = "";
      dataFound.forEach((data) => {
        const parent = document.createElement("div");
        const name = document.createElement("p");
        name.innerHTML = data.name;
        parent.append(name);

        const email = document.createElement("p");
        email.innerHTML = data.email;
        parent.append(email);

        parent.addEventListener("click", (e) => {
          showNameAbove(editable, placeholder, data.name);
          placeholder.innerHTML = " ";
          clearDiv(div);
        });
        div.append(parent);
      });
    } else clearDiv(div);
  };
};

function clearDiv(elem) {
  elem.classList.remove("shown");
  elem.innerHTML = "";
}

function showNameAbove(element, reference, name) {
  console.log("hello");
  const para = document.createElement("p");
  const name1 = document.createElement("span");
  name1.innerHTML = name;

  const cross = document.createElement("span");
  cross.innerHTML = "&times;";

  para.append(name1);
  para.append(cross);
  // element.append(para);

  element.insertBefore(para, reference);
}