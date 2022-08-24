const iterate = async (varJson, varParent, varAncetre, array, setArray) => {
    for (let varKey in varJson) {
        let iterateObj = {
            ancetre: varAncetre,
            parent: null,
            key: null,
            content: null,
        };
        // tant que la clé est un objet, on continue la boucle
        if (typeof varJson[varKey] === 'object' && varJson[varKey] !== null) {
            if (varAncetre === 'racine') {
                varAncetre = varKey;
            }
            iterate(varJson[varKey], varKey, varAncetre, array, setArray);
            varAncetre = 'racine';
        } else if (
            //. si la clé est un string/number/boolean, on l'ajoute à la réponse
            typeof varJson[varKey] === 'string' ||
            typeof varJson[varKey] === 'number' ||
            typeof varJson[varKey] === 'boolean'
        ) {
            iterateObj.ancetre = varAncetre;
            iterateObj.parent = varParent;
            iterateObj.key = varKey;
            iterateObj.content = varJson[varKey];
            //. on remplit le tableau response avec les données
        }
        if (
            iterateObj.parent !== null ||
            iterateObj.key !== null ||
            iterateObj.content !== null
        ) {
            if (array.length === 0) {
                //. si response est vide, on le remplit
                setArray((prevState) => [...prevState, iterateObj]);
            } else {
                //   //. si response n'est pas vide, on le vide et on le remplit
                setArray([]);
                setTimeout(() => {
                    setArray((prevState) => [...prevState, iterateObj]);
                }, 500);
            }
        }
    }
};

module.exports = { iterate };
