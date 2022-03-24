const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("../../assets/x.png");
            names('Error al buscar');
            pokeTipo('None');
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            const estadistica = document.getElementById("estadisticas");
            estadistica.innerHTML = '';
            const movimiento = document.getElementById("pokeMove");
            movimiento.textContent = '';
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);
            let pokeNm = data.forms[0].name;
            names(pokeNm);
            console.log(pokeNm);
            let pokeTp = data.types[0].type.name;
            pokeTipo(pokeTp);
            console.log(pokeTp);
            let pokeStat = data.stats;
            console.log(pokeStat);
            pokeEstadistica(pokeStat);
            let pokeM = data.moves;
            pokeMove(pokeM);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const names = (url) => {
    const pokeNames = document.getElementById("names");
    pokeNames.textContent = url;
}

const pokeTipo = (url) => {
    const type= document.getElementById("pokeTipo");
    type.textContent = url;
}

const pokeEstadistica = (url) => {
    const stat = document.getElementById("estadisticas");
    let tam = url.length;
    for (let index = 0; index < tam; index++) {
        stat.innerHTML += `<label for="${url[index].stat.name}">${url[index].stat.name}</label> <progress id="${url[index].stat.name}" max="100" value="${url[index].base_stat}" class="bar"></progress> <br>`;
    }
}

const pokeMove = (url) => {
    const move= document.getElementById("pokeMove");
    for (let index = 0; index < 10; index++) {
        let movement = url[index].move.name + ', ';
        move.textContent += movement;
    }
}