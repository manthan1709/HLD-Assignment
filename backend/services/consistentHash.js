const cacheNodes = [
    "Node-1",
    "Node-2",
    "Node-3",
  ];
  
  const getCacheNode = (key) => {
    let hash = 0;
  
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
  
    return cacheNodes[
      hash % cacheNodes.length
    ];
  };
  
  module.exports = {
    getCacheNode,
  };