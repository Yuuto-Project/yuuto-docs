// document.addEventListener(
//   "scroll",
//   () => {
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollBottom =
//       (document.documentElement.scrollHeight || document.body.scrollHeight) -
//       document.documentElement.clientHeight;
//     document.getElementById("progressbar").style.width = `${(scrollTop /
//       scrollBottom) *
//       100}%`;
//   },
//   { passive: true }
// );

let annotationIsActive = false;
const annotationLocation = document.getElementsByClassName("c-annotations")[0];

// gets all elements that have annotations
const annotationRoots = document.getElementsByClassName("has-annotation");
const annotations = [];

// gets the associated annotations and adds them to the list
for (const annotation of annotationRoots) {
  annotations.push([
    document.getElementById(`${annotation.id}`),
    document.getElementsByClassName(`annotation --${annotation.id}`)[0]
  ]);
}

// hides the annotation on scroll
const stopOnScroll = element => {
  document.addEventListener("scroll", () => {
    annotationLocation.classList.remove("is-active");
    setTimeout(() => {
      element.classList.remove("is-active");
    }, 300);
    annotationIsActive = false;
  });
};

// checks if an annotation is already being displayed
const isAnnotationActive = () => {
  if (annotationIsActive) {
    const activeAnnotation = document.getElementsByClassName(
      "annotation is-active"
    )[0];
    activeAnnotation.classList.remove("is-active");
  } else {
    annotationIsActive = true;
    annotationLocation.classList.add("is-active");
  }
};

// triggers the annotation events
annotations.forEach(annotation => {
  annotation[0].addEventListener("mouseenter", () => {
    isAnnotationActive();
    annotation[1].classList.add("is-active");
    stopOnScroll(annotation[1]);
  });
});
