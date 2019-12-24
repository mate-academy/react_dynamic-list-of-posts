const getDataFromServer = URL => fetch(URL).then(dataList => dataList.json());

export default getDataFromServer;
