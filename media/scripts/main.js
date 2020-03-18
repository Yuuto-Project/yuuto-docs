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

// render element inactive
const makeInactive = element => {
  element.classList.remove("is-active");
};

// render element active
const makeActive = element => {
  element.classList.add("is-active");
};

// hides the annotation on scroll
const hideAnnotationOnScroll = element => {
  document.addEventListener("scroll", () => {
    makeInactive(annotationLocation);
    setTimeout(() => {
      makeInactive(element);
    }, 300);
    annotationIsActive = false;
  });
};

// checks if an annotation is already being displayed
const setAnnotationStatus = () => {
  if (annotationIsActive) {
    const activeAnnotation = document.getElementsByClassName(
      "annotation is-active"
    )[0];
    makeInactive(activeAnnotation);
  } else {
    annotationIsActive = true;
    makeActive(annotationLocation);
  }
};

// triggers the annotation events
annotations.forEach(annotation => {
  annotation[0].addEventListener("mouseenter", () => {
    setAnnotationStatus();
    makeActive(annotation[1]);
    hideAnnotationOnScroll(annotation[1]);
  });
});
