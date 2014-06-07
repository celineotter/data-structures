/*Graph._storage = {node1: {
              id: 'node1', 
              edges: {id : true}
              }
          }
*/
var Graph = function(){
  this._storage = {};
};

Graph.prototype.addNode = function(newNode, toNode){
  var checkNodesStorage = Object.keys(this._storage);

  this._storage[newNode] = {
    id: newNode,
    edges: {}
  };
  
  if (toNode){
    this.addEdge(newNode, toNode);
  }
  
  if (checkNodesStorage.length === 1 && toNode === undefined) {
    this.addEdge(newNode, checkNodesStorage[0]);
  }
};

Graph.prototype.contains = function(node) {
  return !!this._storage[node];
};

Graph.prototype.removeNode = function(node){
  if (this._storage[node]){
    delete this._storage[node];
  }
};

Graph.prototype.getEdge = function(fromNode, toNode){
  var result = false;
  var currentNode = this._storage[fromNode];
  
  if (this._storage[fromNode]['edges'][toNode]) {
    result = true;
  }

  return result;
};

Graph.prototype.addEdge = function(fromNode, toNode, context){
  this._storage[fromNode]['edges'][toNode] = true;
  this._storage[toNode]['edges'][fromNode] = true;
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  var main = this, check1, check2;

  var removeNodeEdge = function (nodeFrom, nodeTo) {
    delete nodeFrom['edges'][nodeTo['id']];

    var checkNodesStorage = Object.keys(nodeFrom['edges']);
    return checkNodesStorage.length <= 0 ? true : false;
  };

  check1 = removeNodeEdge(main._storage[fromNode], main._storage[toNode], main._storage);
  check2 = removeNodeEdge(main._storage[toNode], main._storage[fromNode], main._storage);
  if (check1) delete main._storage[fromNode];
  if (check2) delete main._storage[toNode];
 };