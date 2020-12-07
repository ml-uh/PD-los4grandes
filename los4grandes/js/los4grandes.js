var cols = {
	"m-ocup": 'rgb(177,7,47)',
	"m-no-ocup": 'rgb(255,148,150)',	
	"h-ocup": 'rgb(8,47,154)',
	"h-no-ocup": 'rgb(150,185,255)',	
}



$.getJSON("los4grandes/data/rosters.json", function(data){
	var indPlayers = data["ind"]["año"];
	var stgPlayers = data["stg"]["año"];
	var prPlayers = data["pr"]["año"];
	var vcPlayers = data["vc"]["año"];
	SetPlayerstable(40);
	
	function SetPlayerstable(){
		var element = document.getElementById("erase-table");
		if(element != null)
		{
			element.parentNode.removeChild(element);
		}
		var players = indPlayers;
		var table = '';
		var currentYear = parseInt($('#year').val());
		table = table + '<tr><td class="male-text center" id="erase-table">Serie '+currentYear+'</td></tr>';
		if($('#btn-stg').hasClass('check'))
		{
			players = stgPlayers;
		}
		if($('#btn-pr').hasClass('check'))
		{
			players = prPlayers;
		}
		if($('#btn-vl').hasClass('check'))
		{
			players = vcPlayers; 
		}
		for(var i in players[`${currentYear+1960}-${currentYear+1961}`])
		{
			table = table + '<tr><td class="male-text" id="erase-table">'+players[`${currentYear+1960}-${currentYear+1961}`][i]['Name']+'</td></tr>';
		}
		$('#tabla-1').html(table);
		table = '';
		var currentNextYear = currentYear;
		currentNextYear++;
		table = table + '<tr><td class="male-text center" id="erase-table">Serie '+(currentNextYear)+'</td></tr>';
		for(var i in players[`${currentYear+1961}-${currentYear+1962}`])
		{
			table = table + '<tr><td class="male-text" id="erase-table">'+players[`${currentYear+1961}-${currentYear+1962}`][i]['Name']+'</td></tr>';
		}
		table = table + '<tr><td class="male-text center" id="erase-table">Retirados</td></tr>';
		for(var i in players[`${currentYear+1960}-${currentYear+1961}`])
		{
			var left = true;
			for(var j in players[`${currentYear+1961}-${currentYear+1962}`])
			{
				if(players[`${currentYear+1960}-${currentYear+1961}`][i]['Name'] == players[`${currentYear+1961}-${currentYear+1962}`][j]['Name'])
				{
					left = false;
					break;
				}
			}
			if(left)
			{
				if(players[`${currentYear+1960}-${currentYear+1961}`][i]['Url'] == null)
				{
					table = table + '<tr><td class="male-text left-team" id="erase-table">'+players[`${currentYear+1960}-${currentYear+1961}`][i]['Name']+'</td></tr>';
				}
				else
				{
					table = table + '<tr><td class="male-text left-team" id="erase-table"><a href="'+players[`${currentYear+1960}-${currentYear+1961}`][i]['Url']+'">'+players[`${currentYear+1960}-${currentYear+1961}`][i]['Name']+'</a></td></tr>';
				}
			}
		}	
		$('#tabla-2').html(table);
	}
	$('#year').on('change',function(e){
		SetPlayerstable();
	});
	
}),



