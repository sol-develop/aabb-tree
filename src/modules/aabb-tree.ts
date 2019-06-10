import Aabb from "./aabb.js";
import TreeNode from "./tree-node.js";

class AabbTree {
  private root: TreeNode;

  constructor() {
    // nothing to do here
  }

  public getRoot(): TreeNode {
    return this.root;
  }

  public addElement(element: any, aabb: Aabb): AabbTree {
    const newNode: TreeNode = new TreeNode(element, aabb);
    const newAabb: Aabb = new Aabb();
    let currentNode: TreeNode;

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    currentNode = this.root;
    newAabb.embrace(currentNode.getAabb(), aabb);

    while (!currentNode.isLeaf()) {
      const leftChild: TreeNode = currentNode.getLeftChild();
      const rightChild: TreeNode = currentNode.getRightChild();
      const leftAabb: Aabb = new Aabb();
      const rightAabb: Aabb = new Aabb();

      leftAabb.embrace(leftChild.getAabb(), aabb);
      rightAabb.embrace(rightChild.getAabb(), aabb);

      currentNode.setAabb(newAabb.getCopy());
      if (leftAabb.getAcreage() <= rightAabb.getAcreage()) {
        newAabb.embrace(leftChild.getAabb(), leftAabb);
        currentNode = leftChild;
      } else {
        newAabb.embrace(rightChild.getAabb(), rightAabb);
        currentNode = rightChild;
      }
    }

    currentNode.setLeftChild(newNode);
    currentNode.setRightChild(currentNode.getCopy());
    currentNode.setAabb(newAabb.getCopy());
    currentNode.setElement(null);

    return this;
  }

  public removeElement(element: any) {
    // pass
  }

  public getElementByPointCollision(
    x: number,
    y: number,
    elementCollisionFunction: (x: number, y: number, element: any) => boolean,
  ): any {
    if (!this.root) {
      return null;
    }

    return this.getElementByPointCollisionRecursive(this.root, x, y, elementCollisionFunction);
  }

  public getElementByAabbCollision(
    aabb: Aabb,
    elementCollisionFunction: (aabb: Aabb, element: any) => boolean,
  ): any {
    // pass
  }

  /**
   * Recursive function to get an element that collides with given point.
   * @param node the current node to check
   * @param x x coordinate of point
   * @param y y coordinate of point
   * @param elementCollisionFunction (optional) a function for pixel perfect collision detection against found element
   */
  private getElementByPointCollisionRecursive(
    node: TreeNode,
    x: number,
    y: number,
    elementCollisionFunction: (x: number, y: number, element: any) => boolean,
  ): any {
    const currentAabb: Aabb = node.getAabb();

    if (currentAabb.collidesWithPoint(x, y)) {
      if (node.isLeaf()) {
        if (
          typeof elementCollisionFunction !== "function" ||
          elementCollisionFunction(x, y, node.getElement())
        ) {
          return node.getElement();
        }
      } else {
        const leftElement = this.getElementByPointCollisionRecursive(
          node.getLeftChild(), x, y, elementCollisionFunction,
        );
        if (leftElement !== null) {
          return leftElement;
        }
        return this.getElementByPointCollisionRecursive(node.getRightChild(), x, y, elementCollisionFunction);
      }
    }

    // no collision
    return null;
  }
}

export default AabbTree;
