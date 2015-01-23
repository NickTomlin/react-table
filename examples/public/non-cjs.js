(function awesomeIFFE () {
  var data = [
    {favoriteColor:'blue',  age: 30, name: "Athos",      job: "Musketeer"},
    {favoriteColor: 'red' ,  age: 33, name: "Porthos",    job: "Musketeer"},
    {favoriteColor: 'blue' ,  age: 27, name: "Aramis",     job: "Musketeer"},
    {favoriteColor: 'orange' ,  age: 25, name: "d'Artagnan", job: "Guard"}
  ];

  var myTable = React.createFactory(ReactTable)

  React.render(myTable({data: data}, null), document.querySelector('#content'));
})();
