//Definición de la clase con el cosntructor para crear los objetos necesarios


class Agent {

    constructor(name, background, image, description, roleDisplayName, abilitiesDisplay) {
        this.name = name;
        this.background = background;
        this.image = image;
        this.description = description;
        this.roleDisplayName = roleDisplayName;
        this.abilitiesDisplay = abilitiesDisplay;
    }

    
    htmlCard(pos) {
        return `
        <div id="agentcard">
                <h1 id="name">${this.name}</h1>
                <p id="desc">${this.description}</p>
                <p id="boldp">${this.roleDisplayName}</p>
                <div id="line"></div>
                <div id="sec">
                <img src="${this.image}" alt="" id="img"> 
                <div>
                <h3>Abilities</h3>
                     ${this.abilitiesDisplay.map(ability => `<li>${ability}</li>`).join('')}
                </div>
                </div>
            </div>
        
        `;
    }
}

//API fetch 
let agents = [];

async function fetchAgents() {
    const response = await fetch('https://valorant-api.com/v1/agents');
    const json = await response.json();
    data = json["data"]

    
    for (let i = 0; i < data.length; i++) {
        const agentJson = data[i];
        const roleDisplayName = agentJson.role ? agentJson.role.displayName : 'Unknown Role';
        const abilitiesDisplay = agentJson.abilities 
        ? agentJson.abilities.map(ability => ability.displayName) 
        : [];

        const agent = new Agent(
            agentJson.displayName,
            agentJson.backgroundGradientColors[0],
            agentJson.displayIcon,
            agentJson.description,
            roleDisplayName,
            abilitiesDisplay,
        );
        agents.push(agent);
    }
    console.log(agents)
    renderAgents()
}

fetchAgents();

function renderAgents() {
    const container = document.getElementById("container")

    for(let i = 0; i < agents.length; i++) {
        let agent = agents[i];
        container.innerHTML += agent.htmlCard(i);
    }

}

function filterAgents(event) {
    const searchTerm = event.target.value.toLowerCase(); // get input !!

    if (searchTerm === "") {
        renderAgents();
    } else {
        const filteredAgents = agents.filter(agent => {
            return agent.name.toLowerCase().includes(searchTerm);
        });
    
        renderFilter(filteredAgents);
    }
}

function renderFilter(agents) {
    container.innerHTML = "";

    for(let i = 0; i < agents.length; i++) {
        let agent = agents[i];
        container.innerHTML += agent.htmlCard(i);
    }

}
