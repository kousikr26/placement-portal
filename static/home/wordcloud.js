function plot_cloud(data){
    
    var chart;
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        
        
        chart = am4core.create("wordcloud", am4plugins_wordCloud.WordCloud);
        var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());


        series.accuracy = 4;
        series.step = 100;
        series.rotationThreshold = 0;
        series.maxCount = 200;
        series.labels.template.tooltipText = "{word}:\n[bold]{value} placed[/]";
        series.fontFamily = "Courier New";
        series.maxFontSize = am4core.percent(30);
        series.data = data;
        series.dataFields.word = "tag";
        series.dataFields.value = "weight";
        series.dataFields.urlval = "urlval"
        series.labels.template.url = "http://127.0.0.1:8000/home/table/?company={urlval}";
        series.labels.template.urlTarget = "_blank";

        series.minfontsize = 70;
        series.maxfontsize = 70;
        series.heatRules.push({
            "target": series.labels.template,
            "property": "fill",
            "min": am4core.color("#00008B"),
            "max": am4core.color("#d2222d"),
            "dataField": "value"
        });

    }); // end am4core.ready()


}

plot_cloud(data5);