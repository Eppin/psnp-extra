let message: string = "Hello Worldw";
console.log(message);

const currentUrl = window.location.href;
console.log(currentUrl); 

if (currentUrl === "https://psnprofiles.com/VileTung")
{
  import('./foo');
}
else
{
  import('./foo2')
}

const updateFind = document.getElementById("update-find");
const p = document.createElement("p");
p.textContent = "Hello WOrld";

updateFind?.appendChild(p);
