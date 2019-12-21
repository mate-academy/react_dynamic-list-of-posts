const GetDataFromServer = URL => fetch(URL).then(dataList => dataList.json());

export default GetDataFromServer;
