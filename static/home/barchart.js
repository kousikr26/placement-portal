function updateBarChart(data) {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_kelly);
        am4core.useTheme(am4themes_animated);
        // Themes end


        var chart = am4core.create("barchart", am4charts.XYChart);

        chart.data = data;
        chart.responsive.enabled = true;
        // chart.padding(40, 40, 40, 40);

        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "group";
        categoryAxis.renderer.minGridDistance = 0;
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.inversed=true;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.renderer.labels.template.rotation = 0;
        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.title.text = "% Placed";
        valueAxis.title.fontSize = 20;
        valueAxis.title.fontWeight = "bold";

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "group";
        series.dataFields.valueX = "value";
        series.dataFields.num = "num"
        series.dataFields.den = "den"
        series.columns.template.hoverOnFocus = true;
        series.columns.template.tooltipText = "{group} :\n{num} out of {den} placed ({valueX}%)"
        series.columns.template.pointerOrientation="right";
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusTopRight = 5;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        //series.interpolationDuration = 1500;
        //series.interpolationEasing = am4core.ease.linear;
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        
        
        labelBullet.label.fontSize=am4core.percent(80);
        labelBullet.label.text = "{valueX}%";

        chart.zoomOutButton.disabled = false;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });


        categoryAxis.sortBySeries = series;
        chart.logo.disabled = true
        chart.logo.height = -15000;
    });
}
updateBarChart(data3) 