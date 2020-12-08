function plot_cloud(data) {

    var chart;
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end



        chart = am4core.create("wordcloud", am4plugins_wordCloud.WordCloud);

        var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());


        series.accuracy = 4;
        series.step = 20
        series.rotationThreshold = 0;
        series.labels.template.tooltipText = "{word}:\n[bold]{value} placed[/]";
        series.fontFamily = "Courier New";

        series.data = data;
        series.dataFields.word = "tag";
        series.dataFields.value = "weight";
        series.dataFields.urlval = "urlval"
        series.labels.template.url = "/table/?company={urlval}";
        series.labels.template.urlTarget = "_blank";

        // series.minfontsize = ;
        // series.maxfontsize = 70;
        series.heatRules.push({
            "target": series.labels.template,
            "property": "fill",
            "min": am4core.color("#00008B"),
            "max": am4core.color("#d2222d"),
            "dataField": "value"
        });
        chart.logo.disabled = true
        chart.logo.height = -15000;
    }); // end am4core.ready()


}

plot_cloud(data5);