let prev = document.getElementById("previous");
let next = document.getElementById("next");

let arr = [
  "https://images-static.nykaa.com/uploads/b5e477cd-478c-4f1d-b1a5-c2030c3d0615.jpg?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/fe616105-d856-4ef7-9a91-22a68a988094.png?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/7250c4ef-daf6-4f77-ab9d-ea897b773904.jpg?tr=w-1200,cm-pad_resize",
"https://images-static.nykaa.com/uploads/41cab243-d530-4f83-b083-6352b09f3a13.jpg?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/db2d5607-d968-45f6-ba39-6b8eac6a54e4.jpg?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/1ce27b38-ac2a-4e91-a790-97672cc683cf.jpg?tr=w-1200%2Ccm-pad_resize",
];

let i = 0;

next.addEventListener("click", function () {
  i++;
  if (i > arr.length - 1) {
    i = 0;
  }
  document.getElementById("image").src = arr[i];
});

prev.addEventListener("click", function () {
  i--;
  if (i < 0) {
    i = arr.length - 1;
  }
  document.getElementById("image").src = arr[i];
});

function slides() {
  document.getElementById("image").src = arr[i];

  if (i < arr.length - 1) i++;
  else i = 0;
}
setInterval(slides, 1500);
