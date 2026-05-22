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
//R= Closer - 2005, Black Swan - 2011, Jackie - 2017
db.Filme.find({name: "Natalia Portman"}, {year_ceremony: 1, film: 1, _id: 0})

//3.4
//R= Filme: Black Swan, Year: 2011, Category: ACTRESS IN A LEADING ROLE WINNER: true
//R= Filme: Jackie, Year: 2017, Category: ACTRESS IN A LEADING ROLE WINNER: false
//R= Filme: Closer, Year: 2005, Category: ACTRESS IN A SUPPORTING ROLE WINNER: false
db.Filme.find({name: "Natalia Portman"},
  {year_ceremony: 1, category: 1, film: 1, winner: 1, _id: 0}
)

//3.5
//R= 4
db.Filme.countDocuments({name: "Viola Davis"})

//3.6
//R= 1
db.Filme.countDocuments({name: "Viola Davis", winner: true})

//3.7
//R= Fences, The Help, Doubt, Ma Rainey's Black Bottom
db.Filme.find({name: "Viola Davis"}, { film: 1, _id: 0})

//3.8
//R = 0
db.Filme.countDocuments({ name: "Amy Adams", winner: true });

//3.9
//R= 6
db.Filme.countDocuments({ name: "Amy Adams"});

//3.10
//R= 2
db.Filme.countDocuments({name: "Denzel Washington", winner: true})


//3.11
//R= 9
db.Filme.countDocuments({name: "Denzel Washington"})

//3.12
//R= Filme: Cry Freedom, Year: 1988, Category: ACTOR IN A SUPPORTING ROLE WINNER: false
//R= Filme: Glory, Year: 1990, Category: ACTOR IN A SUPPORTING ROLE WINNER: true
//R= Filme: Malcolm X, Year: 1993, Category: ACTOR IN A LEADING ROLE WINNER: false
db.Filme.find({name: "Denzel Washington"},
  {year_ceremony: 1, category: 1, film: 1, winner: 1, _id: 0}
)

//4.1
//R= Ano: 1928 Filme: 7th Heaven. Atriz: Janet Gaynor
db.oscar_indicados.find(
  { category: "ACTRESS", winner: true }, 
  { name: 1, year_ceremony: 1, film: 1, _id: 0 }
).sort({ year_ceremony: 1 }).limit(1);

//4.2
//R= Ano: 1928 Filme: The Last Command Ator: Emil Jannings
db.Filme.find(
  { category: "ACTOR", winner: true }, 
  { name: 1, year_ceremony: 1, film: 1, _id: 0 }
).sort({ year_ceremony: 1 }).limit(1);

// 4.3
//R= 2455
db.oscar_indicados.countDocuments({ winner: true });

//4.4
//R= Ano cerimonia: 1979, Categoria: 'BEST PICTURE', Filme: 'The Deer Hunter'
//R= Ano cerimonia: 19, Categoria: 'OUTSTANDING PICTURE', Filme: 'Wings'
db.oscar_indicados.find(
  { 
    category: { $in: ["OUTSTANDING PICTURE", "BEST PICTURE"] },
    winner: true 
  }, 
  { year_ceremony: 1, category: 1, film: 1, _id: 0 }
);

//4.5
//R= 1328
db.oscar_indicados.distinct("film", { winner: true }).length;

 //5.1
//R= Jane Fonda: 7, Greer Garson: 7, Robert De Niro: 8
db.Filme.aggregate([
  { $match: { category: /ACTOR|ACTRESS/} },
  { $group: { _id: "$name", total_indicacoes: { $sum: 1 } } },
  { $match: { total_indicacoes: { $gt: 1 } } },
  { $sort: { total_indicacoes: -1 } }
]);

//5.2
//R= Meryl Streep: 21
db.Filme.aggregate([
{ $match: { category: /ACTOR|ACTRESS/} },
{$group: { _id: "$name", total_indicacoes: { $sum: 1 } } },
{$sort: { total_indicacoes: -1 } },
{ $limit: 1 }
])

//5.3
//R= Barbara Stanwyck, Charles Boyer, 'Rosalind Russell, Marsha Mason
db.Filme.aggregate([
  { $match: { category: /ACTOR|ACTRESS/ } },
  { 
    $group: { 
      _id: "$name", 
      total_indicacoes: { $sum: 1 },
      total_vitorias: { $sum: { $cond: ["$winner", 1, 0] } } 
    } 
  },
  { $match: { total_vitorias: 0 } },
  { $sort: { total_indicacoes: -1 } }
]);

//5.4
//R= Oliver Wallace, entre outros
db.Filme.aggregate([
  {
    $group: {
      _id: "$name",
      categorias: { $addToSet: "$category" }
    }
  },
  {
    $project: {
      categorias: 1,
      qtdCategorias: { $size: "$categorias" }
    }
  },
  {
    $match: {
      qtdCategorias: { $gt: 1 }
    }
  },
  {
    $sort: {
      qtdCategorias: -1,
      _id: 1
    }
  }
])

//5.5
//R= 5622
db.Filme.aggregate([
  {
    $group: {
      _id: "$name",
      totalIndicacao: { $sum: 1 }
    }
  },
  {
    $match: {
      totalIndicacao: 1
    }
  },
  {
    $count: "qtdIndicadosCom1Indicacao"
  }
])

//5.6
//R= Ano: 1944 Total pessoas: 164
db.oscar.aggregate([
  {
    $group: {
      _id: {
        ano: "$year_ceremony",
        nome: "$name"
      }
    }
  },
  {
    $group: {
      _id: "$_id.ano",
      totalPessoas: { $sum: 1 }
    }
  },
  {
    $sort: {
      totalPessoas: -1
    }
  },
  {
    $limit: 1
  }
])

//6.1
//R= 2011 e 2020
db.Filme.aggregate([
  {
    $match: {
      film: /Toy Story/i,
      winner: true
    }
  },
  {
    $group: {
      _id: "$year_ceremony"
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
])

//6.2
//R=11
db.Filme.aggregate([
  {
    $match:{
      film: /Toy Story/i
    }
  },
  {
    $count: "totalIndicacoes"
  }
])

//6.2
//R= 11
db.Filme.aggregate([
  {
    $match: {
      film: /Toy Story/i
    }
  },
  {
    $count: "totalIndicacoes"
  }
])

//6.3
//R= Animated Feature Film, Best Picture, Sound Editing, entre outros
db.Filme.aggregate([
  {
    $match:{
      film: /Toy Story/i
    }
  },
  {
    $group:{
      _id: "$category"
    }
  },
  {
    $sort:{
      _id:1
    }
  }
])

//6.4
//R= 2006 -78
db.Filme.aggregate([
  {
    $match: {
      film: "Crash"
    }
  },
  {
    $group: {
      _id: "$ceremony",
      anoCeremony: { $first: "$year_ceremony" }
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
])

//6.5
//R= 6
db.Filme.aggregate([
  {
    $match: {
      film: "Crash"
    }
  },
  {
    $count: "totalIndicacoes"
  }
])

//6.6
//R=Ganhou em 2006
db.Filme.find({
  film: "Crash",
  category: "BEST PICTURE",
  winner: true
})

//6.7
//R= Não existe
db.Filme.findOne({
  film: "Central do Brasil"
})

//6.8
//R=Não existe
