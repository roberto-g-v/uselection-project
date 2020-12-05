var votesIncrease = [{
  state: "Total (all 5 states)",
  vtotal: 17.49,
  vrepublican: 17.16,
  vdemocrat: 22.43,
  electorpt: 73,
  votingage:71.94

},
{
  state: "Arizona (AZ)",
  vtotal: "38.73*",
  vrepublican: 38.18,
  vdemocrat: "43.72*",
  electorpt: 11,
  votingage: "71.79*"
},
{
  state: "Georgia (GA)",
  vtotal: "19.29*",
  vrepublican: 15.84,
  vdemocrat: "25.67*",
  electorpt: "16*",
  votingage: 69.77
},
{
  state: "Michigan (MI)",
  vtotal: 13.41,
  vrepublican: 13.89,
  vdemocrat: 18.90,
  electorpt: "16*",
  votingage: "74.39*"
},
{
  state: "Pennsylvania (PA)",
  vtotal: 12.26,
  vrepublican: 12.58,
  vdemocrat: 15.97,
  electorpt: "20*",
  votingage: 69.86
},
{
  state: "Wisconsin (WI)",
  vtotal: 10.69,
  vrepublican: 12.46,
  vdemocrat: 15.23,
  electorpt: 10,
  votingage: "76.17*"
}
];

d3.select("tbody")
  .selectAll("tr")
  .data(votesIncrease)
  .enter()
  .append("tr")
  .html(function(d) {
    return `<td>${d.state}</td><td>${d.vtotal}</td><td>${d.vrepublican}</td><td>${d.vdemocrat}</td><td>${d.electorpt}</td><td>${d.votingage}</td>`;
  });
