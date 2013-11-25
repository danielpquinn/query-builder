require.config({
  paths: {
    'bootstrap': '../vendor/bootstrap/dist/js/bootstrap',
    'jquery': '../vendor/jquery/jquery',
    'underscore': '../vendor/underscore/underscore',
    'backbone': '../vendor/backbone/backbone',
    'backbone-relational': '../vendor/Backbone-relational/backbone-relational',
    'd3': '../vendor/d3/d3'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    'backbone-relational': {
      deps: ['backbone']
    },
    'd3': {
      exports: 'd3'
    }
  }
});

require([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'backbone-relational',
  'bootstrap'
], function ($, _, Backbone, d3) {

  var models = {};
  Backbone.Relational.store.addModelScope(models);

  models.Family = Backbone.RelationalModel.extend({
    urlRoot: '/family/',
    relations: [{
      type: Backbone.HasMany,
      key: 'children',
      relatedModel: 'Character',
      collectionType: CharacterCollection,
      reverseRelation: {
        key: 'childOf',
        includeInJSON: 'id'
      }
    }, {
      type: Backbone.HasMany,
      key: 'parents',
      relatedModel: 'Character',
      collectionType: CharacterCollection,
      reverseRelation: {
        key: 'parentOf',
        includeInJSON: 'id'
      }
    }]
  });

  models.Character = Backbone.RelationalModel.extend({
    urlRoot: '/character/',
    name: function () {
      return this.get('firstName') + ' ' + this.get('lastName');
    },
    relations: [{
      type: Backbone.HasMany,
      key: 'likes',
      relatedModel: 'Character',
      collectionType: CharacterCollection
    }, {
      type: Backbone.HasMany,
      key: 'dislikes',
      relatedModel: 'Character',
      collectionType: CharacterCollection
    }, {
      type: Backbone.HasMany,
      key: 'praysFor',
      relatedModel: 'Character',
      collectionType: CharacterCollection
    }, {
      type: Backbone.HasMany,
      key: 'friends',
      relatedModel: 'Character',
      collectionType: CharacterCollection
    }, {
      type: Backbone.HasMany,
      key: 'fans',
      relatedModel: 'Character',
      collectionType: CharacterCollection
    }, {
      type: Backbone.HasMany,
      key: 'neighbors',
      relatedModel: 'Character',
      collectionType: CharacterCollection
    }]
  });

  var CharacterCollection = Backbone.Collection.extend({
    model: 'Character'
  });

  models.Place = Backbone.RelationalModel.extend({
    relations: [{
      type: Backbone.HasMany,
      key: 'residents',
      relatedModel: 'Character',
      collectionType: CharacterCollection,
      reverseRelation: {
        key: 'livesIn',
        includeInJSON: 'id'
      }
    }]
  });

  models.School = Backbone.RelationalModel.extend({
    relations: [{
      type: Backbone.HasMany,
      key: 'students',
      relatedModel: 'Character',
      collectionType: CharacterCollection,
      reverseRelation: {
        key: 'attends',
        includeInJSON: 'id'
      }
    }, {
      type: Backbone.HasMany,
      key: 'employees',
      relatedModel: 'Character',
      collectionType: CharacterCollection,
      reverseRelation: {
        key: 'worksAt',
        includeInJSON: 'id'
      }
    }]
  });

  var abesFamily = new models.Family({
    name: 'Abe\'s family'
  }),
  homersFamily = new models.Family({
    name: 'Homer\'s family'
  });

  var springfield = new models.Place({
    name: 'Springfield'
  });

  var springfieldElementary = new models.School({
    name: 'Springfield Elementary'
  });

  var abeSimpson = new models.Character({
    firstName: 'Abe',
    lastName: 'Simpson',
    livesIn: springfield
  }),
  homerSimpson = new models.Character({
    firstName: 'Homer',
    lastName: 'Simpson',
    livesIn: springfield
  }),
  margeSimpson = new models.Character({
    firstName: 'Marge',
    lastName: 'Simpson',
    livesIn: springfield
  }),
  lisaSimpson = new models.Character({
    firstName: 'Lisa',
    lastName: 'Simpson',
    livesIn: springfield,
    attends: springfieldElementary
  }),
  seymoreSkinner = new models.Character({
    firstName: 'Seymore',
    lastName: 'Skinner',
    livesIn: springfield,
    worksAt: springfieldElementary
  }),
  ottoMann = new models.Character({
    firstName: 'Otto',
    lastName: 'Mann',
    livesIn: springfield,
    worksAt: springfieldElementary
  }),
  troyMcClure = new models.Character({
    firstName: 'Troy',
    lastName: 'McClure',
    livesIn: springfield
  }),
  krustyTheClown = new models.Character({
    firstName: 'Herschel',
    lastName: 'Krustofski',
    livesIn: springfield
  }),
  nedFlanders = new models.Character({
    firstName: 'Ned',
    lastName: 'Flanders',
    livesIn: springfield
  }),
  clancyWiggum = new models.Character({
    firstName: 'Clancy',
    lastName: 'Wiggum',
    livesIn: springfield
  }),
  nelsonMuntz = new models.Character({
    firstName: 'Nelson',
    lastName: 'Muntz',
    livesIn: springfield,
    attends: springfieldElementary
  }),
  nelsonMuntz = new models.Character({
    firstName: 'Nelson',
    lastName: 'Muntz',
    livesIn: springfield,
    attends: springfieldElementary
  });

  abeSimpson.get('friends').add(seymoreSkinner);
  abeSimpson.get('dislikes').add(krustyTheClown);

  homerSimpson.get('neighbors').add(nedFlanders);
  homerSimpson.get('friends').add([nedFlanders, ottoMann, clancyWiggum]);

  nedFlanders.get('neighbors').add([lisaSimpson, homerSimpson, margeSimpson]);
  nedFlanders.get('praysFor').add(springfield.get('residents').models);

  krustyTheClown.get('friends').add(troyMcClure);
  krustyTheClown.get('fans').add(lisaSimpson);
  krustyTheClown.get('fans').add(nelsonMuntz);
  
  troyMcClure.get('fans').add(abeSimpson);
  troyMcClure.get('fans').add(krustyTheClown);

  lisaSimpson.get('friends').add(ottoMann);
  lisaSimpson.get('neighbors').add(nedFlanders);
  lisaSimpson.get('likes').add(nelsonMuntz);

  homersFamily.get('parents').add([margeSimpson, homerSimpson]);
  homersFamily.get('children').add([lisaSimpson]);

  abesFamily.get('parents').add(abeSimpson);
  abesFamily.get('children').add(homerSimpson);

  var residents = springfield.get('residents');

  var width = 818,
  height = 600;

  var color = d3.scale.category20();

  var force = d3.layout.force()
    .charge(-400)
    .linkDistance(100)
    .size([width, height]);

  var svg = d3.select('.map-container').append('svg')
    .attr('width', width)
    .attr('height', height);

  var graph = {
    nodes: springfield.get('residents').toJSON(),
    links: []
  };

  force
    .nodes(graph.nodes)
    .links(graph.links)
    .start();

  var link = svg.selectAll('.link')
    .data(graph.links)
    .enter().append('link')
    .attr('class', 'link');

  var gnodes = svg.selectAll('.node')
    .data(graph.nodes)
    .enter().append('g');

  var node = gnodes.append('circle')
    .attr('class', 'node')
    .attr('r', 45)
    .style('fill-opacity', 0.5)
    .style('fill', function (d) {
      return '#E64225';
    });

  var labels = gnodes.append('text')
    .attr('text-anchor', 'middle')
    .text(function (d) {
      return d.firstName + ' ' + d.lastName;
    });

  force.on('tick', function () {
    link.attr('x1', function (d) { return d.source.x; })
      .attr('y1', function (d) { return d.source.y; })
      .attr('x2', function (d) { return d.target.x; })
      .attr('y2', function (d) { return d.target.y; });

    gnodes.attr('transform', function (d) {
      return 'translate(' + [d.x, d.y] + ')';
    });
  });

  var $connection = $('#connection');

  $connection.on('change', function (e) {

    svg.selectAll('.link').remove();
    graph.links = [];
    force.links(graph.links).start();

    residents.each(function (resident) {
      var connection = resident.get($connection.val());

      connection.each(function (character) {
        graph.links.push({
          'source': residents.indexOf(resident),
          'target': residents.indexOf(character)
        });
      });
    });

    force.links(graph.links).start();

    link = svg.selectAll('.link')
      .data(graph.links)
      .enter().append('line')
      .attr('class', 'link');

    gnodes.each(function () {
      this.parentNode.appendChild(this);
    });
  });

  $connection.trigger('change');

});