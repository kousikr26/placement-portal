function plot_cloud(data) {

    var chart;
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end



        chart = am4core.create("wordcloud", am4plugins_wordCloud.WordCloud);

        var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());


        series.accuracy = 4;
        series.step = Math.round((2*width+1100)/91.0);
        series.rotationThreshold = 0;
        series.labels.template.tooltipText = "{word}:\n[bold]{value} placed[/]";
        series.fontFamily = "Inter Regular";

        series.data = data;
        series.dataFields.word = "tag";
        series.dataFields.value = "weight";
        series.dataFields.urlval = "urlval"
        series.labels.template.url = "/placement-stats/table/?company={urlval}";
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
