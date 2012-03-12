
(function ($) {

    var pie = gief_piechart('#pie1');
    var pie2 = gief_piechart('#pie2');

    $( "#slider" ).slider({
	value: 1,
	min: 1,
	max: 8,
	step: 1,
        width: '100px',
	slide: function( event, ui ) {
	    $( "#amount" ).html("Studying for "+ui.value+" years");
            pie(year_vs_pay(ui.value));
            pie2(year_vs_pay(ui.value-1));
	}
    });
    pie(year_vs_pay(1));
    pie(year_vs_pay(1));

    pie2(year_vs_pay(3));
    pie2(year_vs_pay(3));

})(jQuery);

/// DATA FUNCTIONS

function year_vs_pay(year) {
    var hourly_rate_labels = ['do 7€/h',
                              '7€/h do 13€/h',
                              '13€/h do 16€/h',
                              '16€/h do 20€/h',
                              '20€/h do 50€/h',
                              '50€/h do 80€/h',
                              'nad 80€/h'];

    var data = DATA.filter(function (item) { return item.years_study == year; }),
        fin_data = d3.range(7).map(function (i) {
            return {port: hourly_rate_labels[i],
                    octetTotalCount: 0};
        });
    data.map(function (item) { fin_data[item.hourly_rate-1].octetTotalCount += 1; });
    return fin_data;
}
