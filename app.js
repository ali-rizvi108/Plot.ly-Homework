function metaData(sample){
    d3.json("samples.json").then((data)=>{
        var metaData = data.metadata;
        var array = metaData.filter(object => object.id==sample);
        var result = array[0];

        console.log("result", `${result}`);

        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });   
    });
}

function unpack(rows, index) {
    return rows.map(function(row) {
        if(row.id === index){
            return row; 
        }
      
    });
  }

  d3.json('samples.json').then(function(data) {
    // console.log(data);
    // makeBarChart(data);
    // var dates = unpack(data.samples.data, 0); 
    const selectDropDownIds = [],sample_valuesArray=[];
    data.samples.forEach(element => {
        selectDropDownIds.push(element.id);
    });
    data.samples.forEach(element => {
        sample_valuesArray.push(element.sample_values);
    });
    // console.log('sample values array',sample_valuesArray);
    const selectDropdown  = document.getElementById('selDataset');
    let index=0;
    for (var i =0;i<selectDropDownIds.length; i++){
        var opt = document.createElement("option");
        
        opt.innerHTML = selectDropDownIds[i]; // whatever property it has

        // then append it to the select element
        selectDropdown.appendChild(opt);
    }
    // console.log('sleectDropdwonids',selectDropDownIds);
});

function optionChanged (value){
    var selectedIdData={};
    // console.log('selected value from dropdown',value);
    d3.json('samples.json').then(function(data) {
        for (var i =0; i< data.samples.length;i++){
            if(data.samples[i].id === value){
                console.log('selected id details',data.samples[i])
                selectedIdData = data.samples[i];
                // console.log(selectedIdData);
            }
        }
        makeBarChart(selectedIdData);
        metaData(selectedIdData.id);

    })
 
}

function makeBarChart(selectedIdData){
        // console.log('selelctedIdData', selectedIdData);
        const slicedData = selectedIdData.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`);
        ///cconst yAxisData=  slicedData.forEach((value)=>'OTU '+value);
        var trace2 = {
            y: slicedData,
            x: selectedIdData.sample_values.slice(0,10),
            text:selectedIdData.otu_labels.slice(0,10),
            //name: "Roman",
            type: "bar",
            orientation: 'h'
          };
        const data  = [trace2];
  /// AApply the group barmode to the layout
//   var layout = {
//     title: "Belly Button BioDiversity",
//     showLegend:false

//   };
 var layout = {barmode: 'stack'}; 
  /// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", data, layout,{displayModeBar: true}); 

var bubbleData = [
    {
        x: selectedIdData.otu_ids,
        y: selectedIdData.sample_values,
        text: selectedIdData.otu_labels,
        mode: "markers",
        marker: {
            size: selectedIdData.sample_values,
            color: selectedIdData.otu_ids,
            colorscale: "Earth"
        } 

    }
];
Plotly.newPlot("bubble", bubbleData)


} 

//example of graph
// bars = hv.Bars([('Australia', 10), ('United States', 14), ('United Kingdom', 7)], 'Country')
//(bars.relabel('Invert axes').opts(invert_axes=True, width=400) +
//  bars.relabel('Invert x-axis').opts(invert_xaxis=True) +
//  bars.relabel('Invert y-axis').opts(invert_yaxis=True)).opts(shared_axes=False)


