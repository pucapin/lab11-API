//Definición de la clase con el cosntructor para crear los objetos necesarios


class Agent {

    constructor(name, background, image, description, roleDisplayName) {
        this.name = name;
        this.background = background;
        this.image = image;
        this.description = description;
        this.roleDisplayName = roleDisplayName;
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
                <li>
                    <ul>
                    </ul>
                </li>
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
        const agent = new Agent(
            agentJson.displayName,
            agentJson.backgroundGradientColors[0],
            agentJson.displayIcon,
            agentJson.description,
            roleDisplayName
        );
        agents.push(agent);
    }
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