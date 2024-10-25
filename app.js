//Definición de la clase con el cosntructor para crear los objetos necesarios


class Agent {

    constructor(name, image, description) {
        this.name = name;
        this.image = image;
        this.description = description;
    }
}

//API fetch 

async function fetchAgents() {
    const response = await fetch('https://valorant-api.com/v1/agents');
    const json = await response.json();
    const data = json.data;
    
    let agents = [];
    for (let i = 0; i < data.length; i++) {
        const agentJson = data[i];
        const agent = new Agent(
            agentJson.displayName,
            agentJson.bustPortrait,
            agentJson.description,
        );
        agents.push(agent);
    }
    console.log(agents)
}

fetchAgents();