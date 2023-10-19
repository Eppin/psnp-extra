console.log("foo2 module is lazy loaded....");

export default () => {
  const g2 = document.querySelectorAll(".ellipsis .title");
  console.log(g2);

  g2.forEach((e) => {
    e.setAttribute("href", "epping.com");
  });
}
