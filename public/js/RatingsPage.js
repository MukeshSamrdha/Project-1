function getshipmentdetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const shipmentid = urlParams.get('shipmentid');
    return shipmentid;
}

let response1=fetch("/ShipmentDetails?id=" + getshipmentdetails(), {
    method: "GET",
    headers:{"Content-Type":"application/json"}
})
response1.then((result) => {
    result.json().then((result) => {
        console.log(result);
        document.querySelector("#fromaddress").innerHTML = result.fhno+","+result.fcolony+","+ result.fcity+","+result.fstate;
        document.querySelector("#bestprices").innerHTML = result.bestprice;
        document.querySelector("#weight").innerHTML = result.weight;
        document.querySelector("#pud").innerHTML = result.pud.slice(0, 10);
        document.querySelector("#toaddress").innerHTML = result.thno + "," + result.tcolony + "," + result.fcity + "," + result.fstate;
        document.querySelector("#dimensions").innerHTML = result.length + 'x' + result.width + 'x' + result.height;
    })
})