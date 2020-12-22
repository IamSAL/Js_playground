class Node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.right = right;
        this.left = left;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
        } else {
            let current = this.root;
            while (true) {
                if (value > current.value) {
                    if (current.right === null) {
                        current.right = new Node(value);
                        break;
                    } else {
                        current = current.right;
                    }
                } else if (value < current.value) {
                    if (current.left === null) {
                        current.left = new Node(value);
                        break;
                    } else {
                        current = current.left;
                    }
                }
            }
        }
    }

   
}

function BinarySearchTreeLCA(strArr) {
    let bst = new BinarySearchTree();
    let treePreOrder = strArr[0].slice(1, strArr[0].length - 1).split(',')

    treePreOrder.forEach(item => {
        bst.insert(Number(item));
    })
    function lowestCommonAncestor(root, p, q) {
        if (root.value > p && root.value > q) {
            return lowestCommonAncestor(root.left, p, q);
        }
        else if (root.value < p && root.value < q) {
            return lowestCommonAncestor(root.right, p, q);
        }
        else {
            return root;
        }
    }
    return lowestCommonAncestor(bst.root,Number(strArr[1]),Number(strArr[2])).value;
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
     postOrderHelper(tree.root)
    return str;
}

function postOrder(strArr) {
    let bst = new BinarySearchTree();
    let tree = strArr.split('')
    tree.forEach(item => {
        bst.insert(item);
    })
    return getPostOrder(bst)

}

console.log(postOrder("ABCDEFG"));