$.getJSON("los4grandes/data/posiciones.json",function(data){
	var years = [];
	for(var i in data['posiciones']){
		years.push(i);
	}
	years.sort();
	years = ['Serie'].concat(years);
	var industriales = ['Industriales'];
	var santiago = ['Santiago de Cuba']
	var villa = ['Villa Clara']
	var pinar = ['Pinar del Río']
	for(var i=1;i<years.length;i++){
		var y = years[i];
		posInd = data['posiciones'][y]['ind'];
		if(posInd > 8){
			industriales.push(posInd)
		}
		else{
			industriales.push(posInd);
		}
		posStg = data['posiciones'][y]['stg']
		santiago.push(posStg)
		posVl = data['posiciones'][y]['vl']
		villa.push(posVl)
		posPr = data['posiciones'][y]['pr']
		pinar.push(posPr)
	}
	
	function setCantGraphs(){
		c3.generate({
            bindto: "#graph-ind",
            data: {
              x : 'Serie',
              columns: [
				years,
				industriales
			  ],
			  colors: {
				  industriales: '#1D62AB'
			  }
            },
            
            axis: {
              x: {
                label: 'Serie Nacional',
                min: 40,
                max: 59
              },
              y: {
                label: 'Posición',
                min: 10,
                max: 1,
              }
            }
		});  
		c3.generate({
            bindto: "#graph-stg",
            data: {
              x : 'Serie',
              columns: [
				years,
				santiago
			  ],
			  colors: {
				  santiago: '#E40915'
			  }
            },
            
            axis: {
              x: {
                label: 'Serie Nacional',
                min: 40,
                max: 59
              },
              y: {
                label: 'Posición',
                min: 10,
                max: 1,
              }
            }
		});  
		c3.generate({
            bindto: "#graph-vl",
            data: {
              x : 'Serie',
              columns: [
				years,
				villa
			  ],
            },
            
            axis: {
              x: {
                label: 'Serie Nacional',
                min: 40,
                max: 59
              },
              y: {
                label: 'Posición',
                min: 10,
                max: 1,
              }
            }
		});  
		c3.generate({
            bindto: "#graph-pr",
            data: {
              x : 'Serie',
              columns: [
				years,
				pinar
			  ]
            },
            
            axis: {
              x: {
                label: 'Serie Nacional',
                min: 40,
                max: 59
              },
              y: {
                label: 'Posición',
                min: 10,
                max: 1,
              }
            }
		});  
		
		 
	}
		
		
		$('#graph-all-stg').hide();
		$('#graph-all-vl').hide();
		$('#graph-all-pr').hide();
		setCantGraphs();
		
		$('#btn-ind').click(function(e){
			if (!$('#btn-ind').hasClass('check')) {
				if ($('#btn-stg').hasClass('check')) {
					$('#btn-stg').removeClass('check');
				}
				if ($('#btn-vl').hasClass('check')) {
					$('#btn-vl').removeClass('check');
				}
				if ($('#btn-pr').hasClass('check')) {
					$('#btn-pr').removeClass('check');
				}
				$('#btn-ind').addClass('check');
				$('#graph-all-ind').show();
				$('#graph-all-stg').hide();
				$('#graph-all-vl').hide();
				$('#graph-all-pr').hide();
			}
			setCantGraphs();
			SetPlayerstable();
		});

		$('#btn-stg').click(function(e){
			if (!$('#btn-stg').hasClass('check')) {
				if ($('#btn-ind').hasClass('check')) {
					$('#btn-ind').removeClass('check');
				}
				if ($('#btn-vl').hasClass('check')) {
					$('#btn-vl').removeClass('check');
				}
				if ($('#btn-pr').hasClass('check')) {
					$('#btn-pr').removeClass('check');
				}
				$('#btn-stg').addClass('check');
				$('#graph-all-stg').show();
				$('#graph-all-ind').hide();
				$('#graph-all-vl').hide();
				$('#graph-all-pr').hide();
			}
			setCantGraphs();
			SetPlayerstable();
		});

		$('#btn-vl').click(function(e){
			if (!$('#btn-vl').hasClass('check')) {
				if ($('#btn-stg').hasClass('check')) {
					$('#btn-stg').removeClass('check');
				}
				if ($('#btn-ind').hasClass('check')) {
					$('#btn-ind').removeClass('check');
				}
				if ($('#btn-pr').hasClass('check')) {
					$('#btn-pr').removeClass('check');
				}
				$('#btn-vl').addClass('check');
				$('#graph-all-vl').show();
				$('#graph-all-stg').hide();
				$('#graph-all-ind').hide();
				$('#graph-all-pr').hide();
			}
			setCantGraphs();
			SetPlayerstable();
		});

		$('#btn-pr').click(function(e){
			if (!$('#btn-pr').hasClass('check')) {
				if ($('#btn-stg').hasClass('check')) {
					$('#btn-stg').removeClass('check');
				}
				if ($('#btn-vl').hasClass('check')) {
					$('#btn-vl').removeClass('check');
				}
				if ($('#btn-ind').hasClass('check')) {
					$('#btn-ind').removeClass('check');
				}
				$('#btn-pr').addClass('check');
				$('#graph-all-pr').show();
				$('#graph-all-stg').hide();
				$('#graph-all-vl').hide();
				$('#graph-all-ind').hide();
			}
			setCantGraphs();
			SetPlayerstable();
		});
});
