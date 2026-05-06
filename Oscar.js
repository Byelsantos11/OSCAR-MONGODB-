//1.1
//R= 10889
db.Filme.countDocuments()


//1.2
//R= ACTOR, ACRESS, DIRECTOR, WRITER
db.Filme.distinct("category")

//1.3
//R= 96
db.Filme.find().skip(15).limit(1).sort({year_ceremony: -1})

//1.4
//R= 2024
db.Filme.find({}, { year_ceremony: 1, _id: 0 }).sort({ year_ceremony: -1 }).limit(1);

//1.5
//R= 96
db.Filme.distinct("ceremony").length


//Exploração Categoria

//2.1
//R= DIRECTOR: 469, ACTOR in supporting role: 440, SOUND: 245, FILME EDITING: 450
db.oscar_indicados.aggregate([
  { $group: { _id: "$category", total_indicacoes: { $sum: 1 } } },
  { $sort: { total_indicacoes: -1 } }
]);


//2.2
//R= DIRECTOR : 469
db.Filme.aggregate([
  { $group: { _id: "$category", total_indicacoes: { $sum: 1 } } },
{ $sort: { total_indicacoes: -1 } },
{ $limit: 1}
]);

//2.3
//R= GORDON E. SAWYER AWAR: 1
db.Filme.aggregate([
  { $group: { _id: "$category", total_indicacoes: { $sum: 1 } } },
  { $sort: { total_indicacoes: 1 } },
  { $limit: 1 }
]);


//2.4
//R= 1976
db.Filme.find({ category: "ACTRESS" }, { year_ceremony: 1, _id: 0 }).sort({ year_ceremony: -1 }).limit(1)

//2.5
//R= WRITING (Adaptation) :1928 - 1935, UNIQUE AND ARTISTIC PICTURE: 1928 - 1928, ART DIRECTION: 1928 - 2012
db.Filme.aggregate([
  { $group: { _id: "$category", min_year: { $min: "$year_ceremony" },
    max_year: { $max: "$year_ceremony" } } },
])


//2.6
//R= DIRECTIONG, DIRETING (Comedy Picture), DIRECTING, DIRECTING (Dramatic Picture)
db.oscar_indicados.distinct("category", { category: /DIRECTING/ });


//Atores e Atrizes

//3.1
//R= 3
db.Filme.countDocuments({name: "Natalia Portman"})

//3.2
//R= 1
db.Filme.countDocuments({name: "Natalia Portman", winner: true})

//3.3