let All =[];


const loading = getid('load');
// labels er jonno alada color with condition
const getLevel = (levels) => {
    const result = levels.map(l=> {

      
        if (l === "bug") {
            return `<span class="text-red-500 rounded-md border border-red-200 text-[12px] text-center p-1 bg-red-50"><i class="fa-solid fa-computer-mouse"></i> ${l.toUpperCase()}</span>`;
        }
        return `<span class="text-yellow-500 border border-yellow-300 text-[12px] rounded-md text-center p-1 bg-yellow-50">  ${l.toUpperCase()}</span>`;
    
        
})
    return result.join(" ");
    
}

async function allLists() {
    // buffer load
    load();
    // issue load

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
const data = await res.json();
// data er moddde data ase tai data.data
All=data.data; 
getid('len').innerText = All.length;
displayData(All);

}
const displayData = (data)=>{
    // parent nisi pore append korar jonno
    const parent = getid('parent');
    parent.innerHTML=''
data.forEach(e=>{
    const div = document.createElement('div');
    div.innerHTML=`

    <div id="card" class="p-3 card-item h-[100%] space-y-2 rounded-md min-w-[250px] shadow-lg bg-[#FFFFFF]" data-id="${e.id}">
            <div class="flex justify-between">
               <img 
    class="w-[8%] h-[8%]" 
    src="${
        e.status === 'open'
        ? './assets/Open-Status.png'
        : './assets/Closed- Status .png'
    }" 
    alt=""
>
                <p class="${e.priority ==='high'? 'text-red-500 bg-red-50':e.priority ==='medium'? 'text-yellow-500 bg-yellow-50': 'text-blue-500 bg-blue-50'} font-medium rounded-xl text-[14px] text-center p-2  ">
                    ${e.priority.toUpperCase()}
                </p>
            </div>
            <div class="border-b-1 border-gray-300 pb-3">
                <p class="font-bold">
                    ${e.title}
                </p>
                <p class="text-dull pb-3">
                    ${e.description}
                </p>
                <div class="flex gap-3">
                    ${getLevel(e.labels)}
                </div>
            </div>

            <p class="text-dull"># ${e.id} by ${e.author}</p>
<p class="text-dull">${e.createdAt.split("T")[0]}</p>
        </div>
    
    `
    parent.appendChild(div);



}) 
// jokhon load hoi jabe buffer tokhon off kora lagbe ,moja hoilo eitay search thekeo call asbe 
removeLoad();
}
allLists()
const openbtn = getid("open-btn")
const closedbtn = getid("closed-btn")
const allbtn = getid("all-btn")

function filter(status){
    // open/close status er jonno data load kortesi filter kore and opore length o change kore disi click er sathe
    const freshdata = All.filter(e=>e.status === status);
    getid('len').innerText = freshdata.length;
    

displayData(freshdata);




}
// easy task clear kora and add kora color er classlist
function color(id){
     document.querySelectorAll("#all-btn, #open-btn, #closed-btn").forEach(b=>{
        
        b.classList.remove('btn-primary', 'text-white', 'font-semibold');
        b.classList.add("text-[#64748B]", "font-normal", "border", "border-gray-300");

    
    });


id.classList.remove("text-[#64748B]", "font-normal", "border", "border-gray-300");
id.classList.add('btn-primary', 'text-white', 'font-semibold');

}
// modal add koresi
const pd= getid('parent');
pd.addEventListener("click",function(e){
    const card = e.target.closest('.card-item');
    if(!card) return;
    // card e ekta data-id disi jeta diye dataset er maddhome id no passi
    // id no o dynamic way te niye nisi card section e
   const id = card.dataset.id;



fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
.then(res=>res.json())
.then((data)=>{
    modal(data.data);
})

})
const modal =(data)=>{
    const detailbox = getid("detail-container");
    // modal er output
    detailbox.innerHTML = `
      <h2 class="font-bold text-xl">
            ${data.title}
        </h2>
        <span class=" ${data.status === 'open' ? 'bg-green-600' : 'bg-red-600'}  text-white p-1  text-[12px] font-bold rounded-full ">${data.status.toUpperCase()}</span> 
        
        <span class="text-[12px] text-[#64748B]">Opened by </span> <span class="text-[14px] text-[#64748B]"> ${data.author.toUpperCase()}</span><span class="text-[14px] text-[#64748B]"> :  ${data.createdAt.split("T")[0]}</span>
        <div class="flex gap-2 ">


        </div>
        ${getLevel(data.labels)}

        <p class="text-[14px] my-3 text-[#64748B]">${data.description}</p>

        <br>
        <div class="w-11/12 mx-auto my-3 flex justify-between rounded-md p-5 bg-[#F8FAFC]">
            <div>
<p class="text-[10px] text-[#64748B]">Assignee:</p>
<p>${data.author.toUpperCase()}</p>

            </div>
            <div>
<p class="text-[14px] text-[#64748B]">Priority:</p>
<p class="${data.priority === 'high' ? 'bg-red-400' : data.priority === 'medium' ? 'bg-yellow-700' : 'bg-blue-400'}  text-[14px] text-white py-1 px-2 rounded-full " >${data.priority.toUpperCase()}</p>
            </div>

        </div>
    
    `
    // modal show korar jonno showmodal use
getid('my_modal_5').showModal();
}
// search option
getid('search').addEventListener('keyup', function(e){
    load();

    const input = getid('search').value.trim().toLowerCase();
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
        const all=data.data;
        // data gula filter(e=>e.tittle.includes(input)) kore dekhsi ja ja ase ta display korai
        const filteredData = all.filter(issue => 
            issue.title.toLowerCase().includes(input));
        displayData(filteredData);
        // all button er color remove 
        remove();
    });

}
)

const remove =() =>{
document.querySelectorAll('.btn').forEach(e=>e.classList.remove('btn-primary', 'text-white','font-semibold'));

}
// buffer load
function load(){
    loading.classList.remove('hidden');
    
}
function removeLoad(){
    loading.classList.add('hidden');
   

}
function length (){
    getid('len').innerText = All.length;
}