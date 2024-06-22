$ = function(id){
    return document.getElementById(id);
}

resetFields = function(){
    $("x-axis").value = "";
    $("y-axis").value = "";
    $("x-title").value = "";
    $("y-title").value = "";
}

function onlyNumbers(array) {
    return array.every(element => {
      return !isNaN(element);
    });
  }

genLinePlot = function () {
    $("plotArea").innerHTML = "";
    let xArray = $("x-axis").value.split(',').map(Number);
    let yArray = $("y-axis").value.split(',').map(Number);
    console.log("only numbers in x data: "+onlyNumbers(xArray))
    if(onlyNumbers(xArray)==false || onlyNumbers(yArray)==false){
        $("plotArea").innerHTML = "<h2 class='w3-center w3-red'>There is an error in your data!!!<br/>A string or character is present</h2>";

    }
    else if(xArray.length !=yArray.length){
        $("plotArea").innerHTML = "<h2 class='w3-center w3-red'>There is an error in your data<br/>The sizes of the data for the x and y axis dont match</h2>";
        console.log("Array size missmatch");
    }
    else{
        console.log(xArray);
        let xArrayMin = Math.min.apply(null, xArray);
        let xArrayMax = Math.max.apply(null, xArray);;
        let yArrayMin = Math.min.apply(null, yArray);
        let yArrayMax = Math.max.apply(null, yArray);
        console.log("Min value in X array: "+xArrayMin);
        console.log(yArray)

        // Define Data
        var data = [{
            x: xArray,
            y: yArray,
            mode: "lines",
            type: "scatter"
        }];

        // Define Layout
        var layout = {
            xaxis: { range: [xArrayMin, xArrayMax], title: $("x-title").value },
            yaxis: { range: [yArrayMin, yArrayMax], title: $("y-title").value },
            title: $("chart-title").value
        };
        // Display using Plotly
        Plotly.newPlot("plotArea", data, layout);
    }
}

genBarPlot = function () {
    $("plotArea").innerHTML = "";
    let xArray = $("x-axis").value.split(', ');
    let yArray = $("y-axis").value.split(',').map(Number);
    console.log("X data: "+xArray)
    if(onlyNumbers(yArray)==false){
        $("plotArea").innerHTML = "<h2 class='w3-center w3-red'>There is an error in your numerical data!!!<br/>A string or character is present</h2>";

    }
    else if(xArray.length !=yArray.length){
        $("plotArea").innerHTML = "<h2 class='w3-center w3-red'>There is an error in your data<br/>The sizes of the data for the x and y axis dont match</h2>";
        console.log("Array size missmatch");
    }
    else{
        // Define Data
        var data = [{
            x: xArray,
            y: yArray,
            type: "bar"
        }];
        // Define Layout
        var layout = {
            title: $("chart-title").value,
            titlefont: {size: 30, color: 'red'},
            xaxis: {title: $("x-title").value},
            yaxis: {title: $("y-title").value}
        };
        // Display using Plotly
        Plotly.newPlot("plotArea", data, layout);
    }
}

genPiePlot = function () {
    $("plotArea").innerHTML = "";
    let xArray = $("x-axis").value.split(', ');
    let yArray = $("y-axis").value.split(',').map(Number);
    console.log("X data: "+xArray)
    if(onlyNumbers(yArray)==false){
        $("plotArea").innerHTML = "<h2 class='w3-center w3-red'>There is an error in your numerical data!!!<br/>A string or character is present</h2>";

    }
    else if(xArray.length !=yArray.length){
        $("plotArea").innerHTML = "<h2 class='w3-center w3-red'>There is an error in your data<br/>The sizes of the data for the x and y axis dont match</h2>";
        console.log("Array size missmatch");
    }
    else{
        // Define Data
        var data = [{
            labels: xArray, 
            values: yArray,
            hole: .4,
            type: "pie"
        }];
        // Define Layout
        var layout = {
            title: $("chart-title").value,
            titlefont: {size: 30, color: 'red'}
        };
        // Display using Plotly
        Plotly.newPlot("plotArea", data, layout);
    }
}

updateRadioButton = function(radioID){
    console.log("clicked radio button");
    if(radioID==1){
        $("lineLabel").classList.add('w3-text-blue');
        $("barLabel").classList.remove('w3-text-blue');
        $("pieLabel").classList.remove('w3-text-blue');
    }
    if(radioID==2){
        $("lineLabel").classList.remove('w3-text-blue');
        $("barLabel").classList.add('w3-text-blue');
        $("pieLabel").classList.remove('w3-text-blue');
    }
    if(radioID==3){
        $("lineLabel").classList.remove('w3-text-blue');
        $("barLabel").classList.remove('w3-text-blue');
        $("pieLabel").classList.add('w3-text-blue');
    }
    
}

window.onload = function(){
    $("clear").onclick = function() {resetFields();};
    $("submit").onclick = function() {
        if($("lineChart").checked==true){
            console.log("Line Chart Selected");
            genLinePlot();
        }
        if($("barChart").checked==true){
            console.log("Bar Chart Selected");
            genBarPlot();
        }
        if($("pieChart").checked==true){
            genPiePlot();
        }
    };
}