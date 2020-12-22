function cons(inorder, preorder) {
    if (isEmpty(inorder) || isEmpty(preorder)) return null
  
    if (size(inorder) === 1 && size(preorder) === 1)
      return {value: inorder[0], left: null, right: null};
  
    var leftSize = inorder.indexOf(head(preorder));
  
    return {
      value: preorder[0],
      left: cons(take(inorder, leftSize), take(tail(preorder), leftSize)),
      right: cons(drop(inorder, leftSize + 1), drop(tail(preorder), leftSize))
    };
  }
  
  function head(xs) {
    return xs[0];
  }
  
  function size(xs) {
    return xs.length;
  }
  
  function isEmpty(xs) {
      if(xs==undefined){
          return true;
      }
    return xs.length===0;
  }
  
  function take(xs, i) {
    return xs.slice(0, i);
  }
  
  function drop(xs, i) {
    return xs.slice(i);
  }
  
  function tail(xs) {
    return xs.slice(1);
  }
  

  function getPostOrder(tree){
    let str='';
    function postOrderHelper(root) {
        if (root !== null) {
           postOrderHelper(root.left);
           postOrderHelper(root.right);
          str+=root.value;
        }
     }
     postOrderHelper(tree)
    return str;
}

var input = require('fs').readFileSync('dev/stdin', 'utf8');
var lines = input.split('\n');
lines.forEach(test=>{
    let [preorder,inorder]=test.split(' ');
    let tree = cons(inorder, preorder);
    console.log(getPostOrder(tree));
    //console.log('\n')
})



  
  
