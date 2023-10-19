console.log("foo11111111111111 module is lazy loaded....");

export default () => {
    const g = document.querySelector("#update-find > .row .button");
    console.log(g);
    console.log(g.attributes);
    g.setAttribute("href", "epping.com");
}