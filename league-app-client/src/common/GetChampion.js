//Parses championList json file for matching champion with given champion id
//Champion Id must be string
//Returns champion data from file
export const GetChampion = (championId) => {
    const championFile = require('../static_data/championList.json');
    for(let champion in championFile.data){
        if(championFile.data[`${champion}`].key === championId)
        {
            return championFile.data[`${champion}`];
        }
    }
    return championFile.data['Aatrox'];
}